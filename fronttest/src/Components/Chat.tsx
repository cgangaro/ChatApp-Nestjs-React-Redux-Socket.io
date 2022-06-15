import "./CSS/FriendsList.css"
import "./CSS/All.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../State";
import { bindActionCreators } from "redux";
import { Client, msg } from "../State/type";
import AffMsg from "./AffMsg";
import FriendsList from "./FriendsList";

function Chat() {
    
    const logData = useSelector((state: RootState) => state.log)
    const utilsData = useSelector((state: RootState) => state.utils)
    const clientList = useSelector((state: RootState) => state.clientList)

    const dispatch = useDispatch();

    const { addClient, removeClient, addMsg } = bindActionCreators(actionCreators, dispatch);

    utilsData.socket.removeAllListeners();

    utilsData.socket.on('friendsList', function(arrClient: Client[]) {
        console.log('Friends List received, useEffect()');
        for (var i = 0; i < arrClient.length; i++)
        {
          if (arrClient[i].username.length > 0 && arrClient[i].id != logData.id)
          {
            console.log(`add client: ${arrClient[i].username}`)
            let newClient: Client = {
              username: arrClient[i].username,
              id: arrClient[i].id,
              convers: {count: 0, msg: []}
            }
            addClient(newClient);
          }
        }
      })
      utilsData.socket.on('newFriend', function(client: Client) {
        console.log(`new Friend: ${client.username}, useEffect()`);
        if (client.id != logData.id)
        {
          let newClient: Client = {
            username: client.username,
            id: client.id,
            convers: {count: 0, msg: []}
          }
          addClient(newClient);
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
        addMsg(newmsg);
    })
  

  return (
    <>
    <FriendsList/>
    <AffMsg/>
    </>
  );
}

export default Chat;