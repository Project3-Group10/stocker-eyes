import React, { useState, useRef, useEffect } from 'react';
import socket from './socket';
import { useHistory } from "react-router-dom";


const SearchBox = () => {
    
    const history = useHistory();
    const inputRef = useRef('');
    const isClicked = useState(false);

    const onClick = () => {
        const inputText = inputRef.current.value;

        sessionStorage.setItem('TickerName', inputText );

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