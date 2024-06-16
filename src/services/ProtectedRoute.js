import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import CircularProgress from "@mui/material/CircularProgress"; // Add this import for a loading indicator

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <CircularProgress />; // Show loading indicator while checking authentication
  }

  if (!auth.isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
