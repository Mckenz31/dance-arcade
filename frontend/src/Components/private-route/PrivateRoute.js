import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.user.userInfo);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} {...rest} /> : <Redirect to="/auth" />;
      }}
    ></Route>
  );
};
export const PublicRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.user.userInfo);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Redirect to="/Home" /> : <Component {...props} />;
      }}
    ></Route>
  );
};
