import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Plotly from 'plotly.js-finance-dist';
import socket from "./utils/socket";
import { refreshTokenSetup } from "./utils/refreshToken";


export const Stock = (props) => {

  useEffect(() => {
    socket.on('homeResponse', (groupData) => {
      console.log(groupData);
      localStorage.setItem('homeStocks', JSON.stringify(groupData['homeStock']));
      localStorage.setItem('homeNews', JSON.stringify(groupData['homeNews']));
      if (props.rq == 'Home') {
        const homeStocks = JSON.parse(JSON.stringify(groupData['homeStock']));

        if (props.ticker === "wmt") {
          console.log('wmt', homeStocks);
          displayGraph(homeStocks['wmtData']);
          console.log('wmt', homeStocks.wmtData);

        }

        else if (props.ticker === "ovv") {
          displayGraph(homeStocks.ovvData);
          console.log(homeStocks.ovvData)
        }

        else if (props.ticker === "appl") {
          displayGraph(homeStocks.applData);
          console.log(homeStocks.applData)
        }
      }
    });

    socket.on('searchResponse', (groupData) => {
      localStorage.setItem('searchStocks', JSON.stringify(groupData['searchStock']));
      localStorage.setItem('searchNews', JSON.stringify(groupData['searchNews']));
      
      
      if (props.rq == 'Search') {
        displayGraph(JSON.parse(JSON.stringify(groupData['searchStock'])));
      }
    });
  }, []);

  Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  function displayGraph(data) {
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
    console.log(props.ticker, document.getElementById("wmtTicker"));
    Plotly.newPlot(document.getElementById(props.ticker), [{
      x: stockChartXValuesFunction,
      y: stockChartYValuesFunction,
      type: 'scatter'
    }], layout);
  }


  return (


    <div className="stck">
      <div className="stock ">
        <div id={props.ticker} className="stockGraph"> </div>
      </div>
    </div>

  );
};

export default Stock;
