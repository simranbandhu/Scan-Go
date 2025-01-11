import { Routes, Route } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppingListPage";
import BillPage from "./pages/BillPage";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LoginAndSignupPage from "./pages/LoginAndSignupPage";

import PrivateRoute from "./components/PrivateRouteComponent/PrivateRoute";
function App() {
  //   useEffect(() => {
  //     // Connect to the Socket.io server
  //     const socket = io("http://localhost:3000"); // Node.js server URL

  //     // Check for connection success
  //     socket.on("connect", () => {
  //       console.log("Connected to Socket.io server:", socket.id);
  //     });

  //     // Check for the connection success message from the server
  //     socket.on("connectionSuccess", (data) => {
  //       console.log(data.message); // Should log 'You are connected!'
  //     });

  //     // Clean up the socket connection on component unmount
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);
  return (
    <>
      <div className=" p-1 w-full h-[95vh] bg-gray-100">
        <Routes>
          <Route path="/" element={<LoginAndSignupPage />} />
          <Route
            path="/cart/*"
            element={<PrivateRoute component={ShoppingListPage} />}
          />
          {/* <Route path="/cart" element={<ShoppingListPage />} /> */}
          <Route path="/bill" element={<BillPage />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
