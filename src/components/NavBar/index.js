import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import {MenuItems} from './MenuItems';

function NavBar(){
    
    return(
        <nav className="NavBarItems">
            <ul className="nav-menu">
                {MenuItems.map((item, index)=>{
                    return(
                        <li key={index}>
                            <a className={item.Cname} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default NavBar;