import { actionTypes } from '../constants/actionTypes';
import { auth, db } from '../Components/Firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { setSpinner, setToast } from './actions';

const {
  SET_CREATE_ROOM,
  SET_AUTH_LOADER,
  SET_TOAST,
  SET_CHAT_MESSAGES,
  SET_FINAL_SCORE,
  SET_ROOM_DETAILS
} = actionTypes;

export const createRoom = (data) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });

  db.collection('Game Room')
    .doc(`room-${data.roomId}`)
    .set({ creator: data }, { merge: true });

  dispatch({ type: SET_AUTH_LOADER, payload: false });
};
export const joinRoom = (data) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });

  db.collection('Game Room')
    .doc(`room-${data.roomId}`)
    .get()
    .then((info) => {
      if (info.exists) {
        db.collection('Game Room')
          .doc(`room-${data.roomId}`)
          .set({ joiner: data }, { merge: true });
        dispatch(
          setSpinner(
            true,
            <h4 className="text-white">
              Joined in {info.data().creator.usName}'s room
            </h4>
          )
        );
        const chat = [
          { id: 1, common: `${info.data().creator.usName} created the room` },
          { id: 2, common: `${data.usName} joined the room` }
        ];

        db.collection('Game Room')
          .doc(`room-${data.roomId}`)
          .set({ chat: chat }, { merge: true });
      } else {
        dispatch({
          type: SET_TOAST,
          payload: { message: 'Room does not exist', showToast: true }
        });
      }
    });

  dispatch({ type: SET_AUTH_LOADER, payload: false });
};
let unSubscribe = null;
export const roomListener = (data) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });
  unSubscribe = db
    .collection('Game Room')
    .doc(`room-${data.roomId}`)
    .onSnapshot((doc) => {
      if (doc.exists) {
        dispatch({
          type: SET_CREATE_ROOM,
          payload: doc.data()
        });
        dispatch({
          type: SET_CHAT_MESSAGES,
          payload: doc.data().chat
        });
      } else {
        dispatch({
          type: SET_TOAST,
          payload: { message: 'Room does not exist', showToast: true }
        });
        dispatch(setSpinner(false, 'Waiting for Players to join . . . .'));
      }
    });
  dispatch({ type: SET_AUTH_LOADER, payload: false });
};
export { unSubscribe };
export const sendLobbyMessage = (data, roomId) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });
  console.log(data, 'sdsd');
  db.collection('Game Room')
    .doc(`room-${roomId}`)
    .update({ chat: data }, { merge: true });

  dispatch({ type: SET_AUTH_LOADER, payload: false });
};

export const setReady = (data, roomId) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });
  db.collection('Game Room')
    .doc(`room-${roomId}`)
    .set({ ready: data }, { merge: true });
  dispatch(setSpinner(true, 'Awaiting ready from others . . . .'));
  dispatch({ type: SET_AUTH_LOADER, payload: false });
};

export const deleteRoom = (roomId) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });
  db.collection('Game Room').doc(`room-${roomId}`).delete();
  dispatch({ type: SET_AUTH_LOADER, payload: false });
};
export const setTotalScore = (score) => ({
  type: SET_FINAL_SCORE,
  payload: score
});

export const getRoomDetails = (roomId) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADER, payload: true });
  db.collection('Game Room')
    .doc(`room-${roomId}`)
    .get()
    .then((info) => {
      if (info.exists) {
        dispatch({ type: SET_ROOM_DETAILS, payload: info.data() });
      } else {
      }
    });
  dispatch({ type: SET_AUTH_LOADER, payload: false });
};
