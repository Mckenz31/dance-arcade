import { SendOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetFriendsList } from '../../actions/friendsAction';
import { dpMapping } from '../../constants/mapping';

const FriendsList = () => {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const userIdentity = useSelector((state) => state.user.userInfo.email);
  const friendsList = useSelector((state) => state.friends.friendsList);
  /* to get user friends list */
  useEffect(() => {
    if (!friendsList) {
      dispatch(GetFriendsList(userIdentity));
    } else {
      for (var i = 0; i < friendsList.length; i++) {
        if (friendsList[i].email === userIdentity) {
          friendsList.splice(i, 1);
          break;
        }
      }
      setFriends(friendsList);
    }
  }, [friendsList, dispatch, userIdentity]);

  return (
    <>
      {' '}
      {friends.length > 0 ? (
        <>
          {' '}
          {friends.map(({ id, dp, email }, index) => (
            <div
              key={index}
              className="d-flex flex-row justify-content-between overflow-hidden friend"
            >
              <div className="w-25">
                <Avatar shape="square" src={dpMapping[dp]} alt="" size={54} />
              </div>
              <div className="w-100 d-flex flex-column my-auto mx-2">
                <p className="m-0 text-white">{email}</p>
                <p className="m-0 text-white">online</p>
              </div>
              <div className="add-friend d-flex flex-row justify-content-center align-items-center">
                <SendOutlined
                  className="text-white icons"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h5>No Friends Found</h5>
        </>
      )}
    </>
  );
};

export default FriendsList;
