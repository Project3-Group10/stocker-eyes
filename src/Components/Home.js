import React from 'react';
import Login from "./Login";
import Logout from "./Logout";
import Stock from "./Stock";
import '../App.css'

function Home() {
    return (
        <div className="App">
            <Login />
            <Logout />
            <Stock />
        </div>
    );
}

export default Home;
