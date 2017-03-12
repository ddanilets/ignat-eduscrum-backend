import * as constants from './constants';
import { loadProject,
  addMilestone as addMs,
  removeMilestone as removeMs,
  createProject as createNewProject,
  loadUsers as loadAllUsers,
  addDev as addUser,
  removeDev as removeUser } from '../../../backend';
import { push } from 'react-router-redux';
import toastr from 'toastr';


export function loadProjectData(id) {
  return (dispatch, getState) => {
    loadProject(id, getState().user.token)
      .then(response => {
        dispatch({ type: constants.LOAD_PROJECT_DATA_SUCCESS, payload: response });
      })
      .catch(error => {
        console.log(error, 'err');
      });
  };
}

export function updateName(element) {
  return { type: constants.UPDATE_NAME_ELEMENT, payload: element };
}

export function updateDescription(element) {
  return { type: constants.UPDATE_DESCRIPTION_ELEMENT, payload: element };
}

export function addMilestone(ms) {
  return (dispatch, getState) => {
    addMs({ project: getState().currentProject.id,
      name: ms.name,
      description: ms.description }, getState().user.token)
      .then(response => {
        dispatch({ type: constants.ADD_MILESTONE, payload: response });
        dispatch(loadProjectData(getState().currentProject.id));
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

export function removeMilestone(id) {
  return (dispatch, getState) => {
    removeMs({ id }, getState().user.token)
      .then(response => {
        dispatch({ type: constants.DELETE_MILESTONE, payload: response });
        dispatch(loadProjectData(getState().currentProject.id));
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

export function createProject() {
  return (dispatch, getState) => {
    const state = getState();
    createNewProject({ name: state.currentProject.name,
      description: state.currentProject.description }, state.user.token)
      .then(response => {
        dispatch({ type: constants.CREATE_PROJECT, payload: response });
        dispatch(push(`/${state.application.language}/user`));
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

export function reInit() {
  return { type: constants.REINIT_REDUCER };
}

export function addDev(id, position) {
  return (dispatch, getState) => {
    addUser({ project: getState().currentProject.id,
      user: id,
      position_name: position }, getState().user.token)
      .then(() => {
        dispatch(loadProjectData(getState().currentProject.id));
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

export function removeDev(id) {
  return (dispatch, getState) => {
    removeUser({ id }, getState().user.token)
      .then(() => {
        dispatch(loadProjectData(getState().currentProject.id));
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

export function loadUsers() {
  return (dispatch, getState) => {
    loadAllUsers(getState().user.token)
      .then(response => {
        dispatch({ type: constants.LOAD_USERS, payload: response });
      })
      .catch(error => {
        console.log(error, 'err');
      });
  };
}
