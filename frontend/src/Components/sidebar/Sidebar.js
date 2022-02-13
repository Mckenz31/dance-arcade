import React, { useState, useEffect } from 'react';
import { dpMapping } from '../../constants/mapping';
import { Drawer, Avatar } from 'antd';
import {
  UserAddOutlined,
  CaretRightOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Collapse, Badge } from 'antd';
import { AccordionContainer } from './sidebarStyles';
import { useDispatch, useSelector } from 'react-redux';
import { searchForFriend, getUserData } from '../../actions/friendsAction';
import FriendRequest from '../friend/FriendRequest';
import FriendsList from '../friend/FriendsList';
import RequestList from '../friend/RequestList';

const Sidebar = ({ visible, onClose }) => {
  const [showChildrenDrawer, setShowChildrenDrawer] = useState(false);
  const [isRequest, setIsRequest] = useState(true);
  const [title, setTitle] = useState('');
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.friends.userProfile);
  const userIdentity = useSelector((state) => state.user.userInfo.email);

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

  /* to get user profile details */
  useEffect(() => {
    if (!userProfileData) {
      dispatch(getUserData(userIdentity));
    } else {
      setUserProfile(userProfileData);
    }
  }, [dispatch, userIdentity, userProfileData]);

  useEffect(() => {
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
  }, [dispatch, userIdentity, isRequest, friendRequests, visible]);

  const getDrawerStyle = () => {
    const style = { position: 'absolute' };
    if (visible) {
      style.transform = '100px';
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
                  src={dpMapping[userProfile.userAvatar]}
                  alt=""
                  size={54}
                />
              </div>
              <div className="w-100 bg-silver d-flex flex-column my-auto mx-2">
                <p className="m-0 text-white">{userProfile.usName}</p>
                <p className="m-0 text-white">online</p>
              </div>
            </div>
          )
        }
        placement="right"
        width="350px"
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
              onClick={() => onOpenDrawer(false)} // search for friends
            />
            <Badge count={friendRequestList ? friendRequestList.length : 0}>
              <Avatar
                className="text-dark friend-fn"
                icon={<UserOutlined />}
                onClick={() => onOpenDrawer(true)} // see request you got
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
              <FriendsList />
            </Panel>
          </Collapse>
        </AccordionContainer>

        <Drawer
          title={<p className="text-white m-2">{title}</p>}
          className="secondary-drawer"
          width={380}
          closable={false}
          onClose={onCloseDrawer}
          visible={showChildrenDrawer}
        >
          {!isRequest ? (
            <FriendRequest userProfile={userProfile} />
          ) : (
            <div className="mt-1 d-flex flex-column justify-content-center align-items-center px-2">
              <RequestList
                userProfile={userProfile}
                friendRequestList={friendRequestList}
              />
            </div>
          )}
        </Drawer>
      </Drawer>
    </React.Fragment>
  );
};
export default Sidebar;
