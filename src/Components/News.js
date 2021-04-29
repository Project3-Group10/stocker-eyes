import React from 'react';
import socket from "./utils/socket";
import { useState, useEffect } from 'react';

const News = (props) => {

    const [homeNews, sethomeNews] = useState(null);
    console.log('tophomeNews', homeNews, typeof homeNews);

    useEffect(() => {
        socket.on('homeResponse', (groupData) => {
            console.log('homeResponse', typeof JSON.parse(JSON.stringify(groupData['homeNews']))['wmtData']);
            localStorage.setItem('homeStocks', JSON.stringify(groupData['homeStock']));
            localStorage.setItem('homeNews', JSON.stringify(groupData['homeNews']));
            
            const replace = JSON.parse(JSON.stringify(groupData['homeNews']))[props.ticker+'Data']['articles'];
            console.log(props.ticker+'Data', replace)
            sethomeNews(replace);
        });
    },[]);


    if (props.rq == "Home") {
        if (props.ticker == "wmt") {

            console.log('Before Render',homeNews == null?'Empty':homeNews);

            return (

                <div className={`newsArea ${props.ticker}`}>
                    <div className="gridContainer">
                    
                    {console.log('In Render',homeNews)}
                    {
                    
                    homeNews == null?'Empty':homeNews.map(()=>{
                            <div>
                                1
                            </div>
                        ;})
                    }
                    </div>
                </div>
            );
        }
    }

};

export default News;
