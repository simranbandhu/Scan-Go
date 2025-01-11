const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay_key_id = process.env.RAZORPAY_KEY_ID;
const razorpay_key_secret = process.env.RAZORPAY_KEY_SECRET;

const instance = new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
});

// console.log(instance);
exports.paymentCheckout = async (req, res) => {
  try {
    if (!req.body || !req.body.amount) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide amount to be paid!!",
      });
    }
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    //response will show payment is due , amount paid:0
    const order = await instance.orders.create(options);
    // console.log("ORDER: ", order);

    res.status(200).json({
      status: "success",
      message: "Here is the order object",
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
      error: err,
      callStack: err.stack,
    });
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", razorpay_key_secret)
      .update(body.toString())
      .digest("hex");
    console.log("rzp sign, exp sign: ", razorpay_signature, expectedSignature);

    // Step 2: Compare signatures
    if (expectedSignature === razorpay_signature) {
      console.log("Payment verified successfully!");
      // Step 3: Update the order/payment status in your database
      res.status(200).json({ status: "success", message: "Payment Verified" });
    } else {
      console.error("Payment verification failed!");
      res.status(400).json({ status: "error", message: "Invalid Signature" });
    }
  } catch (err) {
    console.error("Error during payment verification:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};
