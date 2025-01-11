import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import generatePDF from "../utils/generatePdf";

export default function BillPage() {
  const location = useLocation();
  const checkoutData = location.state?.checkoutData;
  const { data } = checkoutData;
  console.log("CHECKOUT DATA FROM BILL: ", checkoutData);
  const handleDownloadBill = () => {
    generatePDF({ jsonData: checkoutData.data });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center p-4"
    >
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="border border-purple-300 bg-white rounded-lg shadow-lg p-6 w-full max-w-lg lg:max-w-3xl flex flex-col items-center space-y-8"
      >
        {/* Thank You Header with Scale and Fade Animation */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-center text-gradient bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        >
          Thank You for Shopping with Us!
        </motion.h1>

        {/* Animated Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center text-gray-600 text-lg"
        >
          We appreciate your purchase. You can download and locally save pdf of
          receipt with the details of your transaction.
        </motion.p>

        {/* Order Summary with Slide-in Animation */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full p-4 rounded-md bg-gray-50 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <ul className="space-y-3 text-gray-700 overflow-y-auto ">
            {data.products.map((el, i) => {
              return (
                <li className="flex justify-between" key={i}>
                  <span>{el.product_name}</span>
                  <div className="flex items-center space-x-2 font-medium text-gray-600">
                    <p className="text-sm">₹{el.cost_price || 0}</p>
                    <span className="text-sm text-gray-400">x</span>
                    <p className="text-sm">{el.quantity || 0}</p>
                    <span className="text-sm text-gray-400">=</span>
                    <p className="text-lg text-indigo-600 font-semibold">
                      ₹{el.cost_price * el.quantity || 0}
                    </p>
                  </div>
                </li>
              );
            })}
            <hr className="border-t border-gray-300 my-2" />
            <li className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{data.total_amount}</span>
            </li>
          </ul>
        </motion.div>

        {/* Additional Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-gray-500 text-center text-sm"
        >
          <p>
            Order Date:{" "}
            <span className="font-medium">
              {data.bill_date
                ? data.bill_date
                : `${new Date().toLocaleDateString()}`}
            </span>
          </p>
          <p>
            Order Time:{" "}
            <span className="font-medium">
              {data.bill_time
                ? data.bill_time
                : `${new Date().toLocaleTimeString}`}
            </span>
          </p>
          <p>
            Customer Phone:{" "}
            <span className="font-medium">
              {data.customer_phoneNumber
                ? data.customer_phoneNumber
                : "+91XXXXYYYY"}
            </span>
          </p>
        </motion.div>

        {/* Action Links with Hover Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 w-full"
        >
          <Link
            to="/"
            className="w-full md:w-auto bg-purple-600 text-white text-center py-2 px-6 rounded-md shadow hover:bg-purple-700 transition hover:scale-105 transform"
          >
            Go back to Homepage
          </Link>

          {/* <Link
            to="/orders"
            className="w-full md:w-auto bg-blue-600 text-white text-center py-2 px-6 rounded-md shadow hover:bg-blue-700 transition hover:scale-105 transform"
          >
            View My Orders
          </Link> */}
          <button
            onClick={() => handleDownloadBill()}
            className="w-full md:w-auto bg-red-600 text-white text-center py-2 px-6 rounded-md shadow hover:bg-red-700 transition hover:scale-105 transform"
          >
            Download Bill
          </button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
