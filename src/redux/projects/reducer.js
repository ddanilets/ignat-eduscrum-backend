import * as constants from './constants';
import initialState from './initialState';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action) {
  const newState = cloneDeep(state);
  const { type, payload } = action;
  switch (type) {
    case constants.LOAD_PROJECT_DATA_SUCCESS:
      newState.projects = payload;
      return newState;
    default:
      return state;
  }
}
