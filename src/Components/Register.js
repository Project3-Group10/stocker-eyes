import React from 'react';
import Login from "./Login";
import Logout from "./Logout";
import Modal from 'react-modal';
import { useState, useRef } from 'react';
import "../css/LogIn.css";

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const Register = () => {
    const [modalShow, setModalShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favStock, setFavStock] = useState(
      {master:{
        ticker1: "",
        ticker1: "",
        ticker3: "" 
        }
    });
    const stockTicker1 = useRef(null);
    const stockTicker2 = useRef(null);
    const stockTicker3 = useRef(null);


    const style = {
        overlay: {
            background: 'grey',
            height: '500px',
            width: '500px',
            top: '200px',
            left: '773px',
            fontSize: '12px',
            inset: '141px 0px 0px 552px',
        },
        content: {
            color: 'orange'
        },
    };

    const fetchStockTicker = () => {
        if(stockTicker1 != null && stockTicker2 != null && stockTicker3 != null){
            const temp1 = stockTicker1.current.value;
            const temp2 = stockTicker1.current.value;
            const temp3 = stockTicker1.current.value;

            setFavStock({...favStock,  master: {
                ticker1: temp1,
                ticker2: temp2,
                ticker3: temp3
                },
           })


        }
    }

    return (
        <div>
            <div className="pageHolder">
                <div className="loginContainer" >
                    <h2> Please log in using Google </h2>
                    {isLoggedIn? <Logout setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn}/>}                  
                </div>
            </div>

        {isLoggedIn? 
                <div className='LogIn'> 
                    <center>
                    <Modal className='modalLogIn' isOpen={isLoggedIn} style={style} > 
                    <center>
                        <h2> Please Add three of your favorite stocks with its ticker name </h2>
                            <div class="container">
                                <div> <input ref={stockTicker1} type="text" placeholder="Enter Stock 1" required/> </div>
                                <div><input ref={stockTicker2} type="text" placeholder="Enter Stock 2" required/> </div>
                                <div><input ref={stockTicker3} type="text" placeholder="Enter Stock 3" required/> </div>
                            </div>
                        <button className="logInButton" onClick={fetchStockTicker}> Submit </button>
                    </center>
                    </Modal>
                    </center>
                </div> : null }
        </div>
    );
}

export default Register;
