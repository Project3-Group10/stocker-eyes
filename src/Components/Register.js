import React from 'react';
import Login from "./Login";
import Logout from "./Logout";
import Modal from 'react-modal';
import { useState, useRef, useEffect } from 'react';
import socket from "./utils/socket";
import "../css/Register.css"

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const Register = () => {
    const [modalShow, setModalShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const stockTicker1 = useRef(null);
    const stockTicker2 = useRef(null);
    const stockTicker3 = useRef(null);
    const [firstTimeUser, setFirstTimeUser] = useState(false);

    useEffect(() => {
        console.log('useEffect maa aaivu Register.js')
        socket.on('firstTimeUser', (data) => {
            setFirstTimeUser(data['firstTimeUser']);
        });
    }, []);

    useEffect(() => {
        if(isLoggedIn){
            setModalShow(true);
        } else {
            setModalShow(false);
        }
    }, [isLoggedIn]);

    const style = {
        overlay: {
            background: 'white',
            height: '500px',
            width: '500px',
            top: '200px',
            left: '773px',
            fontSize: '12px',
            inset: '141px 0px 0px 721px',
        },
        content: {
            color: 'orange'
        },
    };

    const fetchStockTicker = () => {
        if(stockTicker1 != null && stockTicker2 != null && stockTicker3 != null){
            var temp1 = stockTicker1.current.value;
            var temp2 = stockTicker2.current.value;
            var temp3 = stockTicker3.current.value;
        }

        var data1 = {'userName': sessionStorage.getItem('name'), 'userEmail':sessionStorage.getItem('email'), 'tickerName': temp1}
        var data2 = {'userName': sessionStorage.getItem('name'), 'userEmail':sessionStorage.getItem('email'), 'tickerName': temp2}
        var data3 = {'userName': sessionStorage.getItem('name'), 'userEmail':sessionStorage.getItem('email'), 'tickerName': temp3}
        if(sessionStorage.getItem('isLoggedIn') != 'true'){
            alert("You are not logged in. Please sign in to use this feature");
        }
        else{
            socket.emit('my_f_list', data1);
            socket.emit('my_f_list', data2);
            socket.emit('my_f_list', data3);
        }

        setModalShow(false);
    }

    return (
        <div>
            <div className="pageHolder">
                <div className="loginContainer" >
                    <h2> Please log in using Google </h2>
                    {isLoggedIn? <Logout setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn}/>}                  
                </div>
            </div>

        {(isLoggedIn&&firstTimeUser)? 
                <div className='LogIn'> 
                    <center>
                    <Modal className='modalLogIn' isOpen={modalShow} style={style} > 
                    <center>
                        <h2> Please Add three of your favorite stocks with its ticker name </h2>
                            <div class="container">
                                <div className="inputStock"> <input ref={stockTicker1} type="text" placeholder="Enter Stock 1" required/> </div>
                                <div className="inputStock"><input ref={stockTicker2} type="text" placeholder="Enter Stock 2" required/> </div>
                                <div className="inputStock"><input ref={stockTicker3} type="text" placeholder="Enter Stock 3" required/> </div>
                            </div>
                        <button className="submitButton" onClick={fetchStockTicker}> Submit </button>
                    </center>
                    </Modal>
                    </center>
                </div> : null }
        </div>
    );
}

export default Register;
