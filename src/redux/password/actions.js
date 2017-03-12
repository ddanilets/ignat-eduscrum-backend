/* global VK*/
import * as constants from './constants';
import { sendNewPassword, sendResetPassword } from '../../../backend';
import { push } from 'react-router-redux';
import toastr from 'toastr';

export function updatePassword(element) {
  return { type: constants.UPDATE_PASSWORD_ELEMENT, payload: element };
}

export function updateRepeatedPassword(element) {
  return { type: constants.UPDATE_REPEATED_PASSWORD_ELEMENT, payload: element };
}

export function updateEmail(element) {
  return { type: constants.UPDATE_EMAIL_ELEMENT, payload: element };
}

export function removeEmailError() {
  return { type: constants.REMOVE_EMAIL_ELEMENT_ERROR };
}

export function removePasswordError() {
  return { type: constants.REMOVE_PASSWORD_ELEMENT_ERROR };
}

export function removeRepeatedPasswordError() {
  return { type: constants.REMOVE_REPEATED_PASSWORD_ELEMENT_ERROR };
}

export function addEmailError(error) {
  return { type: constants.ADD_EMAIL_ELEMENT_ERROR, payload: error };
}

export function addRepeatedPasswordError(error) {
  return { type: constants.ADD_REPEATED_PASSWORD_ELEMENT_ERROR, payload: error };
}

export function addPasswordError(error) {
  return { type: constants.ADD_PASSWORD_ELEMENT_ERROR, payload: error };
}

export function sendResetPasswordFailed(error) {
  return { type: constants.SEND_RESET_PASSWORD_FAILED, payload: error };
}

export function resetPassword() {
  return (dispatch, getState) => {
    const data = {};
    const passwordState = getState().password;
    data.email = passwordState.email.value;
    sendResetPassword(data)
      .then(() => {
        toastr.success('Please check your mailbox in order to proceed');
      })
      .catch(error => {
        const e = JSON.parse(error.error.response.text);
        console.error(e);
        for (const entity in e) {
          if (e.hasOwnProperty(entity)) {
            e[entity].forEach((el) => {
              console.log(el);
              toastr.error(`${entity}: ${el}`);
            });
          }
        }
      });
  };
}

export function setNewPassword(query) {
  return (dispatch, getState) => {
    const data = {};
    const passwordState = getState().password;
    data.new_password = passwordState.password.value;
    data.uid = query.uid;
    data.token = query.token;
    sendNewPassword(data)
      .then(() => {
        toastr.success('Your password has been successfuly changed!');
        dispatch(push(`/${getState().application.language}/login`));
      })
      .catch(error => {
        const e = JSON.parse(error.error.response.text);
        console.error(e);
        for (const entity in e) {
          if (e.hasOwnProperty(entity)) {
            e[entity].forEach((el) => {
              console.log(el);
              toastr.error(`${entity}: ${el}`);
            });
          }
        }
      });
  };
}
