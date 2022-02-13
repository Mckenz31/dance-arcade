import React, { useState } from 'react';
import { Avatar, Row, Modal, Button } from 'antd';
import { ProfilePickerContainer } from './ProfileStyles';
import { UserOutlined } from '@ant-design/icons';
import corgi from '../../images/corgi.png';
import Cat from '../../images/cat.png';
import pen from '../../images/pen.png';
import dino from '../../images/dino.png';
import Ele from '../../images/ele.png';
import fox from '../../images/fox.png';
import But from '../../images/but.png';

const ProfilePicker = ({ userAvatar, setUserAvatar, setUserAvatarName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setUserAvatar();
    setIsModalVisible(false);
  };
  const handleClickAvater = (icon, name) => {
    setUserAvatar(icon);
    setUserAvatarName(name);
  };
  const avatar = [
    {
      id: 1,
      name: 'corgi',
      icon: corgi
    },
    {
      id: 2,
      name: 'cat',
      icon: Cat
    },
    {
      id: 3,
      name: 'ele',
      icon: Ele
    },
    {
      id: 4,
      name: 'pen',
      icon: pen
    },
    {
      id: 5,
      name: 'but',
      icon: But
    },
    {
      id: 6,
      name: 'dino',
      icon: dino
    },
    {
      id: 7,
      name: 'fox',
      icon: fox
    }
  ];
  return (
    <ProfilePickerContainer>
      <Avatar
        size={64}
        src={userAvatar}
        icon={!userAvatar && <UserOutlined />}
        className="avatar"
        onClick={showModal}
      />

      <Modal
        title="Select your Avatar"
        style={{ top: 280 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleOk}>
            Set Profile Picture
          </Button>,
          <Button onClick={handleCancel}>Cancel</Button>
        ]}
      >
        <Row>
          {avatar.map(({ id, icon, name }) => (
            <Avatar
              key={id}
              id={id}
              src={icon}
              size={64}
              onClick={() => handleClickAvater(icon, name)}
            />
          ))}
        </Row>
      </Modal>
    </ProfilePickerContainer>
  );
};
export default ProfilePicker;
