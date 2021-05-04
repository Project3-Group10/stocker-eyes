import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Plotly from 'plotly.js-finance-dist';
import socket from "./utils/socket";
import { refreshTokenSetup } from "./utils/refreshToken";

export const Stock = (props) => {
  console.log('Stock');

  useEffect(() => {
    socket.on('homeResponse', (groupData) => {
      sessionStorage.setItem('homeStocks', JSON.stringify(groupData['homeStock']));
      sessionStorage.setItem('homeNews', JSON.stringify(groupData['homeNews']));
      
      if (props.rq == 'Home') {
        const homeStocks = JSON.parse(JSON.stringify(groupData['homeStock']));

        if (props.ticker === "wmt") {
          displayGraph(homeStocks.wmtData);
        }

        else if (props.ticker === "ovv") {
          displayGraph(homeStocks.ovvData);
        }

        else if (props.ticker === "appl") {
          displayGraph(homeStocks.applData);
        }
      }
    });

    socket.on('dashboardResponse', (data) => {
      console.log('dashboardReponse socket is on');
      console.log(data);
      if (props.rq == 'Dashboard') {
        if (props.ticker === sessionStorage.getItem('myStockName1')) {
          displayGraph(data['myStockChartData'][0]);
        }
        else if (props.ticker === sessionStorage.getItem('myStockName2')) {
          displayGraph(data['myStockChartData'][1]);
        }
        else if (props.ticker === sessionStorage.getItem('myStockName3')) {
          displayGraph(data['myStockChartData'][2]);
        }
      }
    });

    socket.on('searchResponse', (groupData) => {
      sessionStorage.setItem('searchStocks', JSON.stringify(groupData['searchStock']));
      sessionStorage.setItem('searchNews', JSON.stringify(groupData['searchNews']));
      if (props.rq == 'Search') {
        displayGraph(JSON.parse(JSON.stringify(groupData['searchStock'])));
      }
    });
  }, []);

  function displayGraph(data) {

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    for (var key in data['Time Series (Daily)']) {
      stockChartXValuesFunction.push(key);
      stockChartYValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
    }

    let maxNumberY = Math.max(...stockChartYValuesFunction);
    let indexOfMaxNumberY = stockChartYValuesFunction.indexOf(String(maxNumberY));
    let indexOfMaxNumberX = stockChartXValuesFunction[indexOfMaxNumberY];

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