import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './utils/refreshToken';
import io from 'socket.io-client';
import socket from "./utils/socket";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
    const onSuccess = (res) => {
        console.log('Login successful')
        refreshTokenSetup(res);
        const id_token = res.getAuthResponse().id_token;
        socket.emit('Login',{ id_token: id_token });
        console.log(res);
        localStorage.setItem('name', res.profileObj['name']);
        localStorage.setItem('email', res.profileObj['email']);
        localStorage.setItem('imageUrl', res.profileObj['imageUrl']);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const onFailure = (res) => {
        console.log('Login failed:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;