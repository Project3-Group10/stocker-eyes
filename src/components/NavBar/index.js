import React from 'react';
import './index.css';
import { useEffect, useState, useRef } from 'react';


function NavBar(){
    const [state, setState] = useState('');

    const nav_home = () => {
        setState(prevState => [...prevState, 'home']);
    };

    const nav_register = () => {
        setState(prevState => [...prevState, 'register']);
    };

    const nav_profile = () => {
        setState(prevState => [...prevState, 'profile']);
    };

    return(
        <div className="NavBarItems">
            <div className="nav-menu">
                <button onClick={()=>nav_home}> Home </button>
                <button onClick={()=>nav_home}> Home </button>
                <button onClick={()=>nav_home}> Home </button>
            </div>
        </div>
    );
}

export default NavBar;