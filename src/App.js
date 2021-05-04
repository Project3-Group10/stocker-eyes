import React, { useState, useEffect } from 'react';
import socket from './Components/utils/socket';
import './App.css';
import Home from "./Components/Home";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import SearchBox from "./Components/utils/SearchBox";
import Search from "./Components/Search";
import Dashboard from "./Components/Dashboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [favStock, setFavStock] = useState(
    {master:{
      ticker1: "",
      ticker1: "",
      ticker3: "" 
      }
  });

  useEffect(() => {
    
    socket.on('sendFavlistData', (data) => {
      console.log('useEffect maa aaivu App.js')
      console.log(data);
        setFavStock({...favStock,  master: {
            ticker1: data['favList'][0],
            ticker2: data['favList'][1],
            ticker3: data['favList'][2]
            },
       })
       
       sessionStorage.setItem('myStockName1', data['favList'][0]);
       sessionStorage.setItem('myStockName2', data['favList'][1]);
       sessionStorage.setItem('myStockName3', data['favList'][2]);

       sessionStorage.setItem('myStockData1', JSON.stringify(data['myStockChartData'][0]));
       sessionStorage.setItem('myStockData2', JSON.stringify(data['myStockChartData'][1]));
       sessionStorage.setItem('myStockData3', JSON.stringify(data['myStockChartData'][2]));
    });


}, []);

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
                <div className="menuItem"> <Link to="/myStock"><p>My Stock</p></Link></div>
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
                  <Route path="/myStock">
                      <Dashboard favStock={favStock}/>
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;