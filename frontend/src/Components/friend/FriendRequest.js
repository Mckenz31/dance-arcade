import {
  CheckCircleOutlined,
  SearchOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriend, sendFriendRequest } from '../../actions/friendsAction';
import { dpMapping } from '../../constants/mapping';
import { actionTypes } from '../../constants/actionTypes';

const { SET_TOAST } = actionTypes;

const FriendRequest = ({ userProfile }) => {
  const [searchFriend, setSearchFriend] = useState('');
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  const searchedFriend = useSelector((state) => state.friends.searchForFriend);
  const friendsList = useSelector((state) => state.friends.friendsList);
  const dispatch = useDispatch();
  const userIdentity = useSelector((state) => state.user.userInfo.email);

  const handleClickSentFriendRequest = (receiverEmail, receiverDp) => {
    const data = {
      sender: userIdentity,
      senderLink: userProfile.userAvatar,
      receiver: receiverEmail,
      receiverLink: receiverDp
    };
    dispatch(sendFriendRequest(data));
  };

  const handleSearch = () => {
    if (friendsList.some((item) => item.email === searchFriend)) {
      return dispatch({
        type: SET_TOAST,
        payload: {
          message: `${searchFriend} is already your friend`,
          showToast: true
        }
      });
    }
    if (searchFriend === '') return;
    else {
      dispatch(getFriend(searchFriend));
      setSearchFriend('');
    }
  };

  useEffect(() => {
    if (searchedFriend) {
      setAlreadyFriend(friendsList.some((item) => item.email === userIdentity));
    }
  }, [friendsList, searchedFriend, userIdentity]);

  return (
    <div className="d-flex flex-column justify-content-center px-4 py-3">
      <div className="d-flex mt-2 mb-4 align-content-center rounded-xl px-3 border">
        <input
          value={searchFriend}
          onChange={(e) => setSearchFriend(e.target.value)}
          className={`search-friends`}
          type="text"
          placeholder="Search for friends"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div
          onClick={handleSearch}
          className="px-1 d-flex justify-content-around pointer align-items-center"
        >
          <SearchOutlined />
        </div>
      </div>
      <div className="mt-1 d-flex flex-column justify-content-center align-items-center">
        {searchedFriend && (
          <div className="d-flex flex-row justify-content-between overflow-hidden friend sent">
            <div className="w-25">
              <Avatar
                shape="square"
                src={dpMapping[searchedFriend.dp]}
                alt=""
                size={54}
              />
            </div>
            <div className="w-100 d-flex flex-column my-auto mx-2">
              <p className="m-0 text-white">{searchedFriend.email}</p>
              <p className="m-0 text-white">offline</p>
            </div>
            <div className="add-friend d-flex flex-row justify-content-center align-items-center">
              {!alreadyFriend ? (
                <UserAddOutlined
                  onClick={() =>
                    handleClickSentFriendRequest(
                      searchedFriend.email,
                      searchedFriend.dp
                    )
                  }
                  className="text-white icons"
                  width={50}
                  height={50}
                />
              ) : (
                <CheckCircleOutlined
                  className="text-white"
                  width={50}
                  height={50}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
