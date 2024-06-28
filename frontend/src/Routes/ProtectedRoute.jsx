import React, { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
