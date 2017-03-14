import * as constants from './constants';
import initialState from './initialState';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case constants.LOAD_TICKET_DATA_SUCCESS:
        newState.name = payload.name;
        newState.id = payload.id;
        newState.description = payload.description;
        newState.priority = payload.priority;
        newState.estimate = payload.estimate;
        if (payload.assignee) {
          newState.assignee = payload.assignee.id;
        }
        newState.projectId = payload.project.id;
      return newState;
    case constants.LOAD_ATTACHEMENTS:
      return Object.assign({}, {tickets: payload.body});
    case constants.UPDATE_NAME_ELEMENT:
      newState.name = payload;
      return newState;
    case constants.UPDATE_DESCRIPTION_ELEMENT:
      newState.description = payload;
      return newState;
    case constants.UPDATE_ESTIMATE_ELEMENT:
      newState.estimate = payload;
      return newState;
    case constants.UPDATE_PRIORITY_ELEMENT:
      newState.priority = payload;
      return newState;
    case constants.UPDATE_ASIGNEE_ELEMENT:
      newState.assignee = payload;
      return newState;
    case constants.UPDATE_PROJECT_ELEMENT:
      newState.projectId = payload;
      return newState;
    case constants.CREATE_TASK:
      return newState;
    case constants.ADD_ATTACHMENT:
      return newState;
    case constants.REMOVE_ATTACHMENT:
      return newState;
    case constants.UPDATE_TASK:
      return newState;
    case constants.REINIT_REDUCER:
      return initialState;
    default:
      return state;
  }
}
