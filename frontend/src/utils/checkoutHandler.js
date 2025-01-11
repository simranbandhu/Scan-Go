import axios from "./axiosInstance";
const handleCheckout = async () => {
  let data;
  try {
    const response = await axios.get("/bills/checkout");
    console.log("RESPONSE FROM CHECKOUT", response.data, response);
    if (response.status === 200) {
      data = response.data;
    }
  } catch (err) {
    console.error("Error checking out", err);
  }
  return data;
};
export default handleCheckout;
