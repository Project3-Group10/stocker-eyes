import React from 'react';
import './App.css';
import Home from "./Components/Home";
import Register from "./Components/Register";
import Profile from "./Components/Profile";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const pageHolder = () => {
    window.location.reload(false);
  } 

  return (
      <Router>
          <div>
              <nav className="navigation">
                <button className="menuItem" onClick={()=>{pageHolder()}}> <Link to="/"> <p>Home </p></Link> </button>
                <button className="menuItem"> <Link to="/register">Register</Link> </button>
                <button className="menuItem"> <Link to="/profile">Profile</Link> </button>                 
              </nav>
              {/* To add links to other directories, follow this guide https://reactrouter.com/web/guides/quick-start*/}
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route exact path="/"
                         refresh="true">
                      <Home />
                  </Route>
                  <Route path="/register">
                      <Register />
                  </Route>
                  <Route path="/profile">
                      <Profile />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;