import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { Spin } from 'antd';

import axios from 'axios';

const Chat = ({ user }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  //   const user = useSelector((state) => state.user.userInfo);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpeg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    // if (!user) {
    //   history.push("/auth")
    //   return
    // }
    if (user) {
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
          getFile(user.photoURL).then((avatar) => {
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
  if (!user || loading) return <Spin className="m-auto" />;
  return (
    <div className="chats-page">
      <div className="nav-bar align-items-center d-flex justify-content-between">
        <div className="logo">DANCE DANCE ARCADE</div>
        <div className="logout">Logout</div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="5dae63d0-0c24-478b-ae55-335f606c291f"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chat;
