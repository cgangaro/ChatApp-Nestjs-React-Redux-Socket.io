import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../State";
import { msgList } from "../State/type";
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../State';
import "./CSS/AffMsg.css"
import "./CSS/All.css"
import { validateInput } from '../Utils/logUtils';

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

    const [text, setText] = useState('Wsh la team');
    const [recipient, setRecipient] = useState('');

    utilsData.socket.removeAllListeners();

    // utilsData.socket.on('disconnect', function() {
    //     console.log('Disconnected');
    // });

    utilsData.socket.on('msgInputToOtherClient', function(msgToSend: any) {
        console.log(msgToSend.sender, 'said: ', msgToSend.text);
        let newmsg: msgList = {
            sender: msgToSend.sender,
            text: msgToSend.text
        }
        msgAdd(newmsg);
    })

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

    function sendMessage() {
        console.log("sendMessage()")

        if (validateInput(recipient) && validateInput(text)) {
            const message: msgToSend = {
                sender: logData.id,
                recipient: recipient,
                text: text,
            }
            const msgToList: msgList = {
                sender: logData.username,
                text: text
            };
            utilsData.socket.emit('msgToOtherClient', message);
            msgAdd(msgToList);
            setText('');
        }
        else
            console.log("Msg non valide")
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
            <div id="sendZone">
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