import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

const Helper = ({ handleLogout }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [currentMsg, setCurrentMsg] = useState('');
  const [recievedMsg, setRecievedMsg] = useState({});

  const handleClick = () => {
    if (name !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setRecievedMsg(data);
    });
  }, [socket]);

  const sendMessage = async (value) => {
    setCurrentMsg(value);
    const messageData = {
      author: name,
      room: room,
      message: value,
      time:
        new Date(Date.now()).getHours() +
        ' : ' +
        new Date(Date.now()).getMinutes()
    };
    await socket.emit('send_message', messageData);
  };
  return (
    <>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center">
        <h1 className="mt-4">Join a Chat</h1>
        <div className="d-flex flex-row ">
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter room id"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleClick}>Join</button>
        </div>
        <h5 className="mt-4">Live Chat</h5>
        <div className="d-flex flex-row">
          <input
            type="text"
            placeholder="hey.."
            value={currentMsg}
            onChange={(e) => sendMessage(e.target.value)}
          />
          {/* <button onClick={sendMessage}>send</button> */}
        </div>
        <div className="mt-4">
          <p>{recievedMsg?.message && recievedMsg?.message}</p>
        </div>
      </div>
    </>
  );
};

export default Helper;
