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
        let path = `/search`; 
        history.push(path);
    }

    return(
        <div>
        <input
            placeholder="Search..."
            ref={inputRef}
            className="inputSearchDiv"
        />
        <button onClick={()=>{onClick()}}> Search </button>
        </div>
    );
}

export default SearchBox;