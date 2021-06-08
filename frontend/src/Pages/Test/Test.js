import React from 'react'
// import Timer from '../../Components/Timer/Timer'
import axios from 'axios'
import {db} from '../../Components/Firebase/firebase';
import firebase from "firebase";

const senddata = {
  sender: "random1@gmail.com",
  senderLink: "xyz",
};
const accdata = {
  sender: "random1@gmail.com",
  senderLink: "xyz",
  receiver: "random2@gmail.com",
  receiverLink: "zyx",
};

const URL1 = process.env.REACT_APP_FRIEND_REQUEST;
const URL2 = process.env.REACT_APP_REQUEST_ACCEPTED;

const Test = ({app}) => {

  const friendReq = async() => {
    const response = await axios.post(URL1, senddata);
    console.log(response)
  }

  const onCreate = async() => {
    db.collection("work@gmail.com").doc("Game Request").set({
      requests: firebase.firestore.FieldValue.arrayUnion({
        email: "work@gmail.com",
        dp: "skd",
      }),
    });
    db.collection("work@gmail.com").doc("Game Accept").set({
      requests: firebase.firestore.FieldValue.arrayUnion({
        email: "work@gmail.com",
        dp: "skd",
      }),
    });
  }

  const acceptReq = async() => {
    const response = await axios.post(URL2, accdata);
    console.log(response)
  }

  const gameReq = async() => {
    db.collection("check@gmail.com").doc("Game Request").update({
      requests: firebase.firestore.FieldValue.arrayUnion({
        email: "work@gmail.com",
        dp: "blah",
      }),
    });
  }

  const gameAccept = async() => {
    db.collection("check@gmail.com").doc("Game Accept").update({
      requests: firebase.firestore.FieldValue.arrayUnion({
        email: "work@gmail.com",
        dp: "blah",
      }),
    });
    db.collection("work@gmail.com").doc("Game Accept").update({
      requests: firebase.firestore.FieldValue.arrayUnion({
        email: "check@gmail.com",
        dp: "blah",
      }),
    });
    db.collection("check@gmail.com").doc("Game Request").update({
      requests: firebase.firestore.FieldValue.arrayRemove({
        email: "work@gmail.com",
        dp: "blah",
      }),
    });
  }
  
    return (
      <React.Fragment>
        <button onClick= {friendReq}>Hello</button> ||
        <button onClick= {acceptReq}>Accept</button> ||
        <button onClick= {onCreate}>OnCreate</button> ||
        <button onClick= {gameReq}>Req</button> ||
        <button onClick= {gameAccept}>Accept</button>  
      </React.Fragment>
    )
}

export default Test

