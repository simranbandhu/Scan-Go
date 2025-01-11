export default function ProductItem({ id, product }) {
  return (
    <div className="flex-col border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <ProductNameAndCost
        productName={product.product_name}
        cost={product.cost_price}
        quantity={product.quantity}
        description={product.product_description}
      />
    </div>
  );
}

function ProductNameAndCost({ productName, cost, quantity, description }) {
  return (
    <div className="flex flex-col space-y-2 w-full p-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-black text-[14px] font-bold">
            {productName || "Product Name"}
          </h3>
          <p className="text-sm text-gray-500">Quantity: {quantity || 0}</p>
        </div>
        <p className="text-indigo-600 font-semibold">₹ {cost || 0}</p>
      </div>

      {/* Product Description */}
      {description && (
        <p className="text-gray-500 text-sm mt-2 border-t border-gray-200 pt-2">
          {description}
        </p>
      )}
    </div>
  );
}
// export default function ProductItem({ id, product }) {
//   // console.log("PRODUCT FROM PRODUCT ITEM: ", product);
//   //IN THIS COMPONENT I CAN ADD OTHER DETAILS AS WELL LIKE PRODUCT DETAILS ,
//   return (
//     <div className="flex-col border-2 rounded-xl p-2 bg-white">
//       {/* PRODUCT NAME , COST , QUANTITY  */}
//       <ProductNameAndCost
//         productName={product.product_name}
//         cost={product.cost_price}
//         quantity={product.quantity}
//       />
//     </div>
//   );
// }

// function ProductNameAndCost({ productName, cost, quantity }) {
//   return (
//     <div className="flex  w-full justify-between items-center p-2 ">
//       <div className="flex-col ">
//         <h3 className="text-black text-[14px] font-semibold">
//           {productName || "RANDOM"}
//         </h3>
//         <p className="text-[14px] text-gray-500 ">Quantity: {quantity || 0}</p>
//       </div>
//       <p className="text-gray-500">
//         {"₹"} {cost || 0}
//       </p>
//     </div>
//   );
// }
