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
  return (
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/register">Register</Link>
                      </li>
                      <li>
                         <Link to="/profile">Profile</Link>
                      </li>
                  </ul>
              </nav>
              {/* To add links to other directories, follow this guide https://reactrouter.com/web/guides/quick-start*/}
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route exact path="/">
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
