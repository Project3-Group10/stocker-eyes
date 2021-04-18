import React from 'react';
import './App.css';
import Home from '../src/pages/Home';
import Profile from '../src/pages/Profile';
import  { GoogleLogin, GoogleLogout }  from "react-google-login";
import socket from './socket';
import { refreshTokenSetup } from './utils/refreshToken';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [homeState, setHomeState] = useState(true);
  const [registerState, setRegisterState] = useState(false);
  const [profileState, setProfileState] = useState(false);
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
      localStorage.setItem('user', data['name']);
      setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
      console.log('user logged in')
    });

    //readCookie();

  }, []);

  const responseGoogleFail=(response)=>{
    console.log('FAILED GOOGLE SIGNED IN');
  }



  const responseGoogleSuccess=(response)=>{
    setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
    console.log('isLoggedIn');
    console.log(response);
    socket.emit('logged_in', response);
    Profile({loggedIn: true});
    refreshTokenSetup(response);
  }

  // const readCookie = () => {
  //   const user = Cookies.get("user");
  //   if(user){
  //     setIsLoggedIn(true);
  //   }
  // }

  
  const nav_home = () => {
    setHomeState(tempState => tempState = true);
    setRegisterState(tempState => tempState = false);
    setProfileState(tempState => tempState = false);
    window.location.reload(false);
  };

  const nav_register = () => {
    setRegisterState(tempState => tempState = true);
    setProfileState(tempState => tempState = false);
    setHomeState(tempState => tempState = false);
  };

  const nav_profile = () => {
    setProfileState(tempState => tempState = true);
    setHomeState(tempState => tempState = false);
    setRegisterState(tempState => tempState = false);
  };

  return (
    <div className="home">

      <div className="navigation">
                <button className="menuItem" onClick={()=>nav_home()}> Home </button>
                <button className="menuItem" onClick={()=>nav_register()}> Register </button>
                <button className="menuItem" onClick={()=>nav_profile()}> Profile </button>
        </div>
      
      
    
    { 
    homeState ? 
      <div className="mainContainer">
          <Home />
      </div> 
      : 
      null
    }
    
    {
      registerState ?
      
      <div className="mainContainer"> 
      <div className="googleContainer">
        <GoogleLogin
            clientId={clientId}
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFail}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
        />
        </div>
      </div> : null
    }
    
    {
      profileState ?
      <div className="mainContainer"> 
        <Profile isLogin={isLoggedIn} imageUrl={imageUri} name={name} emailAddress={emailAddress} clientId={clientId} />
      </div> : null
    }

  </div>
  );
}

export default App;