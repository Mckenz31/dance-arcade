import './App.css';
import {SinglePlayer,MultiPlayer,LandingPage,Home,Test,AuthScreen} from './Pages'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import * as PIXI from 'pixi.js'

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
          <Route path="/single-player"><SinglePlayer app={app} /></Route>
        </Switch>
        <Switch>
          <Route path="/multi-player"><MultiPlayer /></Route>
        </Switch>
        <Switch>
          <Route path="/auth"><AuthScreen /></Route>
        </Switch>
        <Switch>
          <Route path="/testing"><Test app={app} /></Route>
        </Switch>
      </Router>
       
    </div>
  );
}

export default App;
