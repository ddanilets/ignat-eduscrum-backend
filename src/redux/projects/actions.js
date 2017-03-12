import * as constants from './constants';
import { loadProjects as load } from '../../../backend';
import toastr from 'toastr';

export function loadProjects() {
  return (dispatch, getState) => {
    load(getState().user.token)
      .then(response => {
        dispatch({ type: constants.LOAD_PROJECT_DATA_SUCCESS, payload: response });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
