import { actionTypes } from '../constants/actionTypes';

const {
  SET_CREATE_ROOM,
  SET_CHAT_MESSAGES,
  SET_FINAL_SCORE,
  SET_ROOM_DETAILS
} = actionTypes;

const initialState = {
  room: null,
  chatMessages: null,
  finalScore: 0
};

export default function multiplayer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CREATE_ROOM:
      return { ...state, room: payload };
    case SET_CHAT_MESSAGES:
      return { ...state, chatMessages: payload };
    case SET_FINAL_SCORE:
      return { ...state, finalScore: payload };
    case SET_ROOM_DETAILS:
      return { ...state, room: payload };
    default:
      return state;
  }
}
