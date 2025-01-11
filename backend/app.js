const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//ROUTERS
const productRouter = require("./routes/product.route");
const stateRouter = require("./routes/state.route");
const authRouter = require("./routes/auth.route");
const billRouter = require("./routes/bill.route");
const paymentRouter = require("./routes/payment.route");

//DOTENV

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
// const whitelist = [
//   "https://google.com",
//   "https:yoursite.com",
//   "http://127.0.0.1:3000",
//   "http://localhost:3500",
//   "http://127.0.0.1:5173",
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,POST,PUT,DELETE,PATCH",
//   optionsSuccessStatus: 200,
//   allowedHeaders: "Content-Type,Authorization",
// };

const corsOptions = {
  origin: ["http://localhost:5173"], // replace with your frontend's URL
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true, // allow cookies to be sent
  optionsSuccessStatus: 200,
  allowedHeaders: "Content-Type,Authorization",
};

// Enable CORS for all routes and methods
app.use(cors(corsOptions));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/bills", billRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/toggleState", stateRouter);
app.use("/api/v1/payments", paymentRouter);

app.use((err, req, res, next) => {
  console.log(
    "ERROR FROM GLOBAL ERROR HANDLING MIDDLEWARE: ",
    err,
    err.stack,
    err.name,
    err.message
  );
  next();
});
module.exports = app;
