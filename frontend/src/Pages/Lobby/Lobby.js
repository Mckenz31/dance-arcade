import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../actions/friendsAction';
import {
  roomListener,
  sendLobbyMessage,
  setReady
} from '../../actions/multiplayer';
import dance from '../../images/lobby.jpg';
import { getQueryParams } from '../../utility';
import './lobby.css';
import Message from './Message';
import { useHistory } from 'react-router-dom';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import { setSpinner } from '../../actions/actions';

const Lobby = (props) => {
  const history = useHistory();
  const roomDetails = useSelector((state) => state.multiplayer.room);
  const userIdentity = useSelector((state) => state.user.userInfo.email);
  const userProfileData = useSelector((state) => state.friends.userProfile);
  const chatMessages =
    useSelector((state) => state.multiplayer.chatMessages) || [];
  const [userProfile, setUserProfile] = useState({});
  const messageEl = useRef(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentmessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userProfileData) {
      dispatch(getUserData(userIdentity));
    } else {
      setUserProfile(userProfileData);
    }
  }, [dispatch, userIdentity, userProfileData]);

  useEffect(() => {
    if (props.location.search) {
      const params = getQueryParams(props.location.search);
      const data = {
        ...userProfile,
        roomId: params.room
      };
      dispatch(roomListener(data));
      setMessages(chatMessages);
    }
  }, []);

  const sendMessage = () => {
    if (currentMessage === '') return;
    const params = getQueryParams(props.location.search);
    const data = {
      usName: userProfile.usName,
      userID: userProfile.userID,
      message: currentMessage
    };
    const prevmsg = [...chatMessages, data];
    dispatch(sendLobbyMessage(prevmsg, params.room));
    setCurrentmessage('');
  };

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const handleClickReady = () => {
    const params = getQueryParams(props.location.search);
    if (roomDetails?.ready) {
      history.push({
        pathname: '/single-player',
        search: `?user=${userProfile.usName}&room=${params.room}`
      });
      const user = [...roomDetails?.ready, userProfile.userID];
      dispatch(setReady(user, params.room));
      dispatch(setSpinner(false, ''));
    } else {
      const user = [userProfile.userID];
      dispatch(setReady(user, params.room));
    }
  };
  // console.log(roomDetails.ready.length > 1 ? 'wprking' : 'not nwoking');
  useEffect(() => {
    if (roomDetails) {
      if (roomDetails?.ready?.length > 1) {
        const params = getQueryParams(props.location.search);
        console.log(roomDetails, 'roomDetails');
        history.push({
          pathname: '/single-player',
          search: `?user=${userProfile.usName}&room=${params.room}`
        });
        dispatch(setSpinner(false, ''));
      }
    }
  }, [roomDetails]);

  return (
    <div className="w-100 min-vh-100 position-relative">
      <img
        src={dance}
        style={{ zIndex: '-1' }}
        className="position-absolute top-0 left-0 right-0 bottom-0 w-100 h-100"
        alt=""
      />
      <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="col-md-9 p-0 min-vh-100  h-md-100">
          <div className="text-black d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
            <div className="logoarea pt-5 pb-5">
              <h1 className="text-white room-text">Welcome To Lobby</h1>
              <button className="ready btn-hover" onClick={handleClickReady}>
                Ready
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 min-vh-100 p-0 h-md-100 loginarea">
          <div className="d-md-flex flex-column align-items-start chatarea p-3 justify-content-center">
            <h1 className=" room-text">Live Chat</h1>
            <div className="messages" ref={messageEl}>
              {userProfile?.usName &&
                chatMessages.length > 0 &&
                chatMessages.map((message, i) => (
                  <div key={i}>
                    <Message message={message} userID={userProfile.userID} />
                  </div>
                ))}
            </div>
          </div>
          <div className="d-flex mt-2 mb-4 align-content-center rounded-xl px-3 border">
            <input
              value={currentMessage}
              onChange={(e) => setCurrentmessage(e.target.value)}
              className={`search-friends`}
              type="text"
              placeholder="Search for friends"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <div
              onClick={sendMessage}
              className="px-1 d-flex justify-content-around pointer align-items-center"
            >
              <SendOutlined style={{ color: 'white', fontSize: 20 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
