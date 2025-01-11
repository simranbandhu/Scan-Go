export default function TotalList({ products }) {
  return (
    <div className="flex-grow flex-col space-y-3 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
      {products.map((el, i) => (
        <div
          key={i}
          className="p-3 bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105"
        >
          <TotalItem
            product_name={el.product_name}
            cost_price={el.cost_price}
            quantity={el.quantity}
          />
        </div>
      ))}
    </div>
  );
}

function TotalItem({ product_name, cost_price = 0, quantity = 0 }) {
  const total = cost_price * quantity;
  return (
    <div
      className={`flex justify-between items-center ${
        total === 0 ? "hidden" : ""
      }`}
    >
      <div className="text-base font-semibold text-gray-800 flex-1">
        <p className="truncate">{product_name}</p>
      </div>
      <div className="flex items-center space-x-2 font-medium text-gray-600">
        <p className="text-sm">₹{cost_price || 0}</p>
        <span className="text-sm text-gray-400">x</span>
        <p className="text-sm">{quantity || 0}</p>
        <span className="text-sm text-gray-400">=</span>
        <p className="text-lg text-indigo-600 font-semibold">₹{total || 0}</p>
      </div>
    </div>
  );
}
// /* eslint-disable react/prop-types */
// export default function TotalList({ products }) {
//   // console.log("PRODUCTS FROM TOTAL LIST", products);
//   return (
//     <div className=" flex-grow flex-col space-y-1 p-1 overflow-y-scroll">
//       {products.map((el, i) => {
//         return (
//           <div key={i}>
//             <TotalItem
//               product_name={el.product_name}
//               cost_price={el.cost_price}
//               quantity={el.quantity}
//             />
//             {products.length - 1 !== i && <hr className="border-1 " />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function TotalItem({ product_name, cost_price = 0, quantity = 0 }) {
//   const total = cost_price * quantity;
//   return (
//     <div
//       className={`py-1  flex justify-between ${total === 0 ? "hidden" : ""}`}
//     >
//       <p className=" text-[16px] font-medium">{product_name}</p>
//       <div className="flex space-x-1 font-medium">
//         <p>Rs: {cost_price || 0}</p>
//         <p>x</p>
//         <p>{quantity || 0}</p>
//         <p>=</p>
//         <p>{total || 0}</p>
//       </div>
//     </div>
//   );
// }
