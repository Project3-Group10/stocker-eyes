import React from 'react';
import Stock from './Stock';
import socket from "./utils/socket";
import {useState, useEffect} from 'react';

const Search = () => {
    
    useEffect(() => {
      socket.on('searchQuerySocket', (data) => {
        console.log('S');
        console.log(data);
    });
    }, [null]);

    return(
        <div className="pageHolder">
            <Stock />
        </div>
    );
}

export default Search;