import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../actions/actions';

export function PrivateRoute({ component: Component, ...rest }) {
  // const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.userInfo);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/auth" />;
      }}
    ></Route>
  );
}
export function PublicRoute({ component: Component, ...rest }) {
  const currentUser = useSelector((state) => state.user.userInfo);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Redirect to="/Home" /> : <Component {...props} />;
      }}
    ></Route>
  );
}
