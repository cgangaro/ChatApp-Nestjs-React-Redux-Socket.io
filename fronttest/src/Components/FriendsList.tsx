import "./CSS/FriendsList.css"
import "./CSS/All.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../State";
import { bindActionCreators } from "redux";
import { Client } from "../State/type";

function FriendsList() {

  const clientList = useSelector((state: RootState) => state.clientList)
  const log = useSelector((state: RootState) => state.log)

  const dispatch = useDispatch();

  const { setActivConvers } = bindActionCreators(actionCreators, dispatch);

  function DisplayClientFrame(props: {index: number, client: Client}) {
    if (clientList.active == props.client.username)
    {
      return (
        <div id="friendFrameActiv">
          <div id="bubble_blue"></div>
          <div id="nameFrame">
            <p>{props.client.username}</p>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div id="friendFrame" onClick={() => setActivConvers(props.client.username)}>
          <div id="bubble_blue"></div>
          <div id="nameFrame">
            <p>{props.client.username}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
    <div className="main_container" id="main_FriendsList">
      <div id="friendsList">
        <div id="listTitle">
          <p>Clients Connected</p>
        </div>
          {clientList.list.map((client, index) => (
            <div id="friendFrameMain" key={index}>
              <DisplayClientFrame index={index} client={client}/>
            </div>
          ))}
      </div>
    </div>
    </>
  );
}

export default FriendsList;