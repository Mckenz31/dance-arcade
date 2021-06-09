import { actionTypes } from '../constants/actionTypes';
import { auth, db } from '../Components/Firebase/firebase';
import firebase from 'firebase';

const {
  SET_USER_DATA,
  SET_LOADER,
  SET_TOAST,
  SET_AUTH_LOADER,
  SET_SIGN_UP,
  SET_SIGN_IN,
  SET_LOGOUT,
  SET_GOOGLE_SIGNIN,
  SET_IS_NEW_USER,
  User_Details
} = actionTypes;

export const setLoader = (payload) => ({ type: SET_LOADER, payload });
export const setAuthLoader = (payload) => ({ type: SET_AUTH_LOADER, payload });
export const setToast = (message, isShow) => ({
  type: SET_TOAST,
  payload: { message, isShowToast: isShow }
});

export const getCurrentUser = () => async (dispatch) => {
  auth.onAuthStateChanged((user) => {
    dispatch({ type: SET_USER_DATA, payload: user });
    dispatch({ type: SET_LOADER, payload: false });
  });
};
export const signUp =
  (email, password, userName, userAvatar) => async (dispatch) => {
    dispatch({ type: SET_AUTH_LOADER, payload: true });
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setTimeout(() => {
          db.collection(email)
            .doc(User_Details)
            .update({ userName, userAvatar });

          db.collection(email).doc('Game Request').set({
            email: email,
            dp: userAvatar
          });
          db.collection(email).doc('Game Accept').set({
            email: email,
            dp: userAvatar
          });
        }, 8000);
        dispatch({
          type: SET_SIGN_UP,
          payload: response
        });
        dispatch({
          type: SET_IS_NEW_USER,
          payload: response.additionalUserInfo.isNewUser
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_TOAST,
          payload: { message: error.message, showToast: true }
        });
      });
    dispatch({ type: SET_AUTH_LOADER, payload: false });
  };
export const signIn = (email, password) => async (dispatch) => {
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      dispatch({ type: SET_SIGN_IN, payload: response });
      dispatch({
        type: SET_IS_NEW_USER,
        payload: response.additionalUserInfo.isNewUser
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_TOAST,
        payload: { message: error.message, showToast: true }
      });
    });
};
export const logOut = () => async (dispatch) => {
  await auth
    .signOut()
    .then((response) => {
      dispatch({ type: SET_LOGOUT, payload: response });
    })
    .catch((error) => {
      dispatch({
        type: SET_TOAST,
        payload: { message: error.message, showToast: true }
      });
    });
};
export const signInWithGoogle = () => async (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth
    .signInWithPopup(provider)
    .then((response) => {
      dispatch({ type: SET_GOOGLE_SIGNIN, payload: response });
      dispatch({
        type: SET_IS_NEW_USER,
        payload: response.additionalUserInfo.isNewUser
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_TOAST,
        payload: { message: error.message, showToast: true }
      });
    });
};

export const checkStatus = () => async (dispatch) => {};
