import React from 'react';
import Login from "./Login";
import Logout from "./Logout";
import '../App.css'

function Home() {
    return (
        <div className="App">
            <Login />
            <Logout />
        </div>
    );
}

export default Home;