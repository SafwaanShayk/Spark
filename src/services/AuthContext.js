import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, token: null });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ isAuthenticated: true, token });
    }
    setLoading(false); // Authentication check is complete
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ isAuthenticated: true, token });
    showSnackbar("Login successful", "success");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ isAuthenticated: false, token: null });
    showSnackbar("Logout successful", "info");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        loading,
        snackbar,
        showSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
