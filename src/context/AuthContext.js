import React, { createContext, useContext, useState, useEffect } from "react";

// Create a new context
const AuthContext = createContext();

// Custom hook to access the context value
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application and provide the context value
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  }, []);
  const [forceRender, setForceRender] = useState(false);
  const login = () => {
    // Logic to handle login (e.g., API call, validation)
    // Assuming login is successful and token is stored in localStorage
    localStorage.setItem("token", "your_token_here"); // Replace 'your_token_here' with the actual token
    setIsLoggedIn(true); // Update isLoggedIn state to true
    setForceRender((prevState) => !prevState);
  };
  useEffect(() => {
    // Check authentication status or perform related actions
  }, [isLoggedIn, forceRender]);
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage on logout
    setIsLoggedIn(false); // Update isLoggedIn state to false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
