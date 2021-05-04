import React from 'react';
import socket from "./utils/socket";
import { useState, useEffect } from 'react';

const News = (props) => {

    const [homeNews, sethomeNews] = useState(null);
    const [searchNews, setsearchNews] = useState(null);
    
    

    useEffect(() => {
        socket.on('homeResponse', (groupData) => {

            sessionStorage.setItem('homeStocks', JSON.stringify(groupData['homeStock']));
            sessionStorage.setItem('homeNews', JSON.stringify(groupData['homeNews']));

            const replace = JSON.parse(JSON.stringify(groupData['homeNews']))[props.ticker + 'Data']['articles'];
             
            sethomeNews(replace);
        });
        
        socket.on('searchResponse', (groupData) => {

            sessionStorage.setItem('searchStocks', JSON.stringify(groupData['searchStock']));
            sessionStorage.setItem('searchNews', JSON.stringify(groupData['searchNews']));

            const replace = JSON.parse(JSON.stringify(groupData['searchNews']))['articles'];

            setsearchNews(replace);
        });
    }, []);


    if (props.rq == "Home") {
        
        return (

                <div className={`newsArea ${props.ticker}`}>
                    <div className="gridContainer">

                    {
                    
                    homeNews == null?'':homeNews.map((url)=>
                    
                    <a href={url["url"]}>
                    <div className="article-card">
                      <div className="article-card__thumbnail">
                        <img src={url["urlToImage"]} alt="" />
                      </div>
                      
                      <div className="article-card__content">
                        <h2 className="article-card__title">{url["title"]}</h2>
                        
                        <div className="article-card__excerpt">
                          <p>
                          {url["description"]} 
                          </p>
                        </div>
                        
                        <div className="article-card__meta">
                            <span className="article-card__timestamp"><i className="ion-clock"></i>{url["publishedAt"].slice(5,10)}</span>
                        </div>
                      </div>
                    </div>
                     </a>
                    
                    )
                    }
                    </div>
                </div>
            );
    }

    if (props.rq == "Search") {
        return (

            <div className={`newsArea ${props.ticker}`}>
                    <div className="gridContainer">
                    
                    
                    {
                    
                    searchNews == null?'Empty':searchNews.map((url)=>
                    <a href={url["url"]}>
                    <div className="article-card">
                      <div className="article-card__thumbnail">
                        <img src={url["urlToImage"]} alt="" />
                      </div>
                      
                      <div className="article-card__content">
                        <h2 className="article-card__title">{url["title"]}</h2>
                        
                        <div className="article-card__excerpt">
                          <p>
                          {url["description"]} 
                          </p>
                        </div>
                        
                        <div className="article-card__meta">
                            <span className="article-card__timestamp"><i className="ion-clock"></i>{url["publishedAt"].slice(5,10)}</span>
                        </div>
                      </div>
                    </div>
                     </a>
                    
                    )
                    }
                    </div>
                </div>
        );
    }

};

export default News;