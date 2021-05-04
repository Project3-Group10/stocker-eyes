import React from 'react';
import {useEffect, useState} from 'react';
import Logout from "./Logout";
import { GoogleLogout } from "react-google-login";

const defaultLoggedIn = false;

export const Profile = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');


    useEffect(() => {
        const temp = sessionStorage.getItem('isLoggedIn');
        if (temp === 'true')
        {
            setIsLoggedIn(tempIsLoggedIn => temp);
        } else {
            setIsLoggedIn(tempIsLoggedIn => false);
        }
      setImageUri(sessionStorage.getItem('imageUrl'));
      setName(sessionStorage.getItem('name'));
      setEmailAddress(sessionStorage.getItem('email'));


    }, [])

    const onSuccess=() => {
      console.log('logged out')
    }

    return(
        <div className="pageHolder">
          { isLoggedIn ?
          <div className="profileCard">
            <div className="profilePicture-container">
              <img className="profilePicture" src={imageUri} alt="new"/>
            </div>
            <h1 className="username" > Name: {name} </h1>
            <h2 className="user-email" > Email Address: {emailAddress} </h2>
            <Logout />
          </div>
            : <div><h1> You are not logged in </h1></div>
        }
        </div>
    );
  }


  export default Profile;