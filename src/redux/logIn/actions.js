import * as constants from './constants';
import { checkLoginAndPasswordAccordance } from '../../../backend';
import { push } from 'react-router-redux';
import toastr from 'toastr';

export function updateLogin(element) {
  return { type: constants.UPDATE_LOGIN_ELEMENT, payload: element };
}

export function updatePassword(element) {
  return { type: constants.UPDATE_PASSWORD_ELEMENT, payload: element };
}

export function sendLoginFailed(error) {
  return { type: constants.SEND_LOGIN_FAILED, payload: error };
}

export function sendLogIn() {
  return (dispatch, getState) => {
    const data = {};
    const loginState = getState().logIn;
    data.username = loginState.login.value;
    data.password = loginState.password.value;
    checkLoginAndPasswordAccordance(data)
      .then(response => {
        dispatch({ type: constants.LOGIN_USER, payload: response });
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('id', response.id);
        dispatch(push(`/${getState().application.language}/user`));
      })
      .catch(error => {
        console.error(error);
        toastr.error('Что-то пошло не так. Пожалуйста, повторите попытку позже.');
        dispatch(sendLoginFailed(error));
      });
  };
}

export function resetPassword() {
  return (dispatch, getState) => {
    dispatch(push(`/${getState().application.language}/reset-password`));
  };
}
