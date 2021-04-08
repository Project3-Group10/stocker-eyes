import React from 'react';
import {useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';
import Plotly from 'plotly.js-finance-dist';


const socket = io();

export function Stock(){
    const[stockChartXValue, setstockChartXValue] = useState([]);
    const[stockChartYValue, setstockChartYValue] = useState([]);
    const textInput = useRef(null);
    
    useEffect(() => {  
        socket.on('stock_data', (data) => {
          let stockChartXValuesFunction = [];
          let stockChartYValuesFunction = [];
          
          for(var key in data['Time Series (Daily)']){
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
          }
          setstockChartXValue(stockChartXValuesFunction);
          setstockChartYValue(stockChartYValuesFunction);

          Plotly.newPlot(document.getElementById('test'), [
  {
    x: stockChartXValuesFunction,
    y: stockChartYValuesFunction,
    type: 'scatter'
  }
]);
      });
      
    }, []);
    
    
 var data = [
  {
    x: stockChartXValue,
    y: stockChartYValue,
    type: 'scatter'
  }
];

console.log('docGet',document.getElementById('test'));
console.log('textInp',textInput);
console.log('data',data);
    
    return(
        <div className="Stock">
            <h1> Stock Market APP </h1>
            <div id="test" ref={textInput}></div>
        </div>
    );
}

export default Stock;