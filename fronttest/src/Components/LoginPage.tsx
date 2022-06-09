import React, { useState } from "react";
import "./CSS/LoginPage.css"

function LoginPage() {
    const [name, setName] = useState('');

    return (
        <div id="main">
            <div id="main2">
                <p id="title">Welcome to cgangaro's messaging app!</p>
                <p>Please, enter your login</p>
                <div id="inputAndButton">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your login..."
                    />
                    <button>Let's go!</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;