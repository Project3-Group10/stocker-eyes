import React, { useEffect } from 'react';
import socket from './Components/utils/socket';
import './App.css';
import Home from "./Components/Home";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import SearchBox from "./Components/utils/SearchBox";
import Search from "./Components/Search";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const pageHolder = () => {
    window.location.reload(false);
  }; 

  return (
      <Router>
          <div>
              <nav className="navigation">
                <SearchBox />
                <div className="menuItem" onClick={()=>{pageHolder()}}> <Link to="/"> <p>Home </p></Link> </div>
                <div className="menuItem"> <Link to="/register"><p>Register</p></Link> </div>
                <div className="menuItem"> <Link to="/profile"><p>Profile</p></Link> </div>
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
                  <Route path="/search">
                      <Search />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;