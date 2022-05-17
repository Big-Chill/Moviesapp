import './App.css';
import Main from './Components/Main';
import Login from './Components/Login';
import Moviepage from './Components/Moviepage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
            <Route path="/signin" component={Login} exact/>
            <Route path="/page" component={Moviepage} exact/>
            <Route path="/" component={Main} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
