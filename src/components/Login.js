/**
 * Created by malamud on 02.12.16.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  updateLogin,
  updatePassword,
  sendLogIn as loginUser,
  resetPassword as reset,
} from '../redux/logIn/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';
import {Link} from 'react-router';

const getInitialSchema = props => {
  return [
    {
      type: 'input',
      id: 'login',
      labelText: '',
      placeholder: 'Логин',
      containerClassName: 'form-row',
      value: props.login.value,
      error: props.login.error,
      onChange: (e) => {
        props.dispatch(updateLogin(e.target.value));
      },
    },
    {
      type: 'password',
      id: 'password',
      labelText: '',
      placeholder: 'Пароль',
      containerClassName: 'form-row',
      value: props.password.value,
      error: props.password.error,
      onChange: (e) => {
        props.dispatch(updatePassword(e.target.value));
      },
    },
  ];
};

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logInSchema: getInitialSchema(props)};
    this.sendLogIn = this.sendLogIn.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      logInSchema: getInitialSchema(props),
    });
  }

  sendLogIn() {
    this.props.dispatch(loginUser());
  }

  resetPassword() {
    this.props.dispatch(reset());
  }

  render() {
    return (
      <div className="login-form">
        <div className="login-wrapper">
          <div className="logo-headline">
            <div className="logo">IGNAT</div>
            <div className="headline">Учиться просто!</div>
          </div>
          <FormBuilder elements={this.state.logInSchema} />
          <Button
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={this.sendLogIn}
            className="btn login-button"
            buttonText="Войти"
          />
          <Link to={`/${this.props.language}/registration`}>Регистрация</Link>
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect(state => {
  return {
    login: state.logIn.login,
    password: state.logIn.password,
    language: state.application.language,
  };
})(LogIn);
