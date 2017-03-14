/* global VK*/
import * as constants from './constants';
import { getUserData, sendUserData, logoutUser, loadAllUsers as loadUsers } from '../../../backend';
import { push } from 'react-router-redux';
import { loadProjects } from '../projects/actions';
import toastr from 'toastr';


export function loadUserData(id) {
  return (dispatch) => {
    dispatch(loadProjects());
    getUserData(id)
      .then(response => {
        dispatch({ type: constants.LOAD_USER_DATA_SUCCESS, payload: response });
      })
      .catch(error => {
        dispatch({ type: constants.LOAD_USER_DATA_ERROR, payload: error });
      });
  };
}

export function updateUserData() {
  return (dispatch, getState) => {
    const data = {};
    const userState = getState().user;
    data.first_name = userState.name;
    data.last_name = userState.surname;
    data.skype = userState.skype;
    sendUserData(data, userState.token)
      .then(responce => {
        dispatch({ type: constants.LOAD_USER_DATA_SUCCESS, payload: responce });
        dispatch(push(`/${getState().application.language}/user`));
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

export function logout() {
  return (dispatch, getState) => {
    const userState = getState().user;
    logoutUser(userState.token)
      .then(() => {
        dispatch({ type: constants.LOGOUT_USER });
        dispatch(push(`/${getState().application.language}/home`));
      });
  };
}

export function updateName(element) {
  return { type: constants.UPDATE_NAME_ELEMENT, payload: element };
}

export function updateSurname(element) {
  return { type: constants.UPDATE_SURNAME_ELEMENT, payload: element };
}

export function updateSkype(element) {
  return { type: constants.UPDATE_SKYPE_ELEMENT, payload: element };
}

export function loadAllUsers() {
  return (dispatch, getState) => {
    const data = {};
    const userState = getState().user;
    data.first_name = userState.name;
    data.last_name = userState.surname;
    data.skype = userState.skype;
    loadUsers()
      .then(responce => {
        dispatch({ type: constants.LOAD_ALL_USERS, payload: responce });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
