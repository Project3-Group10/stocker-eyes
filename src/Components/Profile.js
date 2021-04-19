import React from 'react';
import {useEffect, useState} from 'react';
import Logout from "./Logout";
import { GoogleLogout } from "react-google-login";
import '../css/Profile.css';

const defaultLoggedIn = false;

export const Profile = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');


    useEffect(() => {
        const temp = localStorage.getItem('isLoggedIn');
        if (temp === 'true')
        {
            setIsLoggedIn(tempIsLoggedIn => temp);
        } else {
            setIsLoggedIn(tempIsLoggedIn => false);
        }
      setImageUri(localStorage.getItem('imageUrl'));
      setName(localStorage.getItem('name'));
      setEmailAddress(localStorage.getItem('email'));


    }, [])

    const onSuccess=() => {
      console.log('logged out')
    }

    return(
        <div className="profileContainer">
          { isLoggedIn ?
          <div>
          <img src={imageUri} alt="new"/>
          <h1> Name: {name} </h1>
          <h2> Email Address: {emailAddress} </h2>
              <Logout />
          </div>
            : <div><h1> You are not logged in </h1></div>
        }
          </div>
    );
  }


  export default Profile;