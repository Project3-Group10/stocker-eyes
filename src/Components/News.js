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
                    
                    homeNews == null?'Empty':homeNews.map((url)=>
                    
                    <div class="iframely-embed">
                        <a href={url['url']}>
                            <div class="iframely-responsive" >
                                <img src={url['urlToImage']}/>
    
                                 <p className="headline">{url['title']}</p>
    
                            </div>
                        </a>
                    </div>
                    
                    )
                    }
                    </div>
                </div>
            );
        }
        
        if (props.ticker == "ovv") {

            console.log('Before Render',homeNews == null?'Empty':homeNews);

            return (

                <div className={`newsArea ${props.ticker}`}>
                    <div className="gridContainer">
                    
                    {console.log('In Render',homeNews)}
                    {
                    
                    homeNews == null?'Empty':homeNews.map((url)=>
                    
                    <div class="iframely-embed">
                        <a href={url['url']}>
                            <div class="iframely-responsive" >
                                <img src={url['urlToImage']}/>
    
                                 <p className="headline">{url['title']}</p>
    
                            </div>
                        </a>
                    </div>
                    
                    )
                    }
                    </div>
                </div>
            );
        }
        
        if (props.ticker == "appl") {

            console.log('Before Render',homeNews == null?'Empty':homeNews);

            return (

                <div className={`newsArea ${props.ticker}`}>
                    <div className="gridContainer">
                    
                    {console.log('In Render',homeNews)}
                    {
                    
                    homeNews == null?'Empty':homeNews.map((url)=>
                    
                    <div class="iframely-embed">
                        <a href={url['url']}>
                            <div class="iframely-responsive" >
                                <img src={url['urlToImage']}/>
    
                                 <p className="headline">{url['title']}</p>
    
                            </div>
                        </a>
                    </div>
                    
                    )
                    }
                    </div>
                </div>
            );
        }
    }

};

export default News;
