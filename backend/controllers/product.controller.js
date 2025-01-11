//NOTE: YHA PE DATA ESP32 se aaega and hum usko uske respective bill m dalenge
const Product = require("../models/Product.model");
const CurrUser = require("../models/CurrUser.model");
const User = require("../models/User.model");
const Bill = require("../models/Bill.model");
const State = require("../models/State.model");
const mongoose = require("mongoose");

// First grouping by `bill_id`, then by `unique_id`
const getProductsGroupedByBillAndQuantity = async (myBillId) => {
  const result = await Product.aggregate([
    // First stage: Match documents with a specific `bill_id`
    {
      $match: { bill_id: new mongoose.Types.ObjectId(`${myBillId}`) }, // Replace with your specific bill_id if needed
    },
    // Second stage: Group by `bill_id` and `unique_id`
    {
      $group: {
        _id: {
          bill_id: "$bill_id",
          unique_id: "$unique_id",
        },
        product_name: { $first: "$product_name" },
        cost_price: { $first: "$cost_price" },
        product_description: { $first: "$product_description" },
        quantity: { $sum: 1 }, // Count duplicates
      },
    },
    // Third stage: Reshape the result by grouping by `bill_id`
    {
      $group: {
        _id: "$_id.bill_id", // Group by `bill_id` , we dont care about individual products id
        products: {
          $push: {
            //as we dont care about individual products id , we are only displaying unique_id and other details
            unique_id: "$_id.unique_id",
            product_name: "$product_name",
            product_description: "$product_description",
            cost_price: "$cost_price",
            quantity: "$quantity",
          },
        },
      },
    },
  ]);
  return result;
};

