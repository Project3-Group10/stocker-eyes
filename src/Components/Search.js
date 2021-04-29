import React from 'react';
import Stock from './Stock';
import News from "./News";
import socket from "./utils/socket";
import {useState, useEffect} from 'react';

const Search = () => {
    
    if (localStorage.getItem('TickerName')) {
        console.log('From SEARCHJS\n',localStorage.getItem('TickerName'));
        socket.emit('searchRequest', localStorage.getItem('TickerName'));
    }

    return(
        <div className="pageHolder">
            <Stock ticker={localStorage.getItem('TickerName')} rq="Search"/>
        </div>
    );
}

export default Search;