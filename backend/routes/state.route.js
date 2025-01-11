const express = require("express");
const router = express.Router();

const {
  toggleStateToFalse,
  toggleStateToTrue,
} = require("../controllers/state.controller");

router.route("/removeItems").patch(toggleStateToTrue);

router.route("/addItems").patch(toggleStateToFalse);

module.exports = router;
