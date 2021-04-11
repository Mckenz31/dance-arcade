
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './Pages/HomePage/Home';
import {useState} from 'react'
import Game from './Pages/Game/Game'
import * as PIXI from 'pixi.js'
import Test from './Pages/Test/Test';

function App() {
  const app=new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    transparent:true
  })

  console.log(app)
  return (
    <div >
      <Router>
        <Switch>
          <Route exact component={LandingPage} path="/"/>
        </Switch>
        <Switch>
          <Route path="/Home"><Home/></Route>
        </Switch>
        <Switch>
          <Route path="/Game"><Game app={app} /></Route>
        </Switch>
        <Switch>
          <Route path="/testing"><Test app={app} /></Route>
        </Switch>
      </Router>
       
    </div>
  );
}

export default App;
