import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../State";
import { msg } from "../State/type";
import MessageComponent from "./Message";
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../State';
import "./CSS/AffMsg.css"
import "./CSS/All.css"
import bankReducer from '../State/Reducers/bankReducers';

const socket = io('http://localhost:5000');

interface msgToSend {
    sender: string;
    recipient: string;
    text: string;
  }


function AffMsg() {
    const amount = useSelector((state: RootState) => state.bank)
    const msgList = useSelector((state: RootState) => state.msg)
    const dispatch = useDispatch();

    const { msgAdd, depositMoney, withdrawMoney, bankrupt } = bindActionCreators(actionCreators, dispatch);

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [text, setText] = useState('Wsh la team');
    const [recipient, setRecipient] = useState('');

    socket.removeAllListeners();
    socket.on('connect', function() {
        console.log('Connected');
        socket.emit('msgConnection');
    });
    socket.on('disconnect', function() {
        console.log('Disconnected');
    });
    socket.on('msgToClient', function(data) {
        if (data === 505)
        console.log('msgToServer', 'Msg bien reçu : 505');
        else
        console.log('msgToServer', data);
    });

    socket.on('ID', function(data) {
        console.log('ID received :', data);
        setId(data);
    });

    socket.on('msgInputToOtherClient', function(msgToSend) {
        console.log(msgToSend.sender, 'said: ', msgToSend.text);
        let newmsg: msg = {
            sender: msgToSend.sender,
            text: msgToSend.text
        }
        msgAdd(newmsg);
    })

    function validateInput() {
        return id.length > 0 && text.length > 0 && recipient.length > 0;
    }

    function sendMessage() {
        if (validateInput()) {
        const message: msgToSend = {
            sender: id,
            recipient: recipient,
            text: text,
        };

        socket.emit('msgToOtherClient', message);
        setText('');
        }
    }

    const newmsg: msg = {
        text: "ok1",
        sender: "ok2"
    }

  return (
    <>
        <div className="main_container" id="main_AffMsg">
            <div id="affichage">
                <p>{msgList.count}</p>
                {msgList.msg.map((msg, index) => (
                    <div key={index} style={{display:"flex", justifyContent:"space-between"}}>
                        <div id="bulle" sender="you">
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div id="envoi">
                <input
                    value={recipient}
                    onChange={e => setRecipient(e.target.value)}
                    placeholder="Recipient..."
                />
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter message..."
                />
                <button type="button" onClick={() => sendMessage()}>
                    Send
                </button>
                <button onClick={() => msgAdd(newmsg)}>AddMsg Test</button>
            </div>
        </div>
    </>
  );
}

export default AffMsg;