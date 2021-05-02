import React from 'react';
import { useState } from 'react';
import "../css/Dashboard.css";
import "../css/Home.css";

const Dashboard = (props) => {
    const [expandMain, setexpandMain] = useState({ dow: 1, sp: 1, nasdaq: 1 });

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

    return(
    <div className="home">
            <div className="mainContainer">

                <div className={`stockArea dow ${expandMain.dow? '' : 'hide'}`} onClick={expandStock} >
                    <h1 className="stockTitle">WMT</h1>
                    {/* <Stock ticker={"wmt"} rq={"Dashboard"}/>
                    <News ticker={"wmt"} rq={"Dashboard"}/> */}

                </div>

                <div className={`stockArea sp ${expandMain.sp? '' : 'hide'}`} onClick={expandStock} >
                    <h1 className="stockTitle">OVV</h1>
                    {/* <Stock ticker={"ovv"} rq={"Dashboard"}/>
                    <News ticker={"ovv"} rq={"Dashboard"}/> */}
                </div>

                <div className={`stockArea nasdaq ${expandMain.nasdaq? '' : 'hide'}`} onClick={expandStock} >
                    <h1 className="stockTitle">APPL</h1>
                    {/* <Stock ticker={"appl"} rq={"Dashboard"}/>
                    <News ticker={"appl"} rq={"Dashboard"}/> */}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;