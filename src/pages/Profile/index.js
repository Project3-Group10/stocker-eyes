import React from 'react';
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

    return(
        <div className="container">
          { isLoggedIn ?
          <div>
          <img src={imageUri} alt="new"/>
          <h1> Name: {name} </h1>
          <h2> Email Address: {emailAddress} </h2>
          </div>
            : <div> You are not logged in </div>
        }
          </div>
    );
  }


  export default Profile;