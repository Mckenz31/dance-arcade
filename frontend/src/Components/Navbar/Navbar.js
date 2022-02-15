import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import { NavbarContainer } from './NavStyles';
import { dpMapping } from '../../constants/mapping';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../actions/friendsAction';

const Navbar = ({ handleLogout, toggleAbout, isMultiplayer }) => {
  const dispatch = useDispatch();
  const userIdentity = useSelector((state) => state.user.userInfo.email);
  const userProfileData = useSelector((state) => state.friends.userProfile);
  const [userProfile, setUserProfile] = useState({});
  /* to get user profile details */
  useEffect(() => {
    if (!userProfileData) {
      dispatch(getUserData(userIdentity));
    } else {
      setUserProfile(userProfileData);
    }
  }, [dispatch, userIdentity, userProfileData]);
  
  return (
    <NavbarContainer>
      <div className="container">
        <nav>
          <span className="brand">GYRATION BOARD</span>
          <div className="d-flex flex-column ">
            <ul className="ms-auto d-flex flex-row align-items-center">
              <span>
                <Avatar
                  shape="round"
                  src={dpMapping[userProfile.userAvatar]}
                  alt=""
                  size={30}
                />
              </span>
              <li>
                <span className="m-0 mx-2" href="#">
                  {userProfile.usName}
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <span href="#">Home</span>
              </li>
              {!isMultiplayer && (
                <>
                  <li>
                    <span href="#">Settings</span>
                  </li>
                  <li>
                    <span href="#" onClick={toggleAbout}>
                      About
                    </span>
                  </li>
                  <li>
                    <span href="#" onClick={handleLogout}>
                      logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
