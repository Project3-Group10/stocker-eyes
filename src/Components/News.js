import React from 'react';
import '../css/News.css';
import socket from "./utils/socket";
import {useState, useEffect} from 'react';

const News = (props) => {
    console.log(props.ticker);
    const [newsStates, setNews] = useState([]);
    const [once, setOnce] = useState(0);
    
    if (!once) {
        socket.emit("newsRequest", props.ticker);
        setOnce(1);
    }
    
    useEffect(() => {
        socket.on('newsResponse', (data) => {
          setNews(data['articles']);
      });
      console.log(newsStates);
    }, []);
    
    
    function newsRender () {
        var result = null;
        console.log("REUSSSSSSSSS",result);
        if (newsStates[0]) {
            for (let i = 0; i < newsStates.length; i+=1){
                result+=<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href={newsStates[i]['url']} data-iframely-url="//cdn.iframe.ly/ukMQBEV?iframe=card-small"></a></div></div>;
            }
        }
        
        return result;
    }
    
    
    console.log(newsStates);
    return(
        
        <div className="newsHolder">
            <div className="gridContainer">
            {newsStates.map((url)=>
                
                    <div class="iframely-embed">
                        <a href={url['url']}>
                            <div class="iframely-responsive" >
                                <img src={url['urlToImage']}/>
    
                                 <p className="headline">{url['title']}</p>
    
                            </div>
                        </a>
                    </div>
                
            )}
            </div>
        </div>
    );
};

export default News;