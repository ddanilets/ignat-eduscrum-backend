/* global VK*/
import * as constants from './constants';

export function changeLanguage(language) {
  return { type: constants.CHANGE_LANGUAGE, payload: language };
}
