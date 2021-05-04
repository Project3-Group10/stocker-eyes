import React from 'react';
import socket from "./utils/socket";
import { useState, useEffect } from 'react';

const News = (props) => {

    const [homeNews, sethomeNews] = useState(null);
    const [searchNews, setsearchNews] = useState(null);
    const [dashNews, setDashNews] = useState(null);
    
    

    useEffect(() => {
        socket.on('homeResponse', (groupData) => {
            const replace = JSON.parse(JSON.stringify(groupData['homeNews']))[props.ticker + 'Data']['articles'];
            
            sethomeNews(replace);
        });
        
        socket.on('searchResponse', (groupData) => {
            console.log(groupData);
            const replace = JSON.parse(JSON.stringify(groupData['searchNews']))['articles'];
            setsearchNews(replace);
        });

        socket.on('dashboardResponse', (groupData) => {
          console.log(props.name)
          

            if (props.ticker === sessionStorage.getItem('myStockName1')) {
              const replace = JSON.parse(JSON.stringify(groupData['newsData']))[props.ticker]['articles'];
              setsearchNews(replace);
            }
            else if (props.ticker === sessionStorage.getItem('myStockName2')) {
              const replace = JSON.parse(JSON.stringify(groupData['newsData']))[props.ticker]['articles'];
              setsearchNews(replace);
            }
            else if (props.ticker === sessionStorage.getItem('myStockName3')) {
              const replace = JSON.parse(JSON.stringify(groupData['newsData']))[props.ticker]['articles'];
              setsearchNews(replace);
            }
       
      });

    }, []);


    if (props.rq == "Home") {
        return (

                <div className={`newsArea ${props.ticker}`}>
                    <div className="gridContainer">

                    {
                    
                    homeNews == null?'':homeNews.map((url)=>
                    
                    <a href={url["url"]}>
                    <div class="article-card">
                      <div class="article-card__thumbnail">
                        <img src={url["urlToImage"]} alt="" />
                      </div>
                      
                      <div class="article-card__content">
                        <h2 class="article-card__title">{url["title"]}</h2>
                        
                        <div class="article-card__excerpt">
                          <p>
                          {url["description"]} 
                          </p>
                        </div>
                        
                        <div class="article-card__meta">
                            <span class="article-card__timestamp"><i class="ion-clock"></i>{url["publishedAt"].slice(5,10)}</span>
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
                    <div class="article-card">
                      <div class="article-card__thumbnail">
                        <img src={url["urlToImage"]} alt="" />
                      </div>
                      
                      <div class="article-card__content">
                        <h2 class="article-card__title">{url["title"]}</h2>
                        
                        <div class="article-card__excerpt">
                          <p>
                          {url["description"]} 
                          </p>
                        </div>
                        
                        <div class="article-card__meta">
                            <span class="article-card__timestamp"><i class="ion-clock"></i>{url["publishedAt"].slice(5,10)}</span>
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

    if (props.rq == "Dashboard") {
      return (

          <div className={`newsArea ${props.ticker}`}>
                  <div className="gridContainer">
                  

                  {
                  
                  searchNews == null?'Empty':searchNews.map((url)=>
                  <a href={url["url"]}>
                  <div class="article-card">
                    <div class="article-card__thumbnail">
                      <img src={url["urlToImage"]} alt="" />
                    </div>
                    
                    <div class="article-card__content">
                      <h2 class="article-card__title">{url["title"]}</h2>
                      
                      <div class="article-card__excerpt">
                        <p>
                        {url["description"]} 
                        </p>
                      </div>
                      
                      <div class="article-card__meta">
                          <span class="article-card__timestamp"><i class="ion-clock"></i>{url["publishedAt"].slice(5,10)}</span>
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