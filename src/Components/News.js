import React from 'react';
import socket from "./utils/socket";
import { useState, useEffect } from 'react';

const News = (props) => {

    const [homeNews, sethomeNews] = useState(null);
    const [searchNews, setsearchNews] = useState(null);
    
    

    useEffect(() => {
        socket.on('homeResponse', (groupData) => {

            localStorage.setItem('homeStocks', JSON.stringify(groupData['homeStock']));
            localStorage.setItem('homeNews', JSON.stringify(groupData['homeNews']));

            const replace = JSON.parse(JSON.stringify(groupData['homeNews']))[props.ticker + 'Data']['articles'];
             
            sethomeNews(replace);
        });
        
        socket.on('searchResponse', (groupData) => {

            localStorage.setItem('searchStocks', JSON.stringify(groupData['searchStock']));
            localStorage.setItem('searchNews', JSON.stringify(groupData['searchNews']));

            const replace = JSON.parse(JSON.stringify(groupData['searchNews']))['articles'];

            setsearchNews(replace);
        });
    }, []);


    if (props.rq == "Home") {
        // if (props.ticker == "wmt") {
        //     return (

        //         <div className={`newsArea ${props.ticker}`}>
        //             <div className="gridContainer">

        //             {
                    
        //             homeNews == null?'Empty':homeNews.map((url)=>
                    
        //             <div class="iframely-embed">
        //                 <a href={url['url']}>
        //                     <div class="iframely-responsive" >
        //                         <img src={url['urlToImage']}/>
    
        //                          <p className="headline">{url['title']}</p>
    
        //                     </div>
        //                 </a>
        //             </div>
                    
        //             )
        //             }
        //             </div>
        //         </div>
        //     );
        // }
        // if (props.ticker == "ovv") {
        //     return (

        //         <div className={`newsArea ${props.ticker}`}>
        //             <div className="gridContainer">

        //             {
                    
        //             homeNews == null?'Empty':homeNews.map((url)=>
                    
        //             <div class="iframely-embed">
        //                 <a href={url['url']}>
        //                     <div class="iframely-responsive" >
        //                         <img src={url['urlToImage']}/>
    
        //                          <p className="headline">{url['title']}</p>
    
        //                     </div>
        //                 </a>
        //             </div>
                    
        //             )
        //             }
        //             </div>
        //         </div>
        //     );
        // }
        // if (props.ticker == "appl") {
        //     return (

        //         <div className={`newsArea ${props.ticker}`}>
        //             <div className="gridContainer">

        //             {
                    
        //             homeNews == null?'Empty':homeNews.map((url)=>
                    
        //             <div class="iframely-embed">
        //                 <a href={url['url']}>
        //                     <div class="iframely-responsive" >
        //                         <img src={url['urlToImage']}/>
    
        //                          <p className="headline">{url['title']}</p>
    
        //                     </div>
        //                 </a>
        //             </div>
                    
        //             )
        //             }
        //             </div>
        //         </div>
        //     );
        // }
        
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
