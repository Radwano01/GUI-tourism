import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); 

  if (user && user.role === "ADMIN") {
    return children;
  } else {
    return <Navigate to="/not-authorized" />;
  }
};

export default ProtectedRoute;
