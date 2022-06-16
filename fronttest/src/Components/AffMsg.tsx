import { useEffect, useRef, useState } from "react";
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

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const [text, setText] = useState('');
    const [messages, setMessages] = useState<msg[]>([]);

    let textInput = "";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();

    })

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();

    }, [messages])

    useEffect(() => {
        console.log('useEffect 1');
    }, [textInput])

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
        console.log('display convers 2');
        if (clientList.active.length > 0)
        {
            console.log(`convers activ = ${clientList.active}, count ${clientList.count}`);
            const index = clientList.list.findIndex(item => item.username === clientList.active);
            console.log(index);
            if (index >= 0)
            {
                const client = clientList.list[index];
                setMessages(client.convers.msg);
                return (
                    <div id="affichage">
                        {messages.map((msg, index) => (
                            <div id="affListMsg" key={index}>
                                <DisplayBubble msg={msg}/>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                );
            }
            else
            {
                setMessages([]);
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