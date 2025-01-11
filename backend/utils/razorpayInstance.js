const Razorpay = require("razorpay");

const initRazorpay = () => {
  //RAZORPAY INSTANCE
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key,
  });

  return razorpayInstance;
};
module.exports = initRazorpay;
