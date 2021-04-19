import React from 'react';
import '../../src/App.css';
import Stock from './Stock';

const Search = () => {

    return(
        <div className="pageHolder">
        <div className="home">
            <div className="container">
            <div className="stockArea"></div>
            <div className="stock">
            <Stock />
            </div>
            <div id="news2" className="newsArea newsSP"></div>
        </div>
        </div>
        </div>
    );
}

export default Search;