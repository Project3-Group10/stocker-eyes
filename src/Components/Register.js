import React from 'react';
import Login from "./Login";
import Logout from "./Logout";

const Register = () => {
    return (
        <div className="pageHolder">
            <div className="loginContainer" >
                <h2> Please log in using Google </h2>
                <Login />
                <Logout />
            </div>
        </div>
    );
}

export default Register;
