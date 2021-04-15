import React from 'react';
import {useEffect, useState} from 'react';
import  GoogleLogin  from "react-google-login";
import socket from '../../socket';

export function GAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
      socket.on('googleInfo', (data) => {
        setClientId(data['googleId']);
        console.log(data['googleId']);
      });
  }, []);

  const responseGoogleFail=(response)=>{
    //console.log(response);
  }

    const responseGoogleSuccess=(response)=>{
      socket.emit('logged_in', response);
  }

  return (
      <div>
        <GoogleLogin class="GoogleButton"
            clientId={clientId}
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFail}
        />
      </div>
  );
}


export default GAuth;