import React from 'react'
// import Timer from '../../Components/Timer/Timer'
import axios from 'axios'

const dataSent = {
  sender: "random1@gmail.com",
  senderLink: "xyz",
  receiver: "random2@gmail.com",
  receiverLink: "zyx",
};

const URL1 = process.env.REACT_APP_FRIEND_REQUEST;
const URL2 = process.env.REACT_APP_REQUEST_ACCEPTED;

const Test = ({app}) => {

  const friendReq = async() => {
    console.log(URL1);
    const response = await axios.post(URL1, dataSent);
    console.log(response);
  }

  const acceptReq = async() => {
    const response = await axios.post(URL2, dataSent);
    console.log("Accept"+response);
  }
  
    return (
      <React.Fragment>
        <button onClick= {friendReq}>Hello</button> ||
        <button onClick= {acceptReq}>Accept</button>
      </React.Fragment>
    )
}

export default Test

