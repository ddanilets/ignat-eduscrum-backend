import * as constants from './constants';
import { loadProject,
  addMilestone as addMs,
  removeMilestone as removeMs,
  createProject as createNewProject,
  createTicket as create,
  updateTicket as update,
  loadUsers as loadAllUsers,
  loadTicket,
  removeDev as removeUser } from '../../../backend';
import { push } from 'react-router-redux';
import toastr from 'toastr';


export function loadTicketData(id) {
  return (dispatch, getState) => {
    loadTicket(id)
      .then(response => {
        dispatch({ type: constants.LOAD_TICKET_DATA_SUCCESS, payload: response });
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

export function updateEstimate(element) {
  return { type: constants.UPDATE_ESTIMATE_ELEMENT, payload: element };
}

export function updateAssignee(element) {
  return { type: constants.UPDATE_ASIGNEE_ELEMENT, payload: element };
}

export function updatePriority(element) {
  return { type: constants.UPDATE_PRIORITY_ELEMENT, payload: element };
}

export function updateProjectId(element) {
  return { type: constants.UPDATE_PROJECT_ELEMENT, payload: element };
}

export function createTicket() {
  return (dispatch, getState) => {
    const state = getState();
    create({ name: state.ticket.name,
      description: state.ticket.description,
      estimate: state.ticket.estimate,
      priority: state.ticket.priority,
      project_id: state.ticket.projectId,
      assignee_id: state.ticket.assignee,
      id: state.user.id })
      .then(response => {
        dispatch({ type: constants.CREATE_TASK, payload: response });
        dispatch(push(`/${state.application.language}/user`));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function updateTicket() {
  return (dispatch, getState) => {
    const state = getState();
    update({ name: state.ticket.name,
      description: state.ticket.description,
      estimate: state.ticket.estimate,
      priority: state.ticket.priority,
      project_id: state.ticket.projectId,
      assignee_id: state.ticket.assignee,
      id: state.user.id }, state.ticket.id)
      .then(response => {
        dispatch({ type: constants.UPDATE_TASK, payload: response });
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

