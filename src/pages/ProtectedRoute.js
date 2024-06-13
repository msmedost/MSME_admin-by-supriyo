import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import UserContext from "../context/UserContext"; // Adjust the import path as necessary
import UserContext from "../inc/UserContext";

const ProtectedRoute = ({ element: Component }) => {
  const { userData } = useContext(UserContext);

  return userData ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
