import React from 'react';
import socket from "./utils/socket";
import {useState, useEffect} from 'react';

const News = (props) => {
    console.log('NewsTicker',props.ticker?props.ticker:localStorage.getItem('TickerName'));
    const [newsStates, setNews] = useState([]);
    const [once, setOnce] = useState(0);
    
    if (!once) {
        socket.emit("newsRequest", props.ticker?props.ticker:localStorage.getItem('TickerName'));
        setOnce(1);
    }
    
    useEffect(() => {
        socket.on('newsResponse', (data) => {
          setNews(data['articles']);
      });
      console.log('NewsState',newsStates);
    }, []);
    
    
    console.log('NewsState',newsStates);
    return(
        
        <div className="newsHolder">
            <div className="gridContainer">
            {newsStates?newsStates.map((url)=>
                
                    <div class="iframely-embed">
                        <a href={url['url']}>
                            <div class="iframely-responsive" >
                                <img src={url['urlToImage']}/>
    
                                 <p className="headline">{url['title']}</p>
    
                            </div>
                        </a>
                    </div>
                
            ):''}
            </div>
        </div>
    );
};

export default News;