import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../State";
import { msg } from "../State/type";


function MessageComponent(props: msg) {
    const mess = props;
  return (
      <div id="msg_container">
          <p>{mess.text}</p>
          <p>{mess.sender}</p>
      </div>
  );
}

export default MessageComponent;