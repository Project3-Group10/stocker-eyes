import React from 'react';
import { GoogleLogout } from "react-google-login";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function Logout() {
    const onSuccess = () => {
        alert('Successfully logged out');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;