import user from './user';
import friends from './friends'
import { combineReducers } from 'redux';

export default combineReducers({
    user,
    friends
})