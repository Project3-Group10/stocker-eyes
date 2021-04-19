import React from 'react';
import {useEffect, useState, useRef} from 'react';
import Plotly from 'plotly.js-finance-dist';
import socket from "./utils/socket";
import News from "./News";


export const Stock = () => {
    const[stockChartXValue, setstockChartXValue] = useState([]);
    const[stockChartYValue, setstockChartYValue] = useState([]);
    const textInput = useRef(null);
    const [searchQuery, setSearchQuery] = useState(false);
    
    

    useEffect(() => {  
      const temp = localStorage.getItem('isLoggedIn');
      if (temp === 'true'){
        setSearchQuery(tempSearch => temp);
      } else {
        setSearchQuery(tempSearch => false);
      }
      socket.on('stock_data', (data) => {
          displayGraph(data)
      });
      
    }, []);

    useEffect(() => {
      socket.on('stock_data', (data) => {
        displayGraph(data)
    });
    }, [searchQuery]);


    function displayGraph(data){
      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];

      for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
      }

      let maxNumberY = Math.max(...stockChartYValuesFunction);
      let indexOfMaxNumberY = stockChartYValuesFunction.indexOf(String(maxNumberY));
      let indexOfMaxNumberX = stockChartXValuesFunction[indexOfMaxNumberY];

      console.log('Max Number: ' + maxNumberY);
      console.log('Index of Max Number X: ' + indexOfMaxNumberX);
      console.log('Index of Max Number Y: ' + indexOfMaxNumberY);

      console.log(stockChartYValuesFunction);

      let lowNumberY = Math.min(...stockChartYValuesFunction);
      let indexOfMinNumberY = stockChartYValuesFunction.indexOf(String(lowNumberY));
      let indexOfMinNumberX = stockChartXValuesFunction[indexOfMinNumberY];


      setstockChartXValue(stockChartXValuesFunction);
      setstockChartYValue(stockChartYValuesFunction);

      var layout = {
          showlegend: false,
          annotations: [{
                  x: indexOfMaxNumberX,
                  y: maxNumberY,
                  xref: 'x',
                  yref: 'y',
                  text: 'Highest Amount',
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
                  text: 'Low Amount',
                  showarrow: true,
                  arrowhead: 7,
                  ax: 0,
                  ay: -40
              }
          ],
          margin: {
              l: 40,
              r: 40,
              b: 30,
              t: 30,
              pad: 4
          }
      };

      Plotly.newPlot(document.getElementById('test2'), [{
          x: stockChartXValuesFunction,
          y: stockChartYValuesFunction,
          type: 'scatter'
      }], layout);
  }
  
    
 var data = [
  {
    x: stockChartXValue,
    y: stockChartYValue,
    type: 'scatter'
  }
];
 
    return(
      <div className="home">
        <div className="container">
          <div className="stockArea">
            <div id="test2" className="stock "> </div>
            <div id="news2" className="newsArea newsSP">
              <News ticker='TSLA'/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Stock;