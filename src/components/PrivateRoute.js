import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          roles.includes(user.role) ? (
            <Component {...props} />
          ) : (
            <Navigate to="/forbidden" />
          )
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

