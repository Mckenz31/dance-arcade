
import './App.css';
import {SinglePlayer,MultiPlayer,LandingPage,Home,Test,AuthScreen} from './Pages'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {AuthProvider} from './Components/context/AuthProvider'
import * as PIXI from 'pixi.js'
import PrivateRoute from './Components/private-route/PrivateRoute'

function App() {
  const app=new PIXI.Application({
    width:window.innerWidth,
    height:window.innerHeight,
    transparent:true
  })
  return (
    <AuthProvider >
      <Router>
        <Switch>
          <Route exact component={LandingPage} path="/"/>
        </Switch>
        <Switch>
          <Route path="/Home" component={Home}/>
        </Switch>
        <Switch>
          <Route path="/single-player" render={(props) => <SinglePlayer app={app} {...props} />}  />
        </Switch>
        <Switch>
          <Route path="/multi-player" render={(props) => <MultiPlayer {...props} />}/>
        </Switch>
        <Switch>
          <Route path="/auth"><AuthScreen /></Route>
        </Switch>
      </Router>
       
    </AuthProvider>
  );
}

export default App;
