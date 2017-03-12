/* global VK*/
import * as constants from './constants';

export function changeLanguage(langauge) {
  return { type: constants.CHANGE_LANGUAGE, payload: langauge };
}
