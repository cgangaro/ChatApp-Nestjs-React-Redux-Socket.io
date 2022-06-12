import * as React from "react";
import "./CSS/FriendsList.css"
import "./CSS/All.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../State";
import { bindActionCreators } from "redux";
import { io } from "socket.io-client";
import { validateInput } from "../Utils/logUtils";
import { render } from "@testing-library/react";
import { Client } from "../State/type";

function FriendsList() {

  const logData = useSelector((state: RootState) => state.log)
  const utilsData = useSelector((state: RootState) => state.utils)
  const clientList = useSelector((state: RootState) => state.clientList)

  const dispatch = useDispatch();

  const { addClient, removeClient } = bindActionCreators(actionCreators, dispatch);

  utilsData.socket.removeAllListeners();

  React.useEffect(() => {
    utilsData.socket.on('friendsList', function(arrClient: Client[]) {
      console.log('Friends List received, useEffect()');
      for (var i = 0; i < arrClient.length; i++)
      {
        if (arrClient[i].username.length > 0 && arrClient[i].id != logData.id)
        {
          console.log("add client")
          addClient(arrClient[i]);
        }
      }
    })
    utilsData.socket.on('newFriend', function(client: Client) {
      console.log('new Friend, useEffect()');
      if (client.id != logData.id)
        addClient(client);
    })
    utilsData.socket.on('removeFriend', function(client: Client) {
      console.log('removeFriend, useEffect()');
      if (client.id != logData.id)
        removeClient(client);
    })
  })

  // function AffUsername(props: {}) {
  //   if (logData.username.length > 0)
  //     return (
  //       <div id="affUsername">
  //         <p>Welcome {logData.username}!</p>
  //       </div>
  //     )
  //   else
  //     return (
  //       <div id="affUsername">
  //         <p>Welcome !</p>
  //       </div>
  //     )
  // }

  return (
      <div className="main_container" id="main_FriendsList">
      <div id="friendsList">
        <div id="listTitle">
          <p>Clients Connected</p>
        </div>
        <p>{clientList.count}</p>
        {clientList.list.map((client, index) => (
          <div id="friendFrame" key={index}>
              <p>{client.username}</p>
          </div>
        ))}
      </div>
  </div>
  );
}

export default FriendsList;