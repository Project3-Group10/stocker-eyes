import React from 'react';
import Login from "./Login";
import Logout from "./Logout";
import '../css/Register.css'

const Register = () => {
    return (
        <div className="pageHolder">
            <div>
                <Login />
                <Logout />
            </div>
        </div>
    );
}

export default Register;
