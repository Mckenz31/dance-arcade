import user from './user';
import friends from './friends';
import multiplayer from './multiplayer';

import { combineReducers } from 'redux';

export default combineReducers({
  user,
  friends,
  multiplayer
});
