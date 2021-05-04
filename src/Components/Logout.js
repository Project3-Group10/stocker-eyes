import React from 'react';
import { GoogleLogout } from "react-google-login";
import socket from "./utils/socket";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function Logout(props) {
    const onSuccess = () => {
        sessionStorage.clear();
        alert('Successfully logged out');
        window.location.reload(false);
        props.setIsLoggedIn(false);
    };

    return (
        <div className="logout">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;