import { combineReducers } from 'redux';
import token from './token-reducer';
import profile from './profile-reducer';
import picture from './client-picture-reducer';

export default combineReducers({
  token, profile, picture,
});
