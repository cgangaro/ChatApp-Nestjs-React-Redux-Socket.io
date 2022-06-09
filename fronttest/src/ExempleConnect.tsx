import React, { useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

interface msgToSend {
  sender: string;
  recipient: string;
  text: string;
}

const ExempleConnect: React.FC = () => {

  const [id, setId] = useState('');
  const [text, setText] = useState('Wsh la team');
  const [recipient, setRecipient] = useState('');

  socket.removeAllListeners();
  socket.on('connect', function() {
    console.log('Connected');
    socket.emit('msgConnection');
  });
  socket.on('disconnect', function() {
    console.log('Disconnected');
  });
  socket.on('msgToClient', function(data) {
    if (data === 505)
      console.log('msgToServer', 'Msg bien reçu : 505');
    else
      console.log('msgToServer', data);
  });

  socket.on('ID', function(data) {
    console.log('ID received :', data);
    setId(data);
  });

  // socket.on('msgInputToOtherClient', function(msgToSend) {
  //   console.log(msgToSend.sender, 'said: ', msgToSend.text);
  // })

  function validateInput() {
    return id.length > 0 && text.length > 0 && recipient.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
      const message: msgToSend = {
        sender: id,
        recipient: recipient,
        text: text,
      };

      socket.emit('msgToOtherClient', message);
      setText('');
    }
  }

  return (
    <>
      <input
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="Recipient..."
      />
      <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter message..."
          />
      <button type="button" onClick={() => sendMessage()}>
        Send
      </button>

    </>
  );
};

export default ExempleConnect;
