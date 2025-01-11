// import { useContext, useState, useEffect, createContext } from "react";
// import axios from "axios";
// //1) CREATE A CONTEXT
// export const FetchDataContext = createContext();

// //3) CREATE A CUSTOM HOOK
// // Moved to a separate file: src/hooks/useFetchData.js
// //2) CREATE CONTEXT PROVIDER (u will wrap your application with this provider)

// export const FetchDataContextProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [totalBill, setTotalBill] = useState(0);
//   //
//   const URL = "http://127.0.0.1:3000";
//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         const response = await axios.get("" + URL + "/api/v1/products");
//         const Objdata = response.data;
//         const { total } = Objdata;
//         console.log(Objdata, total, Objdata.data);
//         // const newProducts=Objdata.data.((el,i) => { });
//         setProducts(Objdata.data); //array store ho rha h
//         setTotalBill(total);
//         console.log("FROM CONTEXT: ", products);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchAllProducts();
//   }, []);

//   return (
//     <FetchDataContext.Provider value={(products, totalBill)}>
//       {children}
//     </FetchDataContext.Provider>
//   );
// };
