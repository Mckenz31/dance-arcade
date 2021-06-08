import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

import axios from 'axios';

const Chat = ({ handleLogout }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userInfo);
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], 'userPhoto.jpeg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (user) {
      console.log(user.email, user.uid, 'user.email');
      axios
        .get('https://api.chatengine.io/users/me', {
          headers: {
            'project-id': '5dae63d0-0c24-478b-ae55-335f606c291f',
            'user-name': user.email,
            'user-secret': user.uid
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          var formdata = new FormData();
          formdata.append('email', user.email);
          formdata.append('username', user.email);
          formdata.append('secret', user.uid);
          getFile(
            'https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png'
          ).then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);
            axios
              .post('https://api.chatengine.io/users/', formdata, {
                headers: {
                  'private-key': '6590241e-1256-44c8-9555-a8d7a13dfe0a'
                }
              })
              .then(() => {
                setLoading(false);
              })
              .catch((error) => {
                console.log(error, 'error message');
              });
          });
        });
    }
  }, [user, history]);
  // if (!user || loading) return <Spin />;
  return (
    <div className="chats-page">
      <div className="nav-bar align-items-center d-flex justify-content-between">
        <span className="brand">Dance Dance Arcade</span>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Spin spinning={loading}>
        <ChatEngine
          height="calc(100vh - 66px)"
          projectID="5dae63d0-0c24-478b-ae55-335f606c291f"
          userName={user.email}
          userSecret={user.uid}
        />
      </Spin>
    </div>
  );
};

export default Chat;
