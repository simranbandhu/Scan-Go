const express = require("express");
const { getSocket } = require("../utils/socket");
const {
  addProduct,
  getAllProducts,
  deleteAllProducts,
} = require("../controllers/product.controller");

const authController = require("../controllers/auth.controller");

const router = express.Router();

// const io = getSocket();
router
  .route("/")
  .get(authController.protect, getAllProducts) //added authorization here
  // .post(addProduct(req, res, io));
  .post(authController.addProductProtected, (req, res) => {
    const io = getSocket(); // Get the io instance
    addProduct(req, res, io); //pass io to the controller
  });

router.route("/checkout").delete(deleteAllProducts);

module.exports = router;
