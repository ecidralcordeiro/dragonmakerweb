import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { getCookie } from "./section/cookie";
import { getAuthenticated } from "./constantes";
const PrivateRoute = ({ children }) => {
  const valid = getCookie("login");
  if (valid) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
