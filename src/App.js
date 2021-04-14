import './App.css';
import Stock from './Stock.js';
import Home from './Home';
import io from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';


const socket = io();
function App() {
  return (
    <div className="App">
      <Home sock={socket} />
    </div>
  );
}

export default App;
