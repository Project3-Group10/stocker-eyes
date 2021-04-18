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
          
          let maxNumberY = Math.max(... stockChartYValuesFunction);
          let indexOfMaxNumberY = stockChartYValuesFunction.indexOf(String(maxNumberY));
          let indexOfMaxNumberX = stockChartXValuesFunction[indexOfMaxNumberY];
          
          console.log('Max Number: ' + maxNumberY);
          console.log('Index of Max Number X: ' + indexOfMaxNumberX);
          console.log('Index of Max Number Y: ' + indexOfMaxNumberY)
          // console.log(stockChartYValuesFunction)
          
          let lowNumberY = Math.min(... stockChartYValuesFunction);
          let indexOfMinNumberY = stockChartYValuesFunction.indexOf(String(lowNumberY));
          let indexOfMinNumberX = stockChartXValuesFunction[indexOfMinNumberY];
          
          
          setstockChartXValue(stockChartXValuesFunction);
          setstockChartYValue(stockChartYValuesFunction);
            
         var layout = {
              showlegend: false,
              annotations: [
                {
                  x: indexOfMaxNumberX,
                  y: maxNumberY,
                  xref: 'x',
                  yref: 'y',
                  text: 'Highest Amount: ' + maxNumberY,
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40
                },
                {
                  x: indexOfMinNumberX,
                  y: lowNumberY,
                  xref: 'x',
                  yref: 'y',
                  text: 'Low Amount: ' + lowNumberY,
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40                   
                }
              ]
            };
         
          Plotly.newPlot(document.getElementById('test'), [
              {
                x: stockChartXValuesFunction,
                y: stockChartYValuesFunction,
                type: 'scatter'
              }
            ], layout);
      });
      
    }, []);
    
    
 var data = [
  {
    x: stockChartXValue,
    y: stockChartYValue,
    type: 'scatter'
  }
];

//console.log('docGet',document.getElementById('test'));
//console.log('textInp',textInput);
//console.log('data',data);
    
    return(
        <div className="Stock">
            <h1> NASDAQ </h1>
            <div id="test" className="test" ref={textInput}></div>
        </div>
    );
}

export default Stock;