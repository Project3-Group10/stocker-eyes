import React, { useState, useRef } from 'react';
import socket from './socket';
import { useHistory } from "react-router-dom";


const SearchBox = () => {
    
    const history = useHistory();
    const inputRef = useRef('');
    const isClicked = useState(false);

    const onClick = () => {
        const inputText = inputRef.current.value;

        socket.emit('searchStock', { searchText: inputText })
        localStorage.setItem('searchBarQuery', 'true');
        localStorage.setItem('TickerName', inputText );

        // socket.emit('newsRequest', inputText);
        let path = `/search`; 
        history.push(path);
    }

    return(
        
        <form action="" className="search-bar">
	        <input 
	            placeholder="Search..."
                ref={inputRef}
                className="inputSearchDiv"
                type="search"
                name="search"
                required
                autoComplete="off"/>
	        <button className="search-btn" type="submit" onClick={()=>{onClick()}}>
	    	    <span>Search</span>
	        </button>
        </form>
    );
}

export default SearchBox;