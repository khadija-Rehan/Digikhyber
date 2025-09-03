import React, { createContext, useState, useContext, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [paidUser, setPaidUser] = useState(false);

  const verifyToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.token && verifyToken(userData.token)) {
        setUser(userData);
      } else {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    if (userData.token && verifyToken(userData.token)) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      // Show login alert modal for enrolled students
      setShowLoginAlert(true);
    } else {
      throw new Error("Invalid token");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => {
    return user !== null && user.token && verifyToken(user.token);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated,
    showLoginAlert,
    setShowLoginAlert,
    setPaidUser, paidUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
