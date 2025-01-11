import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import io from "socket.io-client";

import ProductListComp from "../components/ShoppingListComponents/ProductListComp.jsx";
import Total from "../components/ShoppingListComponents/Total.jsx";

const URL = "http://localhost:3000";
// const URL = "http://192.168.109.131:3000";
const socket = io(URL);

export default function ShoppingListPage() {
  //CONSUMING CONTEXT
  const [products, setProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  useEffect(() => {
    const createBill = async () => {
      try {
        const response = await axios.post("/bills/createbill");
        // console.log("CREATE BILL RESPONSE: ", response, response.data);
      } catch (err) {
        console.log(err);
      }
    };

    createBill();
  }, []);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("/products");
        const total = response.data.total;
        const data = response.data.data;
        if (response.status === 204) {
          setProducts([]);
          return toast.error("Please add items to your cart 🛒");
        }
        // console.log("FETCH ALL PRODUCTS RESPONSE: ", response);
        setProducts(data[0].products);
        setTotalBill(total);
      } catch (err) {
        console.log(err);
      }
    };
    //Fetch products on component mount
    fetchAllProducts();

    // Listen for product updates from the server
    socket.on("productAdded", () => {
      console.log("Product update detected . Fetching latest products");
      fetchAllProducts();
    });

    //Cleanup the socket connection when the component unmounts
    return () => {
      // socket.disconnect();
      socket.off("productAdded");
    };
  }, []);

  return (
    <div className="bg-gray-100">
      <h1 className="text-black text-[30px] text-center ">Shopping List 🛒</h1>
      <div className="border-4 border-green-600 p-1 h-full flex flex-col lg:flex-row mt-1 ">
        {/* LIST OF ITEMS */}
        <ProductListComp products={products} />
        {/* TOTAL BILL */}
        <Total totalBill={totalBill} products={products} />
      </div>
    </div>
  );
}
