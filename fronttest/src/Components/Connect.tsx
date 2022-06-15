import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, RootState } from '../State';
import { msg } from "../State/type";

function connect() {
    const msgList = useSelector((state: RootState) => state.msg)
    const logData = useSelector((state: RootState) => state.log)
    const utilsData = useSelector((state: RootState) => state.utils)
    const dispatch = useDispatch();

    const { msgAdd, setUsername } = bindActionCreators(actionCreators, dispatch);

    const [id, setId] = useState('');

    utilsData.socket.removeAllListeners();

    utilsData.socket.on('connect', function() {
        console.log('Connected');
        utilsData.socket.emit('msgConnection');
    });

    utilsData.socket.on('disconnect', function() {
        console.log('Disconnected');
    });
    
    utilsData.socket.on('msgToClient', function(data: any) {
        if (data === 505)
        console.log('msgToServer', 'Msg bien reçu : 505');
        else
        console.log('msgToServer', data);
    });

    utilsData.socket.on('ID', function(data: any) {
        console.log('ID received :', data);
        setId(data);
    });

    // utilsData.socket.on('msgInputToOtherClient', function(msgToSend: any) {
    //     console.log(msgToSend.sender, 'said: ', msgToSend.text);
    //     let newmsg: msg = {
    //         sender: msgToSend.sender,
    //         text: msgToSend.text
    //     }
    //     msgAdd(newmsg);
    // })
  
}

export default connect;