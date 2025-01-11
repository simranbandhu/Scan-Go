const express = require("express");
const authController = require("../controllers/auth.controller");
const billController = require("../controllers/bill.controller");

const router = express.Router();

router
  .route("/currentBill")
  .get(authController.protect, billController.getActiveBill); //will change
//maybe socket io issi route pe call krega baar baar to check if shopping list me kuch update hua hai

router
  .route("/createbill")
  .post(authController.protect, billController.createActiveBill);

router.route("/checkout").get(authController.protect, billController.checkout);

module.exports = router;
