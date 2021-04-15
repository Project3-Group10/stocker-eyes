import React from 'react';
import {useEffect, useState} from 'react';
import socket from '../../socket';

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
  
    useEffect(() => {
      socket.on('logged_in', (data) => {
        setImageUri(data['imageUri']);
        setName(data['name']);
        setEmailAddress(data['emailAddress']);
        setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = true);
      });
    }, []);

    return(
        <div className="container">
          <img src={imageUri} alt="new"/>
          <h1> Name: {name} </h1>
          <h2> Email Address: {emailAddress} </h2>
       </div>
    );
  }

  export default Profile;