import { useState } from "react";
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../State";
import { msg } from "../State/type";
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

    const clientList = useSelector((state: RootState) => state.clientList)
    const logData = useSelector((state: RootState) => state.log)
    const utilsData = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch();

    const { addMsg } = bindActionCreators(actionCreators, dispatch);

    const [text, setText] = useState('Wsh la team');
    const [recipient, setRecipient] = useState('');
    const [index, setIndex] = useState(-1);

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
        if (clientList.active.length > 0)
        {
            if (validateInput(clientList.active) && validateInput(text)) {
                const message: msgToSend = {
                    sender: logData.username,
                    recipient: clientList.active,
                    text: text,
                }
                const msgToList: msg = { 
                    sender: "Me",
                    recipient: clientList.active,
                    text: text
                };
                utilsData.socket.emit('msgToOtherClient', message);
                addMsg(msgToList);
                setText('');
            }
            else
                console.log("Msg non valide")
        }
        else
            console.log("Send: pas de convers active")
    }

    function DisplayConvers() {
        if (clientList.active.length > 0)
        {
            console.log(`convers activ = ${clientList.active}, count ${clientList.count}`);
            const index_test = clientList.list.findIndex(item => item.username === clientList.active);
            setIndex(index_test);
            if (index >= 0)
            {
                const client = clientList.list[index];
                return (
                    <div id="affichage">
                        {client.convers.msg.map((msg, index) => (
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