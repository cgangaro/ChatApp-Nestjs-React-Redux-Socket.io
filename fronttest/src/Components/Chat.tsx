import React, { useEffect, useRef, useState } from "react";
import "./CSS/FriendsList.css"
import "./CSS/All.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../State";
import { bindActionCreators } from "redux";
import { io } from "socket.io-client";
import { validateInput } from "../Utils/logUtils";
import { render } from "@testing-library/react";
import { Client, msg } from "../State/type";
import AffMsg from "./AffMsg";

function Chat() {
    
    const logData = useSelector((state: RootState) => state.log)
    const utilsData = useSelector((state: RootState) => state.utils)
    const clientList = useSelector((state: RootState) => state.clientList)
    const msg = useSelector((state: RootState) => state.msg)

    const dispatch = useDispatch();

    const { addClient, removeClient, setActivConvers, conversAdd, msgAdd } = bindActionCreators(actionCreators, dispatch);

    utilsData.socket.removeAllListeners();

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
      utilsData.socket.on('removeFriend', function(client: Client) {
        console.log('removeFriend, useEffect()');
        if (client.id != logData.id)
          removeClient(client);
      })
      utilsData.socket.on('msgInputToOtherClient', function(msgToSend: any) {
        console.log(msgToSend.sender, 'said: ', msgToSend.text);
        let newmsg: msg = {
            sender: msgToSend.sender,
            text: msgToSend.text,
            recipient: "Me"
        }
        msgAdd(newmsg);
    })
  

  return (
    <>

    </>
  );
}

export default Chat;