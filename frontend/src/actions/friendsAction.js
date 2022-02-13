import { actionTypes } from '../constants/actionTypes';
import { db } from '../Components/Firebase/firebase';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';

const {
  SET_FRIENDS,
  FRIENDS_LIST,
  SET_SENT_FRIEND_REQUEST,
  SET_TOAST,
  SET_SEARCH_FRIEND,
  SET_FRIEND_REQUEST_LIST,
  FRIEND_REQUEST,
  User_Details,
  SET_USER_PROFILE_DATA
} = actionTypes;

export const GetFriendsList = (collection) => async (dispatch) => {
  try {
    db.collection(collection)
      .doc(FRIENDS_LIST)
      .onSnapshot((snap) => {
        dispatch({ type: SET_FRIENDS, payload: snap.data().requests });
      });
  } catch (e) {}
};
export const getUserData = (collection) => async (dispatch) => {
  try {
    db.collection(collection)
      .doc(User_Details)
      .onSnapshot((snap) => {
        dispatch({
          type: SET_USER_PROFILE_DATA,
          payload: snap.data()
        });
      });
  } catch (e) {}
};
export const searchForFriend = (collection, action) => async (dispatch) => {
  db.collection(collection)
    .doc(FRIEND_REQUEST)
    .onSnapshot((snap) => {
      if (snap.data()) {
        if (action) {
          dispatch({ type: SET_SEARCH_FRIEND, payload: snap.data() });
        } else {
          dispatch({ type: SET_FRIEND_REQUEST_LIST, payload: snap.data() });
        }
      } else {
        dispatch({
          type: SET_TOAST,
          payload: {
            message: 'No User Found with this Email id',
            showToast: true
          }
        });
      }
    });
};
export const getFriend = (email) => async (dispatch) => {
  db.collection(email)
    .doc(User_Details)
    .onSnapshot((snap) => {
      if (snap.data()) {
        const data = {
          email: email,
          dp: snap.data().userAvatar,
          usName: snap.data().usName,
          userID: snap.data().userID
        };
        dispatch({ type: SET_SEARCH_FRIEND, payload: data });
      } else {
        dispatch({
          type: SET_TOAST,
          payload: {
            message: 'No User Found with this Email id',
            showToast: true
          }
        });
      }
    });
};
export const showFriendRequests = (collection) => async (dispatch) => {
  db.collection(collection)
    .doc(FRIEND_REQUEST)
    .onSnapshot((snap) => {
      if (snap.data()) {
        dispatch({ type: SET_SEARCH_FRIEND, payload: snap.data() });
      } else {
        dispatch({
          type: SET_TOAST,
          payload: {
            message: 'No User Found with this Email id',
            showToast: true
          }
        });
      }
    });
};
export const sendFriendRequest = (data) => async (dispatch) => {
  const URL = process.env.REACT_APP_FRIEND_REQUEST;
  axios
    .post(URL, data)
    .then((response) => {
      dispatch({ type: SET_SENT_FRIEND_REQUEST, payload: response });
    })
    .catch((error) => {
      dispatch({
        type: SET_TOAST,
        payload: {
          message: error.message,
          showToast: true
        }
      });
    });
};
export const acceptFriendRequest = (data) => async (dispatch) => {
  const URL = process.env.REACT_APP_REQUEST_ACCEPTED;
  axios
    .post(URL, data)
    .then((response) => {
      dispatch({ type: SET_SENT_FRIEND_REQUEST, payload: response });
    })
    .catch((error) => {
      dispatch({
        type: SET_TOAST,
        payload: {
          message: error.message,
          showToast: true
        }
      });
    });
};
