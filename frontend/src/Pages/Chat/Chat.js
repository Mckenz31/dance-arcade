import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { dpMapping } from '../../constants/mapping';
import axios from 'axios';
import { getUserData } from '../../actions/friendsAction';
import { RollbackOutlined } from '@ant-design/icons';

const Chat = ({ handleLogout }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userInfo);
  const userProfileData = useSelector((state) => state.friends.userProfile);
  const didMountRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userProfileData) {
      dispatch(getUserData(user.email));
    }
  }, [dispatch, user.email, userProfileData]);

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    }
    if (!user || user === null) {
      history.push('/');

      return;
    }
    if (userProfileData) {
      axios
        .get('https://api.chatengine.io/users/me/', {
          headers: {
            'project-id': '5dae63d0-0c24-478b-ae55-335f606c291f',
            'user-name': user.email,
            'user-secret': user.uid
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          let formdata = new FormData();
          formdata.append('email', user.email);
          formdata.append('username', user.email);
          formdata.append('secret', user.uid);

          getFile(
            user.photoURL
              ? user.photoURL
              : dpMapping[userProfileData.userAvatar]
          ).then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios
              .post('https://api.chatengine.io/users/', formdata, {
                headers: {
                  'private-key': 'f1813e03-f495-4535-b731-3c6c95e54e11'
                }
              })

              .then(() => setLoading(false))
              .catch((e) => console.log('e', e.response));
          });
        });
    }
  }, [user, history, userProfileData]);

  return (
    <div className="chats-page">
      <div className="nav-bar align-items-center d-flex justify-content-between">
        <Link to="/">
          <RollbackOutlined
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
          />
        </Link>

        <span className="brand">Gyration Board</span>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {/* <Spin spinning={loading}> */}
      {user && (
        <ChatEngine
          height="100vh"
          projectID="272b66f8-dc3e-4dda-b542-b0ace101ec8f"
          userName={user.email}
          userSecret={user.uid}
        />
      )}
      {/* </Spin> */}
    </div>
  );
};

export default Chat;
