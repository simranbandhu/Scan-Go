const express = require("express");
const paymentController = require("./../controllers/payment.controller");

const router = express.Router();

router.route("/checkout").post(paymentController.paymentCheckout);
router
  .route("/payment-verification")
  .post(paymentController.paymentVerification); //post request mandatory

router.route("/getPaymentKey").get((req, res) => {
  res.status(200).json({
    key: "rzp_test_riJ6gnkwQk9Ikn",
  });
});

module.exports = router;
