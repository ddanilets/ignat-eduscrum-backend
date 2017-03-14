import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import applicationReducer from './application/reducer';
import registrationReducer from './registration/reducer';
import passwordReducer from './password/reducer';
import logInReducer from './logIn/reducer';
import userReducer from './user/reducer';
import currentProjectReducer from './currentProject/reducer';
import projectsReducer from './projects/reducer';
import ticketsReducer from './tickets/reducer';
import ticketReducer from './ticket/reducer';

export default combineReducers({
  routing: routerReducer,
  application: applicationReducer,
  registration: registrationReducer,
  password: passwordReducer,
  logIn: logInReducer,
  user: userReducer,
  currentProject: currentProjectReducer,
  projects: projectsReducer,
  tickets: ticketsReducer,
  ticket: ticketReducer,
});
