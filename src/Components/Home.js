import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Plotly from 'plotly.js-finance-dist';
import "../css/Home.css"
import socket from "./utils/socket";
import Stocks from "./Stock";

const Home = (props) => {
    
    const [expandMain, setexpandMain] = useState({ dow: 1, sp: 1, nasdaq: 1 });
    
    const [stockChartXValue, setstockChartXValue] = useState([]);
    const [stockChartYValue, setstockChartYValue] = useState([]);

    function expandStock(ele) {
        const box = ele.target.classList[1];
        let expandCopy = { dow: 0, sp: 0, nasdaq: 0 };
        console.log(ele);
        if (expandMain['dow'] == 1 && expandMain['sp'] == 1) {
            console.log(box);
            expandCopy[box] = 1;
            ele.target.style.left = 0;
            setexpandMain(expandCopy);
        }
        else {
            setexpandMain({ dow: 1, sp: 1, nasdaq: 1 });
            ele.target.style.left = null;
        }

    }

    function fetch_stock_data(data){
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

    useEffect(() => {
        socket.on('stock_data', (data) => {
            console.log({stock_data: data });
            fetch_stock_data(data);
        });
    }, []);


    return (
        <div className="home">
            <div className="mainContainer">
                <div className={`stockArea dow ${expandMain.dow? '' : 'hide'}`} onClick={expandStock} >
                    <div id="test1" className="stock"> </div>
                    <div id="news1" className="newsArea newsDOW"></div>
                </div>
                <div className={`stockArea sp ${expandMain.sp? '' : 'hide'}`} onClick={expandStock} >
                    <div id="test2" className="stock "> </div>
                    <div id="news2" className="newsArea newsSP"></div>
                </div>
                <div className={`stockArea nasdaq ${expandMain.nasdaq? '' : 'hide'}`} onClick={expandStock} >
                    <div id="test3" className="stock "> </div>
                    <div id="news3" className="newsArea newsNAS"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;
