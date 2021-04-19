import React, { useState, useRef } from 'react';
import socket from './socket';
import { useHistory } from "react-router-dom";


const SearchBox = () => {
    
    const history = useHistory();
    const inputRef = useRef('');
    const isClicked = useState(false);

    const onClick = () => {
        const inputText = inputRef.current.value;
        socket.emit('searchStock', { searchText: inputText });
        socket.emit('newsRequest', inputText);
        localStorage.setItem('searchQuery', 'true');
        let path = `/search`; 
        history.push(path);

    }

    return(
        
        <form action="" class="search-bar">
	        <input 
	            placeholder="Search..."
                ref={inputRef}
                className="inputSearchDiv"
                type="search"
                name="search"
                required
                autocomplete="off"/>
	        <button class="search-btn" type="submit" onClick={()=>{onClick()}}>
	    	    <span>Search</span>
	        </button>
        </form>
    );
}

export default SearchBox;