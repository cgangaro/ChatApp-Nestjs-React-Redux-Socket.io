import * as React from "react";
import "./CSS/FriendsList.css"
import "./CSS/All.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../State";
import { bindActionCreators } from "redux";
import { io } from "socket.io-client";
import { validateInput } from "../Utils/logUtils";

function FriendsList() {

  const logData = useSelector((state: RootState) => state.log)
  const utilsData = useSelector((state: RootState) => state.utils)
  const dispatch = useDispatch();

  const { msgAdd, setUsername } = bindActionCreators(actionCreators, dispatch);

  const [name, setName] = React.useState('');

  function sendUsername() {
      if (validateInput(name))
      {
        setUsername(name);
        utilsData.socket.emit('setUsername', name);
      }
      setName("");
  }

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
        <div id="setUsernameDiv">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter message..."
          />
        <button type="button" onClick={() => sendUsername()}>Set username</button>
        </div>
        {/* <h1>FriendsList</h1> */}
    </div>
  );
}

export default FriendsList;