//GET ALL PRODUCTS -> DYNAMIC IN NATURE USING SOCKET.IO
exports.getAllProducts = async (req, res) => {
  try {
    // console.log("in get all products: ", req, " and: ", req.user);
    // console.log(req.user.activeBill, req.user.activeBill._id);
    //CREATE NEW (only one) state if not created
    const existingState = await State.findOne({ name: "removeActive" });
    if (!existingState) {
      await State.create({ name: "removeActive", value: false });
    }

    if (req.user.activeBill === null) {
      return res.status(400).json({
        status: "fail",
        message: "No active bill found , Please create a bill first",
      });
    }

    // console.log("state created", !existingState); //will show false if state already exists
    //
    //BASICALLY WE NEED TO GROUP BY unique_id and then count the number of occurences of each product
    //and send back all products with their respective quantities

    //1) check if data base is empty or not ?
    const count = await Product.countDocuments();
    // console.log("count", count);
    if (count === 0) {
      return res.status(204).json({
        status: "success",
        message: "No products found in the database",
        data: [],
      });
    }
    //2) GET CURRENT BILL DOCUMENT
    const currBill = await Bill.findById(req.user.activeBill);
    //3) GET PRODUCTS GROUPED BY BILL AND QUANTITY (AGGREGATE)
    //-----getProductsGroupedByBillAndQuantity-----//
    const resultAgg = await getProductsGroupedByBillAndQuantity(currBill._id);

    // console.log("result from getAllProducts: ", resultAgg);
    //NOTE: CREATE CHECK CONDITION IF AGGREGRATE RETURNS EMPTY ARRAY , THEN SEND EMPTY ARRAY
    //4) GET TOTAL COST OF PRODUCTS FOR THE CURRENT BILL

    //4) SEND AGGREGRATED DATA
    res.status(200).json({
      status: "success",
      data: resultAgg,
      total: currBill.total_amount,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//UGLY: product model updated with new property , bill_id (so that we can delete products from specific bill only)
//UGLY: ESP32 cant provide bill_id , so i need to add that in logic

//ADD NEW PRODUCT
exports.addProduct = async (req, res, io) => {
  try {
    // console.log("IO FROM ADD PRODUCT", io); // Check if io is defined
    // console.log("FROM REQ USER: ", req.user);
    const { unique_id, product_name, cost_price, product_description } =
      req.body;
    if (
      !req.body ||
      !req.body.unique_id ||
      !req.body.product_name ||
      !req.body.product_description ||
      !req.body.cost_price
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "Product is required , please mention all the details (unique_id, product_name, cost_price , product_description)",
      });
    }

    //IF USER HAVE ACTIVE BILL PROP OR NOT -> I DONT NEED TO CHECK IF REQ.USER IS NULL OR NOT as protect middleware is working
    if (req.user.activeBill === null) {
      return res.status(400).json({
        status: "fail",
        message:
          "User doenst have any active bill , Please create a bill first !!",
      });
    }

    const existingState = await State.findOne({ name: "removeActive" });
    if (!existingState) {
      await State.create({ name: "removeActive", value: false });
    }
    console.log(`Remove is ${existingState.value ? "active" : "inactive"}`);

    //REMOVE PRODUCT

    if (existingState && existingState.value === true) {
      removeProduct(req, res);
    } else {
      addProduct(req, res);
    }

    // 5) Emit the event to notify clients that a product was added
    if (io) {
      // Check if io is defined before calling emit
      io.emit("productAdded"); // Emit the event to all connected clients
    } else {
      console.error("Socket.io instance is undefined.");
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//DELETE ALL PRODUCTS
exports.deleteAllProducts = async (req, res) => {
  try {
    console.log("DELETE REQUEST made");
    await Product.deleteMany();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getTotalAmount = async (currBill) => {
  let totalAmount = 0;
  if (!currBill || currBill.products.length !== 0) {
    //IF PRODUCTS ARRAY IS EMPTY , AGGREGATE WILL THROW ERROR , SO CHECKING FOR THAT
    totalAmount = await Bill.aggregate([
      {
        $match: {
          _id: currBill._id,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$_id",
          total_bill: { $sum: "$products.cost_price" },
        },
      },
    ]);
    totalAmount = totalAmount[0].total_bill;
  }
  return totalAmount;
};

//-------------------------------------------------------------------------------------------------------------------//
// REMOVE PRODUCT
const removeProduct = async (req, res) => {
  //GET CURRENT BILL
  const currBill = await Bill.findById(req.user.activeBill);
  //state is true , remove the product
  let deletedProduct = await Product.findOne({
    bill_id: req.user.activeBill,
    unique_id: req.body.unique_id,
  });
  // console.log("deleted Product: ", deletedProduct);

  //also delete product from bills product array too
  if (
    deletedProduct !== null &&
    deletedProduct !== undefined &&
    currBill.products.length !== 0
  ) {
    currBill.products = currBill.products.filter(
      (product) => product.toString() !== deletedProduct._id.toString()
    );
  }

  if (deletedProduct !== null && deletedProduct !== undefined) {
    //WHAT IF HACKER , REMOVED FROM PRODUCTS ARRAY BUT NOT FROM PRODUCT COLLECTION
    //DELETE THE PRODUCT
    deletedProduct = await Product.findByIdAndDelete(deletedProduct._id);
  }

  //UPDATE TOTAL AMOUNT OF BILL
  let newTotalAmount = await getTotalAmount(currBill);
  // console.log("newTotalAmount: ", newTotalAmount);
  currBill.total_amount = newTotalAmount;
  await currBill.save();

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    data: deletedProduct,
  });
};

//-------------------------------------------------------------------------------------------------------------------//
// ADD PRODUCT
const addProduct = async (req, res) => {
  //ADDING PRODUCT
  //1) CREATE NEW PRODUCT DOC
  const newProduct = await Product.create({
    bill_id: req.user.activeBill,
    unique_id: req.body.unique_id,
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    cost_price: req.body.cost_price,
  });

  //2) GET ACTIVE BILL -> TO EMBED(REF) PRODUCT IN IT
  const currBill = await Bill.findById(req.user.activeBill);
  //3) GET TOTAL COST OF PRODUCTS FOR THE CURRENT BILL
  //IMP: AGGREGATE IS USED TO CALCULATE SUM OF ALL PRODUCTS COST PRICE
  let totalAmount = await getTotalAmount(currBill);
  const actualTotal = totalAmount + newProduct.cost_price;

  //4) SAVING PRODUCT ID and UPDATED TOTAL IN BILL
  currBill.products.push(newProduct._id);
  currBill.total_amount = actualTotal;
  await currBill.save();

  // console.log("currBill: ", currBill);
  // console.log("PRODUCT ADDED: ", newProduct);

  res.status(201).json({
    status: "success",
    message: "Product added successfully",
    data: newProduct,
  });
};

//-------------------------------------------------------------------------------------------------------------------//
//ADD NEW PRODUCT
// exports.addProduct = async (req, res, io) => {
//   // console.log(req.user, req.headers, req.cookie);
//   // console.log("ENTERED IN ADD PRODUCT");
//   try {
//     // console.log("IO FROM ADD PRODUCT", io); // Check if io is defined
//     //ALERT: product aaega kha se ? req.body ? ya koi aur jagah se ?
//     const { unique_id, product_name, cost_price } = req.body;
//     if (
//       !req.body ||
//       !req.body.unique_id ||
//       !req.body.product_name ||
//       !req.body.cost_price
//     ) {
//       return res.status(400).json({
//         status: "fail",
//         message:
//           "Product is required , please mention all the details (unique_id, product_name, cost_price)",
//       });
//     }

//     // console.log("from add product, req.user ->  ", req.user);
//     //IF USER HAVE ACTIVE BILL PROP OR NOT -> I DONT NEED TO CHECK IF REQ.USER IS NULL OR NOT as protect middleware is working
//     // if (req.user === null) {
//     console.log("USER OBJECT: ", req.user);
//     // return res.status(400).json({
//     //   status: "fail",
//     //   message: "Please create a bill",
//     // });
//     // }
//     //HERE  create if and else , and depending on that call different mongoose functions

//     const existingState = await State.findOne({ name: "removeActive" });
//     if (!existingState) {
//       await State.create({ name: "removeActive", value: false });
//     }
//     console.log("Remove is ", existingState.value);
//     if (existingState && existingState.value === true) {
//       //GET CURRENT BILL
//       const currBill = await Bill.findById(req.user.activeBill);
//       //state is true , remove the product
//       let deletedProduct = await Product.findOne({
//         bill_id: req.user.activeBill,
//         unique_id: unique_id,
//       });
//       console.log("deleted Product: ", deletedProduct);

//       //also delete from bills product array
//       if (
//         deletedProduct !== null &&
//         deletedProduct !== undefined &&
//         currBill.products.length !== 0
//       ) {
//         console.log("REMOVE THE PRODUCT FROM PRODUCTS ARRAY TOO , ", currBill);
//         currBill.products = currBill.products.filter(
//           (product) => product.toString() !== deletedProduct._id.toString()
//         );
//         console.log("CURR BILL AFTER DELETION : ", currBill);
//       }
//       if (deletedProduct !== null && deletedProduct !== undefined) {
//         //WHAT IF HACKER , REMOVED FROM PRODUCTS ARRAY BUT NOT FROM PRODUCT COLLECTION
//         //DELETE THE PRODUCT
//         deletedProduct = await Product.findByIdAndDelete(deletedProduct._id);
//       }

//       //UPDATE TOTAL AMOUNT OF BILL -> IRRESPECTIVE OF IF ANYTHING WAS DELETED OR NOT
//       let newTotalAmount = await getTotalAmount(currBill);
//       // console.log("newTotalAmount: ", newTotalAmount);
//       currBill.total_amount = newTotalAmount;
//       await currBill.save();

//       res.status(200).json({
//         status: "success",
//         message: "Product deleted successfully",
//         data: deletedProduct,
//         bill: currBill,
//       });
//     } else {
//       //1) CREATE NEW PRODUCT DOC
//       const newProduct = await Product.create({
//         bill_id: req.user.activeBill,
//         unique_id,
//         product_name,
//         cost_price,
//       });
//       //2) GET ACTIVE BILL -> TO EMBED(REF) PRODUCT IN IT
//       const currBill = await Bill.findById(req.user.activeBill);
//       //3) GET TOTAL COST OF PRODUCTS FOR THE CURRENT BILL
//       //IMP: AGGREGATE IS USED TO CALCULATE SUM OF ALL PRODUCTS COST PRICE
//       let totalAmount = await getTotalAmount(currBill);
//       console.log("TOTAL AMOUNT: ", totalAmount);
//       // console.log("newProduct: ", newProduct);
//       // console.log("currBill before : ", currBill);
//       const actualTotal = totalAmount + newProduct.cost_price;

//       //4) SAVING PRODUCT ID and UPDATED TOTAL IN BILL
//       currBill.products.push(newProduct._id);
//       currBill.total_amount = actualTotal;
//       await currBill.save();
//       console.log("currBill: ", currBill);

//       res.status(201).json({
//         status: "success",
//         message: "Product added successfully",
//         data: [],
//         // data: newProduct,
//       });
//     }
//     // 5) Emit the event to notify clients that a product was added
//     if (io) {
//       // Check if io is defined before calling emit
//       io.emit("productAdded"); // Emit the event to all connected clients
//     } else {
//       console.error("Socket.io instance is undefined.");
//     }
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
