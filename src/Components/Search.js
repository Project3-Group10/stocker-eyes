import React from 'react';
import Stock from './Stock';
import News from "./News";
import socket from "./utils/socket";
import {useState, useEffect} from 'react';

const Search = () => {
    const [favList, setFavList] = useState('');
    if (sessionStorage.getItem('TickerName')) {
        console.log('From SEARCHJS\n',sessionStorage.getItem('TickerName'));
        socket.emit('searchRequest', sessionStorage.getItem('TickerName'));
    }

    const favListBtn = () => {
        //console.log('Button Clicked')
        setFavList(sessionStorage.getItem('TickerName'));
        var data = {'userName': sessionStorage.getItem('name'), 'userEmail':sessionStorage.getItem('email'), 'tickerName': sessionStorage.getItem('TickerName')}
        if(sessionStorage.getItem('isLoggedIn') != 'true'){
            alert("You are not logged in. Please sign in to use this feature");
        }
        else{
            socket.emit('my_f_list', data);
        }
    }

    return(
        <div className="pageHolder">
            <h1 className="stockTitle">{sessionStorage.getItem('TickerName')}</h1>
            <Stock ticker={sessionStorage.getItem('TickerName')} rq="Search"/>
            <button className="favListButton" onClick={()=>{favListBtn()}}> ADD </button>
            <News ticker={sessionStorage.getItem('TickerName')} rq="Search"/>
        </div>
    );
}

export default Search;

