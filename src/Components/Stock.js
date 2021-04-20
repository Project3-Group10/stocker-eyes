import React from 'react';
import {useEffect, useState, useRef} from 'react';
import Plotly from 'plotly.js-finance-dist';
import socket from "./utils/socket";
import { refreshTokenSetup } from "./utils/refreshToken";
import News from "./News";

export const Stock = (props) => {
    const[stockChartXValue, setstockChartXValue] = useState([]);
    const[stockChartYValue, setstockChartYValue] = useState([]);
    const textInput = useRef(null);
    const [searchQuery, setSearchQuery] = useState(false);
    const[teslaData, setTeslaData] = useState(null);
    const[ovvData, setOvvData] = useState(null);
    const[amznData, setAmznData] = useState(null);
    const [homeRequest, setHomeRequest] = useState(false);

    const isTest = (name) => {
      var test = name;
      try {
        localStorage.getItem(test);
        return true;
      }
      catch(e) {
        return false;
    }

    }
   

    useEffect(() => {  
      
      if (isTest('searchQuery')){
        setSearchQuery(tempSearch => true);
      } 
      else {
        setSearchQuery(tempSearch => false);
      }

      if(isTest('requsetHome')){
        const obj = localStorage.getItem('homeStockInfo');
        setHomeRequest(tempReq => true);
      } else {
        setHomeRequest(tempReq => false);
      }

      socket.on('stock_data', (data) => {

          if(props.name === "tsla"){
            displayGraph(data.teslaData);
            console.log(data.teslaData)
          }

          else if(props.name === "ovv"){
            displayGraph(data.ovvData);
            console.log(data.ovvData)
          }

          else if (props.name === "amzn"){
            displayGraph(data.amznData);
            console.log(data.amznData)
          }
      });
      
    }, [homeRequest]);

    useEffect(() => {
      socket.on('searchQuerySocket', (data) => {
        console.log('SEARCH');
        console.log(data);
        displayGraph(data);
    });
    }, [searchQuery]);

    Object.size = function(obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    function displayGraph(data){
      console.log('InDIsplay');
      console.log(data);
      
      // if(Object.size(data) > 1){
      //   console.log('ERROR');
      // } else { 

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

      Plotly.newPlot(document.getElementById(`plotlyGraph-${props.name}`), [{
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
      
        
          <div className="stck">
            <div id="test2" className="stock ">
              <div id={`plotlyGraph-${props.name}`} className="stockGraph"> </div>
            </div>
            <div id="news2" className="newsArea newsSP">
              <News ticker={props.name}/>
            </div>
          </div>
        
    );
}

export default Stock;