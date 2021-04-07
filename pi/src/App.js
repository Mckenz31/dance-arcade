
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './Pages/HomePage/Home';

import Game from './Pages/Game/Game'
import * as PIXI from 'pixi.js'

function App() {
  const app=new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    backgroundColor:0xAAAAAA
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
          <Route path="/Game"><Game app={app}/></Route>
        </Switch>
      </Router>
       
    </div>
  );
}

export default App;
