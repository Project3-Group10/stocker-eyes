import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import socket from "./socket";
import "../../css/FavoriteList.css";


const FavoriteList = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const style = {
        overlay: {
            height: '600px',
            width: '600px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: '-300px',
            marginLeft: '-270px',
            backgroundColor: 'white',
            borderRadius: '5px',
            texAlign: 'center'
        },
        content: {
            color: 'black'
        },
    };
    

    useEffect(() => {
        if(sessionStorage.getItem('favList')){
            var temp = JSON.parse(sessionStorage.getItem('favList'));
            setData(temp);
        }

        
    }, []);

    const deleteStock = (index) => {
      var emitData = { 'name': sessionStorage.getItem('name'), 'email': sessionStorage.getItem('email'), 'tickerName': data[index] }
      socket.emit('deleteStockFavList', emitData);
    }
    
    
    return(
        <div className="container">
            <button className="favListButton" onClick={()=>setShowModal(!showModal)}> 
                Show Favorite List
            </button>
            <div className="favListModal">
            <Modal isOpen={showModal} style={style} className='favoriteListModal'>
              <center>
                <h2> Favorite List </h2>
                <table className="table">
                  <tr>
                    <th>  # </th>
                    <th> Name </th>
                    <th> Edit </th>
                  </tr>
                  
                  {data.map((item, index) => {
                    return(
                      <tr>
                        <th> {(index + 1) + '.'} </th>
                        <th> {item} </th>
                        <th> <button onClick={()=> deleteStock(index)}> Delete </button> </th>
                      </tr>
                    );
                  })}
                  
                </table>
                <button className='closeHighScoreBoard' onClick={()=>setShowModal(!showModal)}> Close </button>
              </center>
            </Modal>
            </div>

        </div>
    );
}

export default FavoriteList;