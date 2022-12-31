import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import DogCreate from './components/Form/DogCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/create" component={DogCreate}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
