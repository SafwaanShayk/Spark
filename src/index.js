import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import App from "./App";
import Comparison from "./components/pages/compFrame/Comparison";
import DashboardPage from "./components/layout/dashboard/DashboardPage";
import UserProject from "./components/pages/userProject/UserProject";
import ProjectForm from "./components/pages/Forms/ProjectForm";
import BuyProject from "./components/pages/buyProject/BuyProject";
import Register from "./components/pages/users/Register";
import Login from "./components/pages/users/Login";
import { AuthProvider, useAuth } from "./services/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";
import CustomSnackbar from "./utils/CustomSnackbar";
import CircularProgress from "@mui/material/CircularProgress"; // Add this import for a loading indicator

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "*",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
            children: [
              {
                path: "comparison",
                element: <Comparison />,
              },
              {
                path: "project-form",
                element: <ProjectForm />,
              },
              {
                path: "your-project",
                element: <UserProject />,
              },
              {
                path: "buy-project",
                element: <BuyProject />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function Main() {
  const { loading, snackbar, closeSnackbar } = useAuth();

  if (loading) {
    return <CircularProgress />; // Show loading indicator while checking authentication
  }

  return (
    <>
      <RouterProvider router={router} />
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
