const State = require("../models/State.model");

exports.toggleStateToTrue = async (req, res) => {
  const state = await State.findOne({ name: "removeActive" });
  if (state) {
    state.value = true; // Toggle the boolean value
    await state.save(); // Save the updated state
    // console.log(state, "remove is active");
    res.status(200).json({
      status: "success",
      message: "Remove is active",
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "State not found",
    });
    console.error("State not found");
  }
};

exports.toggleStateToFalse = async (req, res) => {
  const state = await State.findOne({ name: "removeActive" });
  if (state) {
    state.value = false; // Toggle the boolean value
    await state.save(); // Save the updated state
    // console.log(state, "remove is not active");
    res.status(200).json({
      status: "success",
      message: "Remove is not active",
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "State not found",
    });
    console.error("State not found");
  }
};
