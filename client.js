import React from 'react';
import { Router } from 'react-router';
import ReactDOM from 'react-dom';
import configureStore from './src/redux/createStore';
import { browserHistory } from 'react-router';
import DevTools from './src/redux/DevTools';
import { Provider } from 'react-redux';
import routes from './src/config/routes';
import './src/static/css/main.scss';

window.App.user.token = localStorage.getItem('auth_token') || null;
window.App.user.id = localStorage.getItem('id') || null;

const { store, history } = configureStore(browserHistory, window.App);

const Application = () => {
  return (
  <Provider store={store} key="provider">
    <div>
      <Router history={history} routes={routes(store)} />
      {process.env.NODE_ENV === 'development' ? <DevTools store={store} /> : null}
    </div>
  </Provider>);
};

ReactDOM.render(<Application />, document.getElementById('app'));
