import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";

function PrivateRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/check-auth"); // Route that verifies JWT
        console.log("FROM CHECK AUTH:", res);
        console.log(res.data);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [isAuthenticated]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? (
    <Component {...rest} /> // Render the component directly
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateRoute;
