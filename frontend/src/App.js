import './App.css';
import React, { useEffect } from 'react';
import {
  SinglePlayer,
  MultiPlayer,
  LandingPage,
  Home,
  AuthScreen,
  Test,
  Chat,
  Score
} from './Pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Components/contexts/AuthContext';
import * as PIXI from 'pixi.js';
import {
  PrivateRoute,
  PublicRoute
} from './Components/private-route/PrivateRoute';
import { getCurrentUser } from './actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Components/Message/Message';
import { logOut } from './actions/actions';
import { getUserData } from './actions/friendsAction';

const App = () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);
  function handleLogout() {
    dispatch(logOut());
  }
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <Router>
      <Message />
      <AuthProvider>
        <Switch>
          <PublicRoute exact component={LandingPage} path="/" />

          <PrivateRoute
            path="/Home"
            component={Home}
            handleLogout={handleLogout}
          />

          <PrivateRoute
            path="/chat"
            component={Chat}
            handleLogout={handleLogout}
          />

          <PrivateRoute
            path="/single-player"
            component={SinglePlayer}
            app={app}
          />
          <PrivateRoute path="/score" component={Score} />

          <PrivateRoute path="/multi-player" component={MultiPlayer} />

          <Route path="/test" component={Test} />

          <PublicRoute path="/auth" component={AuthScreen} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
