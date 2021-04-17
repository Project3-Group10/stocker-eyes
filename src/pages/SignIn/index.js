import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import {useEffect, useState} from 'react';
import socket from '../../socket';
import { Profile } from '../Profile';
import { Link } from 'react-router-dom';
import './index.css'

function GAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  useEffect(() => {
      socket.on('googleInfo', (data) => {
        setClientId(data['googleId']);
        console.log(data['googleId']);
      });

      socket.on('logged_in', (data) => {
        setImageUri(data['imageUri']);
        setName(data['name']);
        setEmailAddress(data['emailAddress']);
        setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
      });

  }, []);

  const responseGoogleFail=(response)=>{
    console.log('FAILED GOOGLE SIGNED IN');
  }

    const responseGoogleSuccess=(response)=>{
      setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
      console.log('isLoggedIn' + response);
      socket.emit('logged_in', response);
      Profile({loggedIn: true});

  }

  return (
  <div className="container">
       

        <div className="googleContainer">

        </div>
  
{ isLoggedIn?
      <div className="container">
          <div>
          <img src={imageUri} alt="new"/>
          <h1> Name: {name} </h1>
          <h2> Email Address: {emailAddress} </h2>
          </div>
          </div>
         : 
         <div> <h1> Please Log In </h1> </div> }
      </div>
  );
}


export default GAuth;