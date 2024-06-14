import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, storeToken, removeToken } from '../../utils/tokenManager'; // Functions to manage JWT token storage

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getToken()); // Get the token from storage

  useEffect(() => {
    setAuthToken(getToken()); // Keep token in sync
  }, []);

  // Store the token
  const login = (token) => {
    storeToken(token);
    setAuthToken(token);
  };

  // Remove the token
  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
