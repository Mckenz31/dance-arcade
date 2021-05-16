import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {Avatar, Image} from 'antd'
import {ProfilePickerContainer} from './ProfileStyles'
import { UserOutlined } from '@ant-design/icons';
import Corgi from '../../images/corgi.png';
import Cat from '../../images/cat.png';
import Pen from '../../images/pen.png';
import Dino from '../../images/dino.png';
import Ele from '../../images/ele.png';
import Fox from '../../images/fox.png';
import But from '../../images/but.png';

const ProfilePicker = () => {
    const [userAvatar,setUserAvatar] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setUserAvatar()
    setIsModalVisible(false);
  };
  const handleClickAvater=(icon)=>{
    setUserAvatar(icon)
  }
  console.log(userAvatar)
  const avatar = [
      {
          id:1,
          icon : Corgi
      },
      {
          id:2,
          icon : Cat
      },
      {
          id:3,
          icon : Ele
      },
      {
          id:4,
          icon : Pen
      },
      {
          id:5,
          icon : But
      },
      {
          id:6,
          icon : Dino
      },
      {
          id:7,
          icon : Fox
      },
  ]
  return (
    <ProfilePickerContainer>
      
        <Avatar  size={64} src={userAvatar} icon={!userAvatar && <UserOutlined />} className="avatar" onClick={showModal} />
      
      <Modal title="Select your Avatar" style={{ top: 280 }} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    
        {avatar.map(({id,icon})=>(
            <Avatar
            id={id}
            src={icon}
            size={64}
            onClick={()=>handleClickAvater(icon)}
            />
        ))}
        
      </Modal>
    </ProfilePickerContainer>
  );
};
export default ProfilePicker
