import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../State";
import { msgList } from "../State/type";
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../State';
import "./CSS/AffMsg.css"
import "./CSS/All.css"

interface msgToSend {
    sender: string;
    recipient: string;
    text: string;
  }

function AffMsg() {
    const msgList = useSelector((state: RootState) => state.msg)
    const logData = useSelector((state: RootState) => state.log)
    const utilsData = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch();

    const { msgAdd, setUsername } = bindActionCreators(actionCreators, dispatch);

    const [id, setId] = useState('');
    const [text, setText] = useState('Wsh la team');
    const [recipient, setRecipient] = useState('');

    utilsData.socket.removeAllListeners();

    utilsData.socket.on('connect', function() {
        console.log('Connected');
        utilsData.socket.emit('msgConnection');
    });

    utilsData.socket.on('disconnect', function() {
        console.log('Disconnected');
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

    utilsData.socket.on('msgInputToOtherClient', function(msgToSend: any) {
        console.log(msgToSend.sender, 'said: ', msgToSend.text);
        let newmsg: msgList = {
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
        const msgToList: msgList = {
            sender: logData.username,
            text: text
        }

        utilsData.socket.emit('msgToOtherClient', message);
        msgAdd(msgToList);
        setText('');
        }
    }

    const newmsg: msgList = {
        text: "ok1",
        sender: "ok2"
    }

    function DisplayBubble(props: {msg: msgList}) {
        if (props.msg.sender ===  logData.username)
            return (
                <div className="msgFrame" id="myMsgFrame">
                    <div className="bubble" id="myBubbleMessage">
                        <p>{props.msg.text}</p>
                    </div>
                </div>
            )
        else
            return (
                <div className="msgFrame" id="correspondentMsgFrame">
                    <div className="bubble" id="correspondentBubbleMessage">
                        <p>{props.msg.text}</p>
                    </div>
                </div>
            )
    }

  return (
    <>
        <div className="main_container" id="main_AffMsg">
            <div id="affichage">
                {msgList.msg.map((msg, index) => (
                    <div id="affListMsg" key={index}>
                        <DisplayBubble msg={msg}/>
                    </div>
                ))}
            </div>
            <div id="send">
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