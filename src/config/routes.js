import React from 'react';
import { Route } from 'react-router';
import App from '../App.js';
import Registration from '../components/Registration';
import PasswordReset from '../components/PasswordReset';
import Home from '../components/Home';
import _404 from '../components/_404.js';
import UserProfile from '../components/UserProfile';
import EditUserProfile from '../components/EditUserProfile';
import ProjectCreationPage from '../components/ProjectCreationPage';
import ProjectPage from '../components/ProjectPage';
import TicketCreationPage from '../components/TicketCreationPage';
import TicketEditPage from '../components/TicketEditPage';
import Ticket from '../components/TicketPage';
import { loadUserData as loadData } from '../redux/user/actions';
import { loadTickets } from '../redux/tickets/actions';
import { loadProjects } from '../redux/projects/actions';
import { loadAllUsers } from '../redux/user/actions';
import { reInit as reInitTickets, loadTicketData } from '../redux/ticket/actions';
import { reInit, loadProjectData as loadProject, loadUsers } from '../redux/currentProject/actions';
import { replace } from 'react-router-redux';
/*
import { availableLocales } from './config';
import { changeLanguage } from '../redux/application/actions';
*/


/* const chckLanguage = (dispatch, nextState, replace) => {
  const testResult = availableLocales(nextState.params.language);
  if (testResult.contains) {
    if (testResult.locale === nextState.params.language) {
      dispatch(changeLanguage(testResult.locale));
      return null;
    }
    dispatch(changeLanguage(testResult.locale));
    replace(`/${testResult.locale}`);
  } else {
    dispatch(changeLanguage('en'));
    replace('/en');
  }
  return null;
};*/

const loadUserData = (store) => {
  return (nextState, r, cb) => {
    if (store.getState().user.token) {
      store.dispatch(loadData(store.getState().user.id));
      store.dispatch(loadProjects(store.getState().user.token));
      store.dispatch(loadTickets());
    } else {
      store.dispatch(replace(`/${store.getState().application.language}/home`));
      (typeof location !== 'undefined') && location.reload();
    }
    cb();
  };
};

const checkUserLoggedIn = (store) => {
  return () => {
    // if (store.getState().user.token) {
    //   store.dispatch(replace(`/${store.getState().application.language}/user`));
    //   (typeof location !== 'undefined') && location.reload();
    // }
  };
};

const loadProjectData = (store) => {
  return (nextState, r) => {
    if (store.getState().user.token) {
      store.dispatch(loadProject(nextState.params.id));
      store.dispatch(loadUsers());
    } else {
      r(`/${store.getState().application.language}/home`);
    }
  };
}

const reInitProject = (store) => {
  return (nextState, r, cb) => {
    if (!store.getState().user.token) {
      replace(`/${store.getState().application.language}/home`);
    }
    store.dispatch(reInit());
    cb();
  };
}

const loadAllData = (store) => {
  return (nextState, r, cb) => {
    if (!store.getState().user.token) {
      replace(`/${store.getState().application.language}/home`);
    }
    store.dispatch(reInitTickets());
    store.dispatch(loadAllUsers());
    store.dispatch(loadProjects());
    cb();
  };
}

const loadAllDataForEdit = (store) => {
  return (nextState, r, cb) => {
    if (!store.getState().user.token) {
      replace(`/${store.getState().application.language}/home`);
    }
    store.dispatch(reInitTickets());
    store.dispatch(loadAllUsers());
    store.dispatch(loadTicketData(nextState.params.id));
    store.dispatch(loadProjects());
    cb();
  };
}

const routes = (store) => {
  return (
    <Route path="/" component={App}>
      <Route name="reset-password" path=":language/reset-password" component={PasswordReset} />
      <Route name="home" path=":language/home" component={Home} />
      <Route name="registration" path=":language/registration" onEnter={checkUserLoggedIn(store)}
        component={Registration}
      />
      <Route name="user" path=":language/user" onEnter={loadUserData(store)} header={true}
        component={UserProfile}
      />
      <Route name="projectCreation" path=":language/create-project" header={true}
        component={ProjectCreationPage}
        onEnter={reInitProject(store)}
      />
       <Route name="project" path=":language/project/:id" header={true}
        component={ProjectPage}
        onEnter={reInitProject(store)}
      />
        <Route name="ticketCreation" path=":language/create-ticket" header={true}
        component={TicketCreationPage}
        onEnter={loadProjectData(store)}
      />
        <Route name="ticket" path=":language/ticket/:id" header={true}
        component={Ticket}
        onEnter={loadAllDataForEdit(store)}
      />
        <Route name="ticketEdit" path=":language/ticket/:id/edit" header={true}
        component={TicketEditPage}
        onEnter={loadAllDataForEdit(store)}
      />
      <Route path="*" component={_404} />
    </Route>);
};
export default routes;
