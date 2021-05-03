import React from 'react';
import { useEffect, useState } from 'react';
import "../css/Home.css";
import "../css/News.css";
import "../css/Profile.css";
import "../css/Register.css";
import "../css/Search.css";
import socket from "./utils/socket";
import { Stock } from "./Stock";
import News from "./News";

const Home = (props) => {

    const [expandMain, setexpandMain] = useState({ dow: 1, sp: 1, nasdaq: 1 });
    const [homeData, setHomeData] = useState(false);
    
    if (!homeData) {
        console.log('homeEmit');
        socket.emit('homeRequest');
        setHomeData(true);
    }
    

    function expandStock(ele) {
        const box = ele.target.classList[1];
        let expandCopy = { dow: 0, sp: 0, nasdaq: 0 };
        console.log('ELE',ele);
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
    

    return (
        <div className="home">
            <div className="mainContainer">
                <div className={`stockArea dow ${expandMain.dow? '' : 'hide'}`} onClick={expandStock} >
                    <h1 className="stockTitle">WMT</h1>
                    <Stock ticker={"wmt"} rq={"Home"}/>
                    <News ticker={"wmt"} rq={"Home"}/>
                </div>
                <div className={`stockArea sp ${expandMain.sp? '' : 'hide'}`} onClick={expandStock} >
                    <h1 className="stockTitle">OVV</h1>
                    <Stock ticker={"ovv"} rq={"Home"}/>
                    <News ticker={"ovv"} rq={"Home"}/>
                </div>
                <div className={`stockArea nasdaq ${expandMain.nasdaq? '' : 'hide'}`} onClick={expandStock} >
                    <h1 className="stockTitle">AAPL</h1>
                    <Stock ticker={"appl"} rq={"Home"}/>
                    <News ticker={"appl"} rq={"Home"}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
