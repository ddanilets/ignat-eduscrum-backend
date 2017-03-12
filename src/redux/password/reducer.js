import * as constants from './constants';
import initialState from './initialState';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case constants.RESET_PASSWORD:
      return state;
    case constants.UPDATE_EMAIL_ELEMENT:
      newState.email = { value: payload, error: null };
      return newState;
    case constants.UPDATE_PASSWORD_ELEMENT:
      newState.password = { value: payload, error: null };
      return newState;
    case constants.UPDATE_REPEATED_PASSWORD_ELEMENT:
      newState.repeatedPassword = { value: payload, error: null };
      return newState;
    case constants.ADD_EMAIL_ELEMENT_ERROR:
      newState.email = { value: state.email.value, error: payload };
      return newState;
    case constants.ADD_PASSWORD_ELEMENT_ERROR:
      newState.password = { value: state.password.value, error: payload };
      return newState;
    case constants.ADD_REPEATED_PASSWORD_ELEMENT_ERROR:
      newState.repeatedPassword = { value: state.repeatedPassword.value, error: payload };
      return newState;
    case constants.REMOVE_EMAIL_ELEMENT_ERROR:
      newState.email = { value: state.email.value, error: null };
      return newState;
    case constants.REMOVE_PASSWORD_ELEMENT_ERROR:
      newState.password = { value: state.password.value, error: null };
      return newState;
    case constants.REMOVE_REPEATED_PASSWORD_ELEMENT_ERROR:
      newState.repeatedPassword = { value: state.repeatedPassword.value, error: null };
      return newState;
    case constants.SEND_RESET_PASSWORD_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
