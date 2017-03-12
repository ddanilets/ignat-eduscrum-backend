import * as constants from './constants';
import initialState from './InitialState';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case constants.SEND_LOGIN:
      return state;
    case constants.UPDATE_LOGIN_ELEMENT:
      newState.login = { value: payload, error: null };
      return newState;
    case constants.UPDATE_PASSWORD_ELEMENT:
      newState.password = { value: payload, error: null };
      return newState;
    case constants.ADD_LOGIN_ELEMENT_ERROR:
      newState.login = { value: state.login.value, error: payload };
      return newState;
    case constants.ADD_PASSWORD_ELEMENT_ERROR:
      newState.password = { value: state.password.value, error: payload };
      return newState;
    case constants.REMOVE_LOGIN_ELEMENT_ERROR:
      newState.login = { value: state.login.value, error: null };
      return newState;
    case constants.REMOVE_PASSWORD_ELEMENT_ERROR:
      newState.password = { value: state.password.value, error: null };
      return newState;
    case constants.SEND_LOGIN_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

