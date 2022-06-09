import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, RootState } from "../State";
import { validateInput } from "../Utils/logUtils";
import "./CSS/LoginPage.css"

function LoginPage() {
    
    const logData = useSelector((state: RootState) => state.log)
    const utilsData = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch();
  
    const { setUsername, setId } = bindActionCreators(actionCreators, dispatch);
    const [name, setName] = useState('');

    utilsData.socket.removeAllListeners();

    function setLogin() {
        if (validateInput(name))
        {
            setUsername(name);
            utilsData.socket.emit('setUsername', name);
            setName("");
        }
    }

    utilsData.socket.on('connect', function() {
        console.log('Connected');
        utilsData.socket.emit('msgConnection');
    });

    utilsData.socket.on('msgToClient', function(data: any) {
        if (data === 505)
        console.log('msgToServer', 'Msg bien reçu : 505');
        else
        console.log('msgToServer', data);
    });

    utilsData.socket.on('ID', function(data: any) {
        console.log('ID received :', data);
        setId(data);
    });

    return (
        <div id="main">
            <div id="main2">
                <p id="title">Welcome to cgangaro's messaging app!</p>
                <div id="inputAndButton">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your login..."
                    />
                    <button type="button" onClick={() => setLogin()}>Let's go!</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;