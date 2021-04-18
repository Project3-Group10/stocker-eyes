import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import io from 'socket.io-client';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const socket = io();

function Login() {
    const onSuccess = (res) => {
        console.log('Login successful')
        refreshTokenSetup(res);
        const id_token = res.getAuthResponse().id_token;
        socket.emit('Login',{ id_token: id_token });

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