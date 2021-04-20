import React from 'react';
import Stock from './Stock';
import News from './News';

const Search = () => {

    return(
        <div className="pageHolder">
                <div className="stock">
                    <Stock />
                </div>
        </div>
    );
}

export default Search;