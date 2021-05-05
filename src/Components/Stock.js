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
        const homeNews = JSON.parse(JSON.stringify(groupData['homeNews']));

        if (props.ticker === "wmt") {
          displayGraph(homeStocks['wmtData'], homeNews['wmtData']);
        }

        else if (props.ticker === "ovv") {
          displayGraph(homeStocks.ovvData, homeNews['ovvData']);
        }

        else if (props.ticker === "appl") {
          displayGraph(homeStocks.applData, homeNews['applData']);
        }
      }
    });

    socket.on('dashboardResponse', (groupData) => {
      console.log('dashboardReponse socket is on');
      console.log(groupData);
      if (props.rq == 'Dashboard') {
        if (props.ticker === sessionStorage.getItem('myStockName1')) {
          console.log('dashboard', groupData['newsData'][props.ticker]['articles']);
          displayGraph(groupData['stockData']['myStockChartData'][0],groupData['newsData'][props.ticker]['articles']);
        }
        else if (props.ticker === sessionStorage.getItem('myStockName2')) {
          displayGraph(groupData['stockData']['myStockChartData'][1],groupData['newsData'][props.ticker]['articles']);
        }
        else if (props.ticker === sessionStorage.getItem('myStockName3')) {
          displayGraph(groupData['stockData']['myStockChartData'][2],groupData['newsData'][props.ticker]['articles']);
        }
      }
    });

    socket.on('searchResponse', (groupData) => {
      sessionStorage.setItem('searchStocks', JSON.stringify(groupData['searchStock']));
      sessionStorage.setItem('searchNews', JSON.stringify(groupData['searchNews']));
      if (props.rq == 'Search') {
        displayGraph(JSON.parse(JSON.stringify(groupData['searchStock'])),JSON.parse(JSON.stringify(groupData['searchNews'])));
      }
    });
  }, []);


  function displayGraph(data, nData) {

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let stockChartNews = {};
    let stockChartXNews = [];
    var hoverInfo = document.getElementById(props.ticker+'-hoverinfo');

    for (var idx in nData['articles'])
    {
      stockChartNews[nData['articles'][idx]['publishedAt'].slice(0,10)] = nData['articles'][idx];
    }
    
    for (var key in data['Time Series (Daily)']) {
      stockChartXValuesFunction.push(key);
      stockChartYValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
      if (stockChartNews[key]) {
        console.log('hit');
        stockChartXNews.push(stockChartNews[key]);
      }
      else {
        stockChartXNews.push(null);
      }
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
    var dt = [{
      x: stockChartXValuesFunction,
      y: stockChartYValuesFunction,
      type: 'scatter'
    }];

    Plotly.newPlot(document.getElementById(props.ticker), dt, layout);

    document.getElementById(props.ticker).on('plotly_hover', function(dt) {
        var infotext = dt.points.map(function(d) {
          if (stockChartNews[d.x]) {
            if (props.rq == 'Search') {
              return(
                '<div class="card"><img src="'+stockChartNews[d.x]['urlToImage']+'" align="midde" alt="Random Unsplash image" /><h4>'+stockChartNews[d.x]['title']+'</h4><p>'+stockChartNews[d.x]['description']+'</p></div>'
              );
            }
            if (props.rq == 'Home') {
              if (document.getElementById('home1').className.includes('hide') || document.getElementById('home2').className.includes('hide') || document.getElementById('home3').className.includes('hide')) {
                return(
                '<div class="card"><img src="'+stockChartNews[d.x]['urlToImage']+'" align="midde" alt="Random Unsplash image" /><h4>'+stockChartNews[d.x]['title']+'</h4><p>'+stockChartNews[d.x]['description']+'</p></div>'
                );
              }
            }
          }
          return ('');
        });

        hoverInfo.innerHTML = infotext.join('<br/>');
      })
      .on('plotly_unhover', function(dt) {
        hoverInfo.innerHTML = '';
      });

  }


  return (


    <div className="stck">
      <div className="stock ">
        <div id={props.ticker} className="stockGraph"> </div>
      </div>
      <div id={props.ticker+'-hoverinfo'} className="hoverNews"></div>
    </div>

  );
};

export default Stock;