import './App.css';
import Home from './Home';
import io from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';
import GAuth from "./GAuth";


const socket = io();
function App() {
  return (
    <div className="App">
      <Home sock={socket} />
    </div>
  );
}

export default App;

