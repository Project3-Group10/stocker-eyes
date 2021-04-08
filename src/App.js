import './App.css';
import Stock from './Stock.js';
import io from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';


const socket = io();
function App() {
  return (
    <div className="App">
      <Stock> </Stock>
    </div>
  );
}

export default App;
