import { actionTypes } from '../constants/actionTypes';

const { SET_CREATE_ROOM, SET_CHAT_MESSAGES } = actionTypes;

const initialState = {
  room: null,
  chatMessages: null
};

export default function multiplayer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CREATE_ROOM:
      return { ...state, room: payload };
    case SET_CHAT_MESSAGES:
      return { ...state, chatMessages: payload };
    default:
      return state;
  }
}
