import * as constants from './constants';
import initialState from './initialState';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case constants.LOAD_PROJECT_DATA_SUCCESS:
      return Object.assign({}, newState, payload.body);
    case constants.UPDATE_NAME_ELEMENT:
      newState.name = payload;
      return newState;
    case constants.UPDATE_DESCRIPTION_ELEMENT:
      newState.description = payload;
      return newState;
    case constants.CREATE_PROJECT:
      return newState;
    case constants.ADD_MILESTONE:
      return newState;
    case constants.DELETE_MILESTONE:
      return newState;
    case constants.REINIT_REDUCER:
      return initialState;
    case constants.LOAD_USERS:
      newState.users = payload.body;
      return newState;
    default:
      return state;
  }
}
