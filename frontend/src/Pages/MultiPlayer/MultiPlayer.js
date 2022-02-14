import React, { useState, useEffect } from 'react';
import dance from '../../images/bg.png';
import io from 'socket.io-client';
import './multiplayer.css';
import { Spin } from 'antd';
import Loader from '../../Components/Loader/Loader';

const socket = io.connect('http://localhost:8000');

const MultiPlayer = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [currentMsg, setCurrentMsg] = useState('');
  const [recievedMsg, setRecievedMsg] = useState({});
  const [roomSize, setRoomSize] = useState(0);

  const handleCreateClick = () => {
    if (userName !== '' && roomId !== '') {
      socket.emit('join_room', roomId);
    }
  };
  const handleJoinClick = () => {
    if (userName !== '' && roomId !== '') {
      socket.emit('join_room', roomId);
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setRecievedMsg(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('room_size', (data) => {
      setRoomSize(data);
    });
  }, [socket]);

  // useEffect(() => { example to get listen backend data
  //   socket.on('count', (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  let clientsInRoom = 0;
  console.log('len', io.sockets);
  clientsInRoom = io.sockets?.adapter.rooms.get(roomId).size;
  console.log(clientsInRoom, 'length');

  const sendMessage = async (value) => {
    setCurrentMsg(value);
    const messageData = {
      author: userName,
      room: roomId,
      message: value,
      time:
        new Date(Date.now()).getHours() +
        ' : ' +
        new Date(Date.now()).getMinutes()
    };
    await socket.emit('send_message', messageData);
  };
  return (
    <div className="w-100 min-vh-100 position-relative">
      <img
        src={dance}
        style={{ zIndex: '-1' }}
        className="position-absolute top-0 left-0 right-0 bottom-0 w-100 h-100"
        alt=""
      />

      <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="create-room">
          <div className="d-flex w-100 flex-column">
            <h1 className=" room-text">Multiplayer Mode</h1>
            <input
              type="text"
              placeholder="username"
              className="room-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="room id"
              className="room-input"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <div className="d-flex flex-row w-100 justify-content-between room-btn-container">
            <button className="w-100 mr-4 room-btn" onClick={handleCreateClick}>
              Create Room
            </button>
            <button className="w-100 ms-4 room-btn" onClick={handleJoinClick}>
              Join Room
            </button>
          </div>
          <div className="sent mt-4">
            <input
              type="text"
              value={currentMsg}
              onChange={(e) => sendMessage(e.target.value)}
            />
          </div>
          <p>{recievedMsg?.message && recievedMsg.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MultiPlayer;
