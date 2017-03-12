import * as constants from './constants';
import initialState from './initialState';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case constants.SEND_REGISTRATION:
      return state;
    case constants.UPDATE_LOGIN_ELEMENT:
      newState.login = { value: payload, error: null };
      return newState;
    case constants.UPDATE_EMAIL_ELEMENT:
      newState.email = { value: payload, error: null };
      return newState;
    case constants.UPDATE_PASSWORD_ELEMENT:
      newState.password = { value: payload, error: null };
      return newState;
    case constants.UPDATE_REPEATED_PASSWORD_ELEMENT:
      newState.repeatedPassword = { value: payload, error: null };
      return newState;
    case constants.UPDATE_FIRSTNAME_ELEMENT:
      newState.firstName = { value: payload, error: null };
      return newState;
    case constants.UPDATE_LASTNAME_ELEMENT:
      newState.lastName = { value: payload, error: null };
      return newState;
    case constants.ADD_LOGIN_ELEMENT_ERROR:
      newState.login = { value: state.login.value, error: payload };
      newState.error = true;
      return newState;
    case constants.ADD_EMAIL_ELEMENT_ERROR:
      newState.email = { value: state.email.value, error: payload };
      newState.error = true;
      return newState;
    case constants.ADD_PASSWORD_ELEMENT_ERROR:
      newState.error = true;
      newState.password = { value: state.password.value, error: payload };
      return newState;
    case constants.ADD_REPEATED_PASSWORD_ELEMENT_ERROR:
      newState.error = true;
      newState.repeatedPassword = { value: state.repeatedPassword.value, error: payload };
      return newState;
    case constants.ADD_LASTNAME_ELEMENT_ERROR:
      newState.error = true;
      newState.lastName = { value: state.lastName.value, error: payload };
      return newState;
    case constants.ADD_FIRSTNAME_ELEMENT_ERROR:
      newState.error = true;
      newState.firstName = { value: state.firstName.value, error: payload };
      return newState;
    case constants.REMOVE_LOGIN_ELEMENT_ERROR:
      newState.error = false;
      newState.login = { value: state.login.value, error: null };
      return newState;
    case constants.REMOVE_EMAIL_ELEMENT_ERROR:
      newState.error = false;
      newState.email = { value: state.email.value, error: null };
      return newState;
    case constants.REMOVE_PASSWORD_ELEMENT_ERROR:
      newState.error = false;
      newState.password = { value: state.password.value, error: null };
      return newState;
    case constants.REMOVE_REPEATED_PASSWORD_ELEMENT_ERROR:
      newState.error = false;
      newState.repeatedPassword = { value: state.repeatedPassword.value, error: null };
      return newState;
    case constants.REMOVE_FIRSTNAME_ELEMENT_ERROR:
      newState.error = false;
      newState.firstName = { value: state.firstName.value, error: null };
      return newState;
    case constants.REMOVE_LASTNAME_ELEMENT_ERROR:
      newState.error = false;
      newState.lastName = { value: state.lastName.value, error: null };
      return newState;
    case constants.SEND_REGISTRATION_FAILED:
      return state;
    default:
      return state;
  }
}
