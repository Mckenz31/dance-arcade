import { actionTypes } from '../constants/actionTypes';
import { auth } from '../Components/Firebase/firebase';
import firebase from 'firebase';

const {
  SET_USER_DATA,
  SET_LOADER,
  SET_TOAST,
  SET_AUTH_LOADER,
  SET_SIGN_UP,
  SET_SIGN_IN,
  SET_LOGOUT,
  SET_GOOGLE_SIGNIN
} = actionTypes;

export const setLoader = (payload) => ({ type: SET_LOADER, payload });
export const setAuthLoader = (payload) => ({ type: SET_AUTH_LOADER, payload });
export const setToast = (message, isShow) => ({
  type: SET_TOAST,
  payload: { message, isShowToast: isShow }
});

export const getCurrentUser = () => async (dispatch) => {
  auth.onAuthStateChanged((user) => {
    console.log(user, 'users');
    dispatch({ type: SET_LOADER, payload: false });
    dispatch({ type: SET_USER_DATA, payload: user });
  });
};
export const signUp = (email, password) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      dispatch({ type: SET_SIGN_UP, payload: response });
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
  dispatch({ type: SET_AUTH_LOADER, payload: true });
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      dispatch({ type: SET_SIGN_IN, payload: response });
    })
    .catch((error) => {
      dispatch({
        type: SET_TOAST,
        payload: { message: error.message, showToast: true }
      });
    });

  dispatch({ type: SET_AUTH_LOADER, payload: false });
};
export const logOut = () => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });
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
    })
    .catch((error) => {
      console.log('came here');
      dispatch({
        type: SET_TOAST,
        payload: { message: error.message, showToast: true }
      });
    });
};
export const checkStatus = () => async (dispatch) => {};