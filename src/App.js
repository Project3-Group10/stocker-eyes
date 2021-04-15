import './App.css';
import Stock from './Stock.js';
import Home from './Home';
import io from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';
import GAuth from "./GAuth";


const socket = io();
function App() {
  return (
    <div className="App">
<<<<<<< HEAD
        <GAuth />
        <Stock />
=======
      <Home sock={socket} />
>>>>>>> 3312a0ce5ed4d08cbd01beac34601c6cb32d6baa
    </div>
  );
}

export default App;
