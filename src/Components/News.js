import React from 'react';
import socket from "./utils/socket";
import { useState, useEffect } from 'react';

const News = (props) => {
    
    socket.on('homeResponse', (groupData) => {
      console.log(groupData);
      localStorage.setItem('homeStocks', JSON.stringify(groupData['homeStock']));
      localStorage.setItem('homeNews', JSON.stringify(groupData['homeNews']));
    });
    
    if (props.rq == "Home") {
        
        const newsStates = JSON.parse(localStorage.getItem('homeNews'))[props.ticker+'Data']['articles'];
        console.log('Render', newsStates);
        
            return (

                <div className={`newsArea ${props.ticker}`}>{
                    newsStates.map((ix)=>{<p>Hi{ix['title']}</p>})
                    }
                    <div className="gridContainer">
                    
                    
                    {
                    newsStates.map((url)=>{
                            <div className="iframely-embed">
                                <a href={url['url']}>
                                    <div className="iframely-responsive" >
                                        <img src={url['urlToImage']}/>
            
                                         <p className="headline">{url['title']}</p>
            
                                    </div>
                                </a>
                            </div>
                        })
                    }
                    </div>
                </div>
            );
    }

};

export default News;
