import axios from "./axiosInstance";
import toast from "react-hot-toast";
const paymentHandler = async ({ phone_number, amount }) => {
  try {
    console.log("PHONE NUMBER AND AMOUNT: ", phone_number, amount);

    // Step 1: Create an order on the server
    const requestData = { amount }; // Amount in paise
    const {
      data: { key },
    } = await axios.get("/payments/getPaymentKey");
    const { data } = await axios.post("/payments/checkout", requestData);
    const order = data.data;

    console.log("ORDER: ", order, " AND: ", key);

    // Step 2: Return a promise to manage async control
    return new Promise((resolve, reject) => {
      const options = {
        key, // Enter the Key ID generated from the Razorpay Dashboard
        amount: order.amount_due, // Amount is in subunits (paise)
        currency: "INR",
        name: "Scan & Go",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/110036015?v=4",
        order_id: order.id, // Pass the Order ID received from the server
        handler: async function (response) {
          console.log("Razorpay Payment Response:", response);

          // Step 3: Send payment details to the backend for verification
          const verificationData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyRes = await axios.post(
              "/payments/payment-verification",
              verificationData
            );

            console.log("Verification Response:", verifyRes.data);

            if (verifyRes.data.status === "success") {
              toast.success("Payment Successful and Verified!");
              resolve(true); // Resolve the promise with success
            } else {
              toast.error("Payment Verification Failed!");
              resolve(false); // Resolve with failure
            }
          } catch (verificationError) {
            console.error("Verification Error: ", verificationError);
            toast.error("Verification Failed Due to Server Error!");
            reject(verificationError); // Reject the promise with error
          }
        },
        prefill: {
          name: "Test User",
          email: "test.user@example.com",
          contact: phone_number,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment Failed: ", response);
        toast.error("Payment Failed! Please try again.");
        reject(response.error); // Reject promise on payment failure
      });

      rzp.open();
    });
  } catch (err) {
    console.error("ERROR FROM: ", err);
    throw err; // Throw error to be handled in the calling function
  }
};
export default paymentHandler;
