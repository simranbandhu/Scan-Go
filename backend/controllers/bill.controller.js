const Bill = require("../models/Bill.model");

//FUNCTION
// Function to remove duplicates and add quantity
const processProducts = (products) => {
  // Use a Map to group products by their unique_id
  const productMap = new Map();

  products.forEach((product) => {
    const {
      unique_id,
      cost_price,
      product_name,
      bill_id,
      createdAt,
      updatedAt,
    } = product;

    // If the product is already in the Map, increment the quantity
    if (productMap.has(unique_id)) {
      const existingProduct = productMap.get(unique_id);
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the Map, add it with quantity set to 1
      productMap.set(unique_id, {
        _id: product._id,
        bill_id,
        product_name,
        unique_id,
        cost_price,
        createdAt,
        updatedAt,
        __v: product.__v,
        quantity: 1,
      });
    }
  });

  // Convert the Map values back to an array
  return Array.from(productMap.values());
};

//CREATE NEW BILL
//this will be called initially only
exports.createActiveBill = async (req, res) => {
  try {
    // console.log("REQ USER: ", req.user.activeBill !== null, !req.user);

    if (req.user && req.user.activeBill === null) {
      const newBill = await Bill.create({
        customer_id: req.user._id,
        products: [],
        total_amount: 0,
      });
      // console.log("NEW BILL: ", newBill);
      //UPDATE USER WITH ACTIVE BILL , if only user doesnot have any active bill
      req.user.activeBill = newBill._id;
      await req.user.save();
      console.log("USER UPDATED WITH ACTIVE BILL: ", req.user.activeBill);
    }

    if (req.user.activeBill !== null) {
      console.log(
        "USER ALREADY HAVE AN ACTIVE BILL , PLEASE REMOVE THAT FIRST"
      );
    }

    res.status(200).json({
      status: "success",
      message: "Bill created successfully",
      data: {
        bill: req.user.activeBill,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//GET BILL
// NOTE: this will be called multiple times in the frontend to see if anything was updated in shpping list
//we will do this using socket.io

//NOTE: user must be logged in , only then we can getActiveBill
//NOTE: maybe at the end send kr denge ye activeBill and getAllProducts waale controller se saare products for specific bill hee send krenge hr refetching m ,
exports.getActiveBill = async (req, res) => {
  try {
    // console.log("REQ USER: ", req.user);
    //
    if (req.user.activeBill === null) {
      return res.status(400).json({
        status: "fail",
        message: "No active bill found , Please create a bill first",
      });
    }
    const bill = await Bill.findById(req.user.activeBill);
    if (bill.products.length === 0) {
      bill.total_amount = 0;
      await bill.save();
    }

    res.status(200).json({
      status: "success",
      message: "Bill fetched successfully",
      data: {
        bill,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      error: err,
    });
  }
};

exports.checkout = async (req, res) => {
  console.log("CHECKOUT CONTROLLER");
  try {
    if (req.user.activeBill === null) {
      return res.status(400).json({
        status: "fail",
        message: "No active bill found , Please create a bill first",
      });
    }
    const currentBill = await Bill.findById(req.user.activeBill).populate(
      "products"
    );
    let modifiedBill = currentBill;
    if (currentBill.products.length !== 0) {
      // Process the products array
      const uniqueProducts = processProducts(currentBill.products);

      // You may also want to update the total amount based on unique products
      const updatedTotalAmount = uniqueProducts.reduce(
        (sum, product) => sum + product.cost_price * product.quantity,
        0
      );

      // Log or return the modified bill
      modifiedBill = {
        ...currentBill._doc, // spread existing properties of the bill document
        products: uniqueProducts,
        total_amount: updatedTotalAmount,
        customer_phoneNumber: req.user.phone_number,
        bill_date: new Date().toLocaleDateString(),
        bill_time: new Date().toLocaleTimeString(),
      };
    }

    console.log("FROM CHECKOUT CONTROLLER", modifiedBill);

    res.status(200).json({
      status: "success",
      message: "Bill fetched successfully",
      data: modifiedBill,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
