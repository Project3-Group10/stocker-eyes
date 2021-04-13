import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';
import { GoogleLogin } from "react-google-login";

import './App.css';
const socket = io();

function GAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [clientId, setClientId] = useState('');

  useEffect(() => {

      socket.on('googleInfo', (data) => {
        setClientId(data['googleId']);
        console.log(data['googleId']);
      });
      }, []);

      useEffect(() => {

      socket.on('logged_in', (data) => {
        setImageUri(data['imageUri']);
        setName(data['name']);
        setEmailAddress(data['emailAddress']);
        setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
        console.log(data);
      });
      }, []);

  const responseGoogleFail=(response)=>{
    //console.log(response);
  }

    const responseGoogleSuccess=(response)=>{
    //imageUri = response.Qs.EI;
    //console.log(response);
    socket.emit('logged_in', response);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Link to="/">HOME</Link> | <Link to="/profile"> Profile </Link>| <Link to="/login">Log In</Link> |{ isLoggedIn ? <Link to="/authorize"> Authorize </Link> : '|' + <Link to="/logout">Log Out</Link> }
        <Switch>

          <Route exact path="/">
             <button> HELLO LOGIN </button>
          </Route>

          <Route path="/profile">
          <p> Welcome to the profile page </p>
          </Route>

          <Route path="/authorize">
           <div>
            <img src={imageUri} alt="new"/>
            <h1> Name: {name} </h1>
            <h2> Email Address: {emailAddress} </h2>
           </div>
          </Route>

          <Route path="/login">
          <div className="LogIn">
            <p><a> Google Log In </a></p>
            <GoogleLogin
              clientId={clientId}
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFail}
              />
          </div>

          </Route>


          <Route path="/logout">

          <p>  Good Bye! </p>
          <button onClick> Log Out </button>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default GAuth;