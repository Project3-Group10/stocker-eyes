import React from 'react';
import {useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';
import Plotly from 'plotly.js-finance-dist';


const socket = io();

export function Stock(){
    const[stockChartXValue, setstockChartXValue] = useState([]);
    const[stockChartYValue, setstockChartYValue] = useState([]);
    
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
      });
      
    }, []);
    
    
 var data = [
  {
    x: stockChartXValue,
    y: stockChartYValue,
    type: 'scatter'
  }
];

Plotly.newPlot('test', data);
    
    return(
        <div className="Stock">
        <head>
	<script src='https://cdn.plot.ly/plotly-latest.min.js'></script>
</head>
            <h1> Stock Market APP </h1>
            <div id="test"></div>
        </div>
    );
}

export default Stock;