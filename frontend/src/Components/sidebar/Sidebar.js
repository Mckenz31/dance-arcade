import React, { useState, useEffect } from 'react';
import { dpMapping } from '../../constants/mapping';
import { Drawer, Avatar } from 'antd';
import {
  UserAddOutlined,
  CaretRightOutlined,
  SendOutlined,
  UserOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Collapse, Badge } from 'antd';
import { AccordionContainer } from './sidebarStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetFriendsList,
  searchForFriend,
  sendFriendRequest,
  acceptFriendRequest
} from '../../actions/friendsAction';

const Sidebar = ({ visible, onClose }) => {
  const [showChildrenDrawer, setShowChildrenDrawer] = useState(false);
  const [toggleActive, setToggleActive] = useState(false);
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  const [isRequest, setIsRequest] = useState(true);
  const [friends, setFriends] = useState(false);
  const [searchFriend, setSearchFriend] = useState('');
  const [title, setTitle] = useState('');
  const [foundProfile, setFoundProfile] = useState('');
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const isActive = toggleActive ? 'active' : '';
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const FriendsList = useSelector((state) => state.friends.friendsList);
  const userIdentity = useSelector((state) => state.user.userInfo.email);
  const friendFound = useSelector(
    (state) => state.friends.searchedFriend.requests
  );
  const friendRequests = useSelector(
    (state) => state.friends.friendRequestList.requests
  );
  const onOpenDrawer = (action) => {
    if (action) {
      setTitle('Friend Requests');
    } else {
      setTitle('Search For Friends');
    }
    setIsRequest(action);
    setShowChildrenDrawer(true);
  };
  const onCloseDrawer = () => {
    setShowChildrenDrawer(false);
  };

  useEffect(() => {
    if (visible) {
      if (FriendsList.length === 0) {
        dispatch(GetFriendsList(userIdentity));
      } else {
        for (var i = 0; i < FriendsList.length; i++) {
          if (FriendsList[i].email === userIdentity) {
            setUserProfile(FriendsList[i]);
            FriendsList.splice(i, 1);
            break;
          }
        }
        setFriends(FriendsList, 'friendslist');
      }
    }
  }, [FriendsList, dispatch, userIdentity, visible]);

  const handleToggleSearch = () => {
    setToggleActive(!toggleActive);
    if (searchFriend === '') return;
    else {
      dispatch(searchForFriend(searchFriend, true));
    }
  };
  useEffect(() => {
    if (!isRequest && friendFound.length > 0) {
      console.log(friendFound, 'isRequest');
      let friend = friendFound.find((f) => f.email === searchFriend);
      setAlreadyFriend(friendFound.some((e) => e.email === userIdentity));
      console.log(friend, 'friends');
      if (friend !== null) {
        setFoundProfile(friend);
      }
    }
  }, [friendFound, searchFriend, foundProfile, userIdentity, isRequest]);
  useEffect(() => {
    if (visible) {
      if (isRequest) {
        if (!friendRequests.length) {
          dispatch(searchForFriend(userIdentity, false));
        }
        if (friendRequests.length > 0) {
          for (var i = 0; i < friendRequests.length; i++) {
            if (friendRequests[i].email === userIdentity) {
              friendRequests.splice(i, 1);
              break;
            }
          }
          setFriendRequestList(friendRequests);
        }
      }
    }
  }, [dispatch, userIdentity, isRequest, friendRequests, visible]);

  const handleClickSentFriendRequest = (receiverEmail, receiverDp) => {
    const data = {
      sender: userIdentity,
      senderLink: userProfile.dp,
      receiver: receiverEmail,
      receiverLink: receiverDp
    };
    dispatch(sendFriendRequest(data));
  };
  const handleClickAcceptFriendRequest = (senderEmail, senderDp) => {
    const data = {
      sender: senderEmail,
      senderLink: senderDp,
      receiver: userIdentity,
      receiverLink: userProfile.dp
    };
    dispatch(acceptFriendRequest(data));
  };
  const getDrawerStyle = () => {
    const style = { position: 'absolute' };
    if (visible) {
      style.transform = '100px'; // set to undefined here
    }
    return style;
  };
  return (
    <React.Fragment>
      <Drawer
        title={
          userProfile && (
            <div className="d-flex flex-row justify-content-between overflow-hidden friend user">
              <div className="w-25">
                <Avatar
                  shape="square"
                  src={dpMapping[userProfile.dp]}
                  alt=""
                  size={54}
                />
              </div>
              <div className="w-100 bg-silver d-flex flex-column my-auto mx-2">
                <p className="m-0 text-white">{userProfile.email}</p>
                <p className="m-0 text-white">available</p>
              </div>
            </div>
          )
        }
        placement="right"
        width="300px"
        closable={false}
        onClose={onClose}
        visible={visible}
        style={getDrawerStyle()}
        className="primary-drawer"
        footer={
          <div className="d-flex flex-row justify-content-around align-items-center">
            <Avatar
              className="text-dark friend-fn"
              icon={<UserAddOutlined />}
              onClick={() => onOpenDrawer(false)}
            />
            <Badge count={friendRequestList ? friendRequestList.length : 0}>
              <Avatar
                className="text-dark friend-fn"
                icon={<UserOutlined />}
                onClick={() => onOpenDrawer(true)}
              />
            </Badge>
          </div>
        }
      >
        <AccordionContainer>
          <Collapse
            defaultActiveKey={['1']}
            accordion
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel header="online" key="1">
              {friends &&
                friends.map((friend, index) => (
                  <div
                    key={index}
                    className="d-flex flex-row justify-content-between overflow-hidden friend"
                  >
                    <div className="w-25">
                      <Avatar
                        shape="square"
                        src={dpMapping[friend.dp]}
                        alt=""
                        size={54}
                      />
                    </div>
                    <div className="w-100 d-flex flex-column my-auto mx-2">
                      <p className="m-0 text-white">{friend.email}</p>
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
            </Panel>
            <Panel header="offline" key="2">
              <div className="d-flex flex-row justify-content-between overflow-hidden friend">
                <div className="w-25">
                  <Avatar
                    shape="square"
                    src={dpMapping['ele']}
                    alt=""
                    size={54}
                  />
                </div>
                <div className="w-100 d-flex flex-column my-auto mx-2">
                  <p className="m-0 text-white">abc@abc.com</p>
                  <p className="m-0 text-white">offline</p>
                </div>
                <div className="add-friend d-flex flex-row justify-content-center align-items-center">
                  <SendOutlined className="text-white" width={50} height={50} />
                </div>
              </div>
            </Panel>
          </Collapse>
        </AccordionContainer>

        <Drawer
          title={<p className="text-white m-2">{title}</p>}
          className="secondary-drawer"
          width={380}
          // placement="left"
          closable={false}
          onClose={onCloseDrawer}
          visible={showChildrenDrawer}
        >
          {!isRequest ? (
            <React.Fragment>
              <div className="d-flex mt-2 ms-3 mb-4 align-content-center p-2">
                <div className="icon" onClick={() => handleToggleSearch()}>
                  <span>&#9906;</span>
                </div>
                <input
                  value={searchFriend}
                  onChange={(e) => setSearchFriend(e.target.value)}
                  className={`search ${isActive}`}
                  type="text"
                  placeholder="Search for friends"
                />
              </div>
              <div className="mt-1 d-flex flex-column justify-content-center align-items-center">
                {foundProfile && (
                  <div className="d-flex flex-row justify-content-between overflow-hidden friend sent">
                    <div className="w-25">
                      <Avatar
                        shape="square"
                        src={dpMapping[foundProfile.dp]}
                        alt=""
                        size={54}
                      />
                    </div>
                    <div className="w-100 d-flex flex-column my-auto mx-2">
                      <p className="m-0 text-white">{foundProfile.email}</p>
                      <p className="m-0 text-white">offline</p>
                    </div>
                    <div className="add-friend d-flex flex-row justify-content-center align-items-center">
                      {!alreadyFriend ? (
                        <UserAddOutlined
                          onClick={() =>
                            handleClickSentFriendRequest(
                              foundProfile.email,
                              foundProfile.dp
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
            </React.Fragment>
          ) : (
            <div className="mt-1 d-flex flex-column justify-content-center align-items-center">
              {friendRequestList &&
                friendRequestList.map((user, index) => (
                  <div
                    key={index}
                    className="d-flex flex-row justify-content-between overflow-hidden friend request"
                  >
                    <div className="w-25">
                      <Avatar
                        shape="square"
                        src={dpMapping[user.dp]}
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
            </div>
          )}
        </Drawer>
      </Drawer>
    </React.Fragment>
  );
};
export default Sidebar;
