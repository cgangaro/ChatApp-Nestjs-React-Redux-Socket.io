import * as React from "react";
import "./CSS/FriendsList.css"
import "./CSS/All.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../State";
import { bindActionCreators } from "redux";
import { io } from "socket.io-client";
import { validateInput } from "../Utils/logUtils";

interface Client {
  id: string;
  username: string;
}

let friendsClient: Client[] = [];

function FriendsList() {

  const logData = useSelector((state: RootState) => state.log)
  const utilsData = useSelector((state: RootState) => state.utils)
  const dispatch = useDispatch();

  const [friendsList, setFriendsList] = React.useState();

  React.useEffect(() => {
    utilsData.socket.emit('friendsListRequest');
    utilsData.socket.on('friendsList', function(arrClient: Client[]) {
      console.log('Friends List received');
      friendsClient = arrClient;
    })
  })

  

  function AffUsername(props: {}) {
    if (logData.username.length > 0)
      return (
        <div id="affUsername">
          <p>Welcome {logData.username}!</p>
        </div>
      )
    else
      return (
        <div id="affUsername">
          <p>Welcome !</p>
        </div>
      )
  }

  return (
    <div className="main_container" id="main_FriendsList">
        <AffUsername />
    </div>
  );
}

export default FriendsList;