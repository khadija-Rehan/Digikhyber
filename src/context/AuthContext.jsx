import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserProfile } from "../api/user";

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
  const [userProfile, setUserProfile] = useState(null);

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

      setTimeout(() => {
        const fetchProfile = async () => {
          const profile = await getUserProfile();
          console.log(profile);
          setUserProfile(profile.data.data.user);
        };
        fetchProfile();
      }, 3000);
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

  const updateUser = (newData) => {
    setUser(prev => {
      let updated;
      if (prev && prev.user) {
        // Handle nested structure { user: { ... }, token: ... }
        updated = { 
          ...prev, 
          user: { ...prev.user, ...newData } 
        };
      } else {
        // Handle flat structure
        updated = { ...prev, ...newData };
      }
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
    
    if (userProfile) {
      setUserProfile(prev => ({ ...prev, ...newData }));
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated,
    showLoginAlert,
    setShowLoginAlert,
    setPaidUser,
    paidUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
