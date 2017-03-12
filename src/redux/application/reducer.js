import * as constants from './constants';
import initialState from './initialState';

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: payload,
      };
    }
    default: {
      return state;
    }
  }
}
