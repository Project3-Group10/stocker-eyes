import React from 'react';
import {useEffect, useState} from 'react';
import { GoogleLogout } from "react-google-login";
import './index.css';
import Cookies from 'js-cookie';

const defaultLoggedIn = false;

export const Profile = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');


    useEffect(() => {
      setIsLoggedIn(tempIsLoggedIn => tempIsLoggedIn = props.isLogin);
      setImageUri(props.imageUrl);
      setName(props.name);
      setEmailAddress(props.emailAddress);
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
          <div className="googleLogOut"> 
            <GoogleLogout
            clientId={props.clientId}
            onLogoutSuccess={onSuccess}
            buttonText="Log Out"
          />
          </div>
          </div>
            : <div><h1> You are not logged in </h1></div>
        }
          </div>
    );
  }


  export default Profile;