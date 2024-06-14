import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Custom hook to access AuthContext

// Protected Route component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useAuth(); // Get the JWT token

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
