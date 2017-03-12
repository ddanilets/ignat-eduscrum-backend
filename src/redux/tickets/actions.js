import * as constants from './constants';
import { loadTickets as load } from '../../../backend';
import toastr from 'toastr';

export function loadTickets() {
  return (dispatch) => {
    load()
      .then(response => {
        dispatch({ type: constants.LOAD_TICKETS_DATA_SUCCESS, payload: response });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
