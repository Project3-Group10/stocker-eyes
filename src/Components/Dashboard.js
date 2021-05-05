import React from 'react';
import { useState, useEffect } from 'react';
import socket from "./utils/socket";
import "../css/Dashboard.css";
import "../css/Home.css";
import Stock from "./Stock";
import News from "./News";
import FavoriteList from "./utils/FavoriteList";

const Dashboard = (props) => {
    const [expandMain, setexpandMain] = useState({ dow: 1, sp: 1, nasdaq: 1 });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dashboardData, setDashboardData] = useState(false);
    const [showModal, setModalShow] = useState(false);


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

    useEffect(() => { 
        if(sessionStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
            
        }

        if(!dashboardData){
            var data = { 'name': sessionStorage.getItem('name'), 'email': sessionStorage.getItem('email') };
            console.log('DashboardEmit');
            socket.emit('DashBoardEmit', data);
        }

    }, []);


    return(
    <div>
        { isLoggedIn?
        <div className="home">
                <div className="mainContainer">
                    <div className="">
                        <center>
                            <FavoriteList />
                        </center>
                    </div>
                    <div className={`stockArea dow ${expandMain.dow? '' : 'hide'}`} onClick={expandStock} >
                        <h1 className="stockTitle">{props.favStock['master']['ticker1']}</h1>
                    
                        <Stock ticker={sessionStorage.getItem('myStockName1')} rq={"Dashboard"}/>
                        <News ticker={sessionStorage.getItem('myStockName1')} rq={"Dashboard"}/>

                    </div>

                    <div className={`stockArea sp ${expandMain.sp? '' : 'hide'}`} onClick={expandStock} >
                        <h1 className="stockTitle">{props.favStock['master']['ticker2']}</h1>
                        <Stock ticker={sessionStorage.getItem('myStockName2')} rq={"Dashboard"}/>
                        <News ticker={sessionStorage.getItem('myStockName2')} rq={"Dashboard"}/>
                    </div>

                    <div className={`stockArea nasdaq ${expandMain.nasdaq? '' : 'hide'}`} onClick={expandStock} >
                        <h1 className="stockTitle">{props.favStock['master']['ticker3']}</h1>
                        <Stock ticker={sessionStorage.getItem('myStockName3')} rq={"Dashboard"}/>
                        <News ticker={sessionStorage.getItem('myStockName3')} rq={"Dashboard"}/>
                    </div>

                </div>
        </div> : 
                <div className="home">
                    <div className="mainContainer">
                        <p> You are not logged in! </p>
                    </div>
                </div>
        }
    </div>
    );
}

export default Dashboard;