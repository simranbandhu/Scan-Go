import ProductItem from "./ProductItem";
import axios from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import RemoveAndAddButtons from "./RemoveAndAddButtons";
export default function ProductListComp({ products }) {
  const [isRemoveActive, setIsRemoveActive] = useState(false);

  // console.log("PRODUCTS FROM PRODUCT LIST COMP: ", products);
  const toggleStateToTrue = async () => {
    try {
      const response = await axios.patch("/toggleState/removeItems");
      // console.log("RESPONSE FROM REMOVE ACTIVE: ", response, response.data);
      if (response.status === 200) setIsRemoveActive(true);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStateToFalse = async () => {
    try {
      const response = await axios.patch("toggleState/addItems");
      // console.log("RESPONSE FROM REMOVE NOT ACTIVE: ", response, response.data);
      if (response.status === 200) setIsRemoveActive(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    toggleStateToFalse();
  }, []);

  return (
    <section className="lg:h-[90vh] h-full flex flex-col justify-between ">
      <div className="border-2 border-gray-500 space-y-1  bg-stone-200 lg:w-[65vw]  p-2 overflow-y-auto h-[55vh] lg:h-[75vh] ">
        {products.length > 0 ? (
          products.map((el, ind) => {
            return <ProductItem key={ind} id={el.id} product={el} />;
          })
        ) : (
          <p className="text-gray-700 text-lg font-medium  text-center h-[70vh] flex justify-center items-center bg-white border border-green-600 rounded-md shadow-md p-4">
            Your cart is currently empty. Start adding items to shop!
          </p>
        )}
      </div>
      {/* REMOVE BTN , ADD BTN , REMOVEACTIVE STATUS */}
      <div className="border-2 border-black my-2 lg:mb-0 flex-col space-y-1 p-1">
        <div className=" flex border-2 border-b-black border-x-transparent border-t-transparent justify-between p-1  ">
          <RemoveAndAddButtons
            onClickFunction={toggleStateToTrue}
            bgColor="red"
            buttonText="Remove Items"
          />
          <RemoveAndAddButtons
            onClickFunction={toggleStateToFalse}
            bgColor="green"
            buttonText="Add Items"
          />
        </div>
        <RemoveStatus isRemoveActive={isRemoveActive} />
      </div>
    </section>
  );
}

function RemoveStatus({ isRemoveActive }) {
  return (
    <div className=" ">
      <p className="text-center text-[20px] font-semibold p-1">
        {isRemoveActive
          ? "Remove Items from the cart please 🛒 !"
          : "Start adding items to the cart 🛒 ! "}
      </p>
    </div>
  );
}
