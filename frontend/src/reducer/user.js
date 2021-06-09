import { actionTypes } from '../constants/actionTypes';

const {
  SET_USER_DATA,
  SET_LOADER,
  SET_SIGN_UP,
  SET_SIGN_IN,
  SET_LOGOUT,
  SET_AUTH_LOADER,
  SET_TOAST,
  SET_GOOGLE_SIGNIN,
  SET_IS_NEW_USER
} = actionTypes;

const initialState = {
  userInfo: null,
  authLoader: false,
  loading: true,
  response: '',
  isNewUser: false,
  toast: { isShowToast: false, message: '' }
};

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER_DATA:
      return { ...state, userInfo: payload };
    case SET_LOADER:
      return { ...state, loading: payload };
    case SET_SIGN_UP:
      return { ...state, response: payload };
    case SET_SIGN_IN:
      return { ...state, response: payload };
    case SET_GOOGLE_SIGNIN:
      return { ...state, response: payload };
    case SET_LOGOUT:
      return { ...state, response: payload };
    case SET_AUTH_LOADER:
      return { ...state, authLoader: payload };
    case SET_IS_NEW_USER:
      return { ...state, isNewUser: payload };
    case SET_TOAST:
      return {
        ...state,
        toast: { isShowToast: payload.showToast, message: payload.message }
      };
    default:
      return state;
  }
}
