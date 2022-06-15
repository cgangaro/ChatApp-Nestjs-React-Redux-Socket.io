import React, { useEffect, useRef, useState } from "react";
import ScrollIntoView from 'react-scroll-into-view'
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../State";
import { Client, msg } from "../State/type";
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../State';
import "./CSS/AffMsg.css"
import "./CSS/All.css"
import { validateInput } from '../Utils/logUtils';
import { addClient, conversAdd } from "../State/Action-Creators";

interface msgToSend {
    sender: string;
    recipient: string;
    text: string;
  }

function AffMsg() {

    const msgScroll = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = useScrollToBottom();

    const converList = useSelector((state: RootState) => state.msg)
    const logData = useSelector((state: RootState) => state.log)
    const utilsData = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch();

    const { msgAdd, setUsername, addClient, conversAdd } = bindActionCreators(actionCreators, dispatch);

    const [text, setText] = useState('Wsh la team');
    const [recipient, setRecipient] = useState('');
    const [index, setIndex] = useState(-1);

    utilsData.socket.removeAllListeners();

    React.useEffect(() => {
        utilsData.socket.on('friendsList', function(arrClient: Client[]) {
            console.log('Friends List received, useEffect()');
            for (var i = 0; i < arrClient.length; i++)
            {
              if (arrClient[i].username.length > 0 && arrClient[i].id != logData.id)
              {
                console.log(`add client: ${arrClient[i].username}`)
                addClient(arrClient[i]);
                conversAdd(arrClient[i].username);
              }
            }
          })
          
        utilsData.socket.on('newFriend', function(client: Client) {
            console.log(`new Friend: ${client.username}, useEffect()`);
            if (client.id != logData.id)
            {
              addClient(client);
              conversAdd(client.username);
            }
          })
    })

    // React.useEffect(() => {
    //     scrollToBottom()
    //   }, [converList.list[index]]);

    // utilsData.socket.on('disconnect', function() {
    //     console.log('Disconnected');
    // });

    utilsData.socket.on('msgInputToOtherClient', function(msgToSend: any) {
        console.log(msgToSend.sender, 'said: ', msgToSend.text);
        let newmsg: msg = {
            sender: msgToSend.sender,
            text: msgToSend.text,
            recipient: "Me"
        }
        msgAdd(newmsg);
    })

    function DisplayBubble(props: {msg: msg}) {
        if (props.msg.sender ===  "Me")
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
        if (converList.active.length > 0)
        {
            if (validateInput(converList.active) && validateInput(text)) {
                const message: msgToSend = {
                    sender: logData.username,
                    recipient: converList.active,
                    text: text,
                }
                const msgToList: msg = { 
                    sender: "Me",
                    recipient: converList.active,
                    text: text
                };
                utilsData.socket.emit('msgToOtherClient', message);
                msgAdd(msgToList);
                setText('');
            }
            else
                console.log("Msg non valide")
        }
        else
            console.log("Send: pas de convers active")
    }

    function DisplayConvers(props: {}) {
        console.log('display convers');
        if (converList.active.length > 0)
        {
            console.log(`convers activ = ${converList.active}, count ${converList.count}`);
            if (converList.count > 0)
                console.log(`count > 0 et [0] = ${converList.list[0].name}`)
            const index_test = converList.list.findIndex(item => item.name === converList.active);
            setIndex(index_test);
            console.log(`index = ${index}`);
            if (index >= 0)
            {
                const msgList = converList.list[index];
                return (
                    <div id="affichage" ref={msgScroll}>
                        {msgList.msg.map((msg, index) => (
                            <div id="affListMsg" key={index}>
                                <DisplayBubble msg={msg}/>
                            </div>
                        ))}
                    </div>
                );
            }
            else
            {
                return (
                    <div id="affichage">
                    </div>
                );
            }
        }
        else
        {
            return (
                <div id="affichage">
                </div>
            );
        }
    }

    function TestAddMsg() {
        if (converList.active.length > 0)
        {
            console.log(`add msg, convers active = ${converList.active}`);
            const newmsg: msg = {
                text: "ok1",
                sender: converList.active,
                recipient: logData.username
            }
            msgAdd(newmsg);
        }
        else
            console.log('Pas de convers active');
    }

    return (
    <>
        <div className="main_container" id="main_AffMsg">
            <DisplayConvers/>
            <div id="sendZone">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter message..."
                />
                <button type="button" onClick={() => sendMessage()}>
                    Send
                </button>
            </div>
        </div>
    </>
  );
}

export default AffMsg;