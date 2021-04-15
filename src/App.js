import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import NavBar from "./components/NavBar";
import './App.css';



function App() {
  return (
  <div>
    <div className="MainContainer">
      <div className="NavBar">
        <NavBar />
      </div>

      <div className="Routers">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    
    </div>
  </div>
  );
}



export default App;

