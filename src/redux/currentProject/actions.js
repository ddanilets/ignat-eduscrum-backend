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

export function updateDeadline(element) {
  return { type: constants.UPDATE_DEADLINE, payload: element };
}


export function createProject() {
  return (dispatch, getState) => {
    const state = getState();
    createNewProject({ name: state.currentProject.name,
      description: state.currentProject.description,
      deadline: state.currentProject.deadline.toISOString().replace(/(.*)T(.*)/, '$1'),
      id: state.user.id })
      .then(response => {
        dispatch({ type: constants.CREATE_PROJECT, payload: response });
        dispatch(push(`/${state.application.language}/user`));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function reInit() {
  return { type: constants.REINIT_REDUCER };
}

