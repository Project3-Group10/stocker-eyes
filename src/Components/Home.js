import React from 'react';
import { useEffect, useState } from 'react';
import "../css/Home.css"
import socket from "./utils/socket";
import { Stock } from "./Stock";

const Home = (props) => {
    localStorage.setItem('requsetHome', 'true');
    const [expandMain, setexpandMain] = useState({ dow: 1, sp: 1, nasdaq: 1 });
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

    useEffect(() => {
        socket.on('stock_data', (data) => {
            localStorage.setItem('homeStockInfo', JSON.stringify(data));
        });
    }, []);


    return (
        <div className="home">
            <div className="container">
                <div className={`stockArea dow ${expandMain.dow? '' : 'hide'}`} onClick={expandStock} >
                    <div className="stock"> 
                    <Stock name={"tsla"}/>
                    </div>
                    <div id="news1" className="newsArea newsDOW"></div>
                </div>
                <div className={`stockArea sp ${expandMain.sp? '' : 'hide'}`} onClick={expandStock} >
                <div className="stock"> 
                    <Stock name={"ovv"}/>
                    </div>
                    <div id="news2" className="newsArea newsSP"></div>
                </div>
                <div className={`stockArea nasdaq ${expandMain.nasdaq? '' : 'hide'}`} onClick={expandStock} >
                <div className="stock"> 
                    <Stock name={"amzn"} />
                    </div>
                    <div id="news3" className="newsArea newsNAS"></div>
                </div>
            </div>
            <div className="newsContainer">
                <div id="news1" className="newsArea newsDOW"></div>
                <div id="news2" className="newsArea newsSP"></div>
                <div id="news3" className="newsArea newsNAS"></div>
            </div>
        </div>
    );
}

export default Home;
