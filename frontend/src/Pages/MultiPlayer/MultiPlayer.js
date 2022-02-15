import React, { useState, useEffect } from 'react';
import dance from '../../images/bg.png';
import './multiplayer.css';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, roomListener, joinRoom } from '../../actions/multiplayer';
import { getUserData } from '../../actions/friendsAction';
import Navbar from '../../Components/Navbar/Navbar';
import { setSpinner } from '../../actions/actions';
import { useHistory } from 'react-router-dom';
import { getQueryParams } from '../../utility';

const MultiPlayer = (props) => {
  const [roomId, setRoomId] = useState('');
  const userIdentity = useSelector((state) => state.user.userInfo.email);
  const userProfileData = useSelector((state) => state.friends.userProfile);
  const roomDetails = useSelector((state) => state.multiplayer.room);
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userProfileData) {
      dispatch(getUserData(userIdentity));
    } else {
      setUserProfile(userProfileData);
    }
  }, [dispatch, userIdentity, userProfileData]);

  const handleCreateClick = () => {
    if (roomId !== '') {
      const data = {
        ...userProfile,
        roomId: roomId
      };
      dispatch(createRoom(data));
      dispatch(roomListener(data));
      dispatch(setSpinner(true, 'Waiting for Players to join . . . .'));
      history.push({
        search: `?user=${userProfile.usName}&room=${roomId}`
      });
    }
  };

  useEffect(() => {
    if (props.location.search) {
      const params = getQueryParams(props.location.search);
      const data = {
        ...userProfile,
        roomId: params.room
      };
      dispatch(roomListener(data));
      dispatch(
        setSpinner(
          true,
          <h4 className="text-white">'Waiting for Players to join . . . .'</h4>
        )
      );
    }
  }, [props.location.search]);

  useEffect(() => {
    if (roomDetails) {
      console.log(roomDetails, 'room');
      if (roomDetails.creator.userID === userProfile.userID) {
        // creator
        if (roomDetails?.joiner) {
          dispatch(
            setSpinner(
              true,
              <div>
                <h4 className="text-white">
                  {roomDetails?.joiner.usName} joined the room
                </h4>
              </div>
            )
          );
          history.push({
            pathname: '/lobby',
            search: `?user=${userProfile.usName}&room=${roomId}`
          });
          dispatch(setSpinner(false, ''));
        }
      } else {
        // joiner
        if (roomDetails?.creator) {
          dispatch(
            setSpinner(
              true,
              <h4 className="text-white">
                Joined in {roomDetails.creator.usName}'s room
              </h4>
            )
          );
          history.push({
            pathname: '/lobby',
            search: `?user=${userProfile.usName}&room=${roomId}`
          });
          dispatch(setSpinner(false, ''));
        }
      }
    }
  }, [roomDetails]);

  const handleJoinClick = () => {
    if (roomId !== '') {
      const data = {
        ...userProfile,
        roomId: roomId
      };
      console.log(data);
      dispatch(joinRoom(data));
      history.push({
        search: `?user=${userProfile.usName}&room=${roomId}`
      });
    }
  };
  return (
    <div className="w-100 min-vh-100 position-relative">
      <img
        src={dance}
        style={{ zIndex: '-1' }}
        className="position-absolute top-0 left-0 right-0 bottom-0 w-100 h-100"
        alt=""
      />
      <Navbar isMultiplayer />
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div className="create-room">
          <div className="d-flex w-100 flex-column">
            <h1 className=" room-text">Multiplayer Mode</h1>

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
        </div>
      </div>
    </div>
  );
};

export default MultiPlayer;
