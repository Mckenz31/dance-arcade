import { CheckCircleOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptFriendRequest,
  searchForFriend
} from '../../actions/friendsAction';
import { dpMapping } from '../../constants/mapping';

const RequestList = ({ userProfile, friendRequestList }) => {
  const dispatch = useDispatch();
  const userIdentity = useSelector((state) => state.user.userInfo.email);

  const handleClickAcceptFriendRequest = (senderEmail, senderDp) => {
    const data = {
      sender: senderEmail,
      senderLink: senderDp,
      receiver: userIdentity,
      receiverLink: userProfile.userAvatar
    };
    dispatch(acceptFriendRequest(data));
  };
  return (
    <>
      {' '}
      {friendRequestList &&
        friendRequestList.map((user, index) => (
          <div
            key={index}
            className="d-flex flex-row justify-content-between overflow-hidden friend request"
          >
            <div className="w-25">
              <Avatar
                shape="square"
                src={dpMapping['panda']}
                alt=""
                size={54}
              />
            </div>
            <div className="w-100 d-flex flex-column my-auto mx-2">
              <p className="m-0 text-white">{user.email}</p>
              <p className="m-0 text-white">offline</p>
            </div>
            <div className="add-friend d-flex flex-row justify-content-center align-items-center">
              <CheckCircleOutlined
                onClick={() =>
                  handleClickAcceptFriendRequest(user.email, user.dp)
                }
                className="text-white icons"
                width={50}
                height={50}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default RequestList;
