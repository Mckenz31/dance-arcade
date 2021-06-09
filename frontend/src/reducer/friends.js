import { actionTypes } from '../constants/actionTypes';

const {
  SET_FRIENDS,
  SET_SEARCH_FRIEND,
  SET_SENT_FRIEND_REQUEST,
  SET_ACCEPT_FRIEND_REQUEST,
  SET_FRIEND_REQUEST_LIST,
  SET_USER_PROFILE_DATA
} = actionTypes;

const initialState = {
  userProfile:null,
  friendsList: [],
  searchedFriend: { requests: [] },
  friendRequestList: { requests: [] },
  sentRequestResponse: null,
  acceptRequestReponse: null
};

export default function friends(state = initialState, { type, payload }) {
  switch (type) {
    case SET_FRIENDS:
      return { ...state, friendsList: payload };
    case SET_SEARCH_FRIEND:
      return { ...state, searchedFriend: payload };
    case SET_FRIEND_REQUEST_LIST:
      return { ...state, friendRequestList: payload };
    case SET_SENT_FRIEND_REQUEST:
      return { ...state, sentRequestResponse: payload };
    case SET_ACCEPT_FRIEND_REQUEST:
      return { ...state, acceptRequestReponse: payload };
    case SET_USER_PROFILE_DATA:
      return { ...state, userProfile: payload };
    default:
      return state;
  }
}
