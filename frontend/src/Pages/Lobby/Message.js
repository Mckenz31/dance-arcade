import React from 'react';
import './message.css';

const Message = ({ message, userID }) => {
  let isSentByCurrentUser = false;

  const trimmedName = message?.usName?.trim().toLowerCase();

  if (message?.userID === userID) {
    isSentByCurrentUser = true;
  }
  if (message?.common) {
    return (
      <div>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{message?.common}</p>
        </div>
      </div>
    );
  }
  return isSentByCurrentUser ? (
    <div className="messageContainer flex-column items-end">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message?.message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer flex-column items-start">
      <div className="messageBox backgroundLight ">
        <p className="messageText colorDark">{message?.message}</p>
      </div>
      <p className="sentText pl-10 ">{message?.usName}</p>
    </div>
  );
};

export default Message;
