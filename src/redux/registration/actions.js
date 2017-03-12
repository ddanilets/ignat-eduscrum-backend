/* global VK*/
import * as constants from './constants';
import { sendRegistration as sendRegister } from '../../../backend';
import toastr from 'toastr';
import { push } from 'react-router-redux';

export function updateLogin(element) {
  return { type: constants.UPDATE_LOGIN_ELEMENT, payload: element };
}

export function updatePassword(element) {
  return { type: constants.UPDATE_PASSWORD_ELEMENT, payload: element };
}

export function updateRepeatedPassword(element) {
  return { type: constants.UPDATE_REPEATED_PASSWORD_ELEMENT, payload: element };
}

export function updateEmail(element) {
  return { type: constants.UPDATE_EMAIL_ELEMENT, payload: element };
}

export function updateFirstName(element) {
  return { type: constants.UPDATE_FIRSTNAME_ELEMENT, payload: element };
}

export function updateLastName(element) {
  return { type: constants.UPDATE_LASTNAME_ELEMENT, payload: element };
}

export function removeLoginError() {
  return { type: constants.REMOVE_LOGIN_ELEMENT_ERROR };
}

export function removeEmailError() {
  return { type: constants.REMOVE_EMAIL_ELEMENT_ERROR };
}

export function removePasswordError() {
  return { type: constants.REMOVE_PASSWORD_ELEMENT_ERROR };
}

export function removeFirstNameError() {
  return { type: constants.REMOVE_FIRSTNAME_ELEMENT_ERROR };
}

export function removeLastNameError() {
  return { type: constants.REMOVE_LASTNAME_ELEMENT_ERROR };
}

export function removeRepeatedPasswordError() {
  return { type: constants.REMOVE_REPEATED_PASSWORD_ELEMENT_ERROR };
}

export function addLoginError(error) {
  return { type: constants.ADD_LOGIN_ELEMENT_ERROR, payload: error };
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

export function addFirstNameError(error) {
  return { type: constants.ADD_FIRSTNAME_ELEMENT_ERROR, payload: error };
}

export function addLastNameError(error) {
  return { type: constants.ADD_LASTNAME_ELEMENT_ERROR, payload: error };
}

export function sendRegistrationFailed(error) {
  return { type: constants.SEND_REGISTRATION_FAILED, payload: error };
}

export function sendRegistration() {
  return (dispatch, getState) => {
    const data = {};
    const registration = getState().registration;
    data.password = registration.password.value;
    data.username = registration.login.value;
    data.email = registration.email.value;
    data.first_name = registration.firstName.value;
    data.last_name = registration.lastName.value;
    sendRegister(data)
      .then(() => {
        toastr.success('Поздравляем, вы успешно зарегестрировались!');
        setTimeout(() => {
          dispatch(push(`/${getState().application.language}/home`));
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        toastr.error('Что-то пошло не так. Пожалуйста, повторите попытку позже.');
        dispatch(sendRegistrationFailed(error));
      });
  };
}
