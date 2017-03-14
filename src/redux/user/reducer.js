import * as constants from './constants';
import { LOGIN_USER } from '../logIn/constants';
import initialState from './initialState';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case constants.LOAD_USER_DATA_SUCCESS:
      console.log(payload);
      newState.username = payload.user.username;
      newState.firstName = payload.first_name;
      newState.email = payload.user.email;
      newState.lastName = payload.last_name;
      return newState;
    case LOGIN_USER:
      newState.token = payload.auth_token;
      newState.id = payload.id;
      return newState;
    case constants.LOAD_ALL_USERS:
      newState.users = payload;
      return newState;
    case constants.LOGOUT_USER:
      newState.token = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('id');
      return newState;
    default:
      return state;
  }
}
