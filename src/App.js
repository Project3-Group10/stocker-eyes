import React from 'react';
import './App.css';
import Home from '../src/pages/Home';
import GAuth from '../src/pages/SignIn';
import Profile from '../src/pages/Profile';
import  { GoogleLogin, GoogleLogout }  from "react-google-login";
import socket from './socket';
import Cookies from 'js-cookie';



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
      setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
    });

    readCookie();

  }, []);

  const responseGoogleFail=(response)=>{
    console.log('FAILED GOOGLE SIGNED IN');
  }

  const onSuccess=() => {
    console.log('logged out')
    Cookies.clear("user");
  }

  const responseGoogleSuccess=(response)=>{
    setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
    console.log('isLoggedIn');
    console.log(response);
    socket.emit('logged_in', response);
    Profile({loggedIn: true});
    Cookies.set("user", "logInTrue");
  }

  const readCookie = () => {
    const user = Cookies.get("user");
    if(user){
      setIsLoggedIn(true);
    }
  }

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
                <button onClick={()=>nav_home()}> Home </button>
                <button onClick={()=>nav_register()}> Register </button>
                <button onClick={()=>nav_profile()}> Profile </button>
                {
      isLoggedIn ? 
      <div> 
            <GoogleLogout
            clientId='658725523197-fo8h1djnvhmpgb94h5a6uraibr3se627.apps.googleusercontent.com'
            onLogoutSuccess={onSuccess}
    />
      </div> 
      : null
    }
        </div>
      
      
    
    { 
    homeState ? 
      <div className="homeContainer">
          <Home />
      </div> 
      : 
      null
    }
    
    {
      registerState ?
      
      <div className="registerContainer"> 
      <div className="googleContainer">
        <GoogleLogin
            clientId='658725523197-fo8h1djnvhmpgb94h5a6uraibr3se627.apps.googleusercontent.com'
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
      <div className="profileContainer"> 
        <Profile isLogin={isLoggedIn} imageUrl={imageUri} name={name} emailAddress={emailAddress}/>
      </div> : null
    }

  </div>
  );
}

export default App;

