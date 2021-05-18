import './App.css';
import React from 'react'
import {SinglePlayer,MultiPlayer,LandingPage,Home,AuthScreen} from './Pages'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {AuthProvider} from './Components/contexts/AuthContext'
import * as PIXI from 'pixi.js'
import PrivateRoute from './Components/private-route/PrivateRoute'

function App() {
  const app=new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    transparent:true
  })
  return (
    <Router>
        <AuthProvider >
          <Switch>
              <Route exact component={LandingPage} path="/"/>
            
              <PrivateRoute path="/Home" component={Home}/>
            
              <Route path="/single-player" render={(props) => <SinglePlayer app={app} {...props} />}  />
          
              <Route path="/multi-player" render={(props) => <MultiPlayer {...props} />}/>
            
              <Route path="/auth" component={AuthScreen} />
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
