import './App.css';
import Stock from './Stock.js';
import io from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';
import GAuth from "./GAuth";


const socket = io();
function App() {
  return (
    <div className="App">
        <GAuth />
        <Stock />
    </div>
  );
}

export default App;
