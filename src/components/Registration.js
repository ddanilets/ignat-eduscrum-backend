import React from 'react';
import {connect} from 'react-redux';
import {
  updateLogin,
  updatePassword,
  updateEmail,
  updateRepeatedPassword,
  updateFirstName,
  updateLastName,
  addLoginError,
  addEmailError,
  addPasswordError,
  addRepeatedPasswordError,
  addFirstNameError,
  addLastNameError,
  removeLoginError,
  removeEmailError,
  removePasswordError,
  removeRepeatedPasswordError,
  removeFirstNameError,
  removeLastNameError,
  sendRegistration,
} from '../redux/registration/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';
import {Link} from 'react-router';

const getInitialSchema = (props) => {
  return [
    {
      type: 'input',
      id: 'login',
      labelText: '',
      placeholder: 'Username*',
      containerClassName: 'form-row',
      errorStyle: {},
      value: props.login.value,
      error: props.login.error,
      onBlur: (e) => {
        if (e.target.value.length > 20) {
          props.dispatch(addLoginError('Длина логина не должна превышать 20 символов'));
        }
      },
      onChange: (e) => {
        props.dispatch(updateLogin(e.target.value));
        if (e.target.value.length > 20) {
          props.dispatch(addLoginError('Длина логина не должна превышать 20 символов'));
        }
      },
      onFocus: () => {
        props.dispatch(removeLoginError());
      },
    },
    {
      type: 'password',
      id: 'password',
      labelText: '',
      placeholder: 'Password*',
      containerClassName: 'form-row',
      errorStyle: {},
      value: props.password.value,
      error: props.password.error,
      onBlur: (e) => {
        const isNumeric = /\d/g.test(e.target.value);
        const isAlpha = /[A-z]/g.test(e.target.value);
        const isEnoughLength = e.target.value.length > 8;
        if (!isAlpha || !isNumeric || !isEnoughLength) {
          props.dispatch(addPasswordError('Пароль должен быть длиннее 8 символов,' +
            ' содержать буквы и цифры'));
        }
      },
      onChange: (e) => {
        props.dispatch(updatePassword(e.target.value));
      },
      onFocus: () => {
        props.dispatch(removePasswordError());
      },
    },
    {
      type: 'password',
      id: 'repeatPassword',
      labelText: '',
      placeholder: 'Repeat Password*',
      containerClassName: 'form-row',
      errorStyle: {},
      value: props.repeatedPassword.value,
      error: props.repeatedPassword.error,
      onBlur: (e) => {
        if (e.target.value !== props.password.value) {
          props.dispatch(addRepeatedPasswordError('Пароли не совпадают'));
        }
      },
      onChange: (e) => {
        props.dispatch(updateRepeatedPassword(e.target.value));
      },
      onFocus: () => {
        props.dispatch(removeRepeatedPasswordError());
      },
    },
    {
      type: 'input',
      id: 'email',
      labelText: '',
      placeholder: 'Email*',
      containerClassName: 'form-row',
      errorStyle: {},
      value: props.email.value,
      error: props.email.error,
      onBlur: (e) => {
        const isValid = /[0-z]*@[1-z]*\.[A-z]{2,}/.test(e.target.value);
        if (!isValid) {
          props.dispatch(addEmailError('Введите валидную почту'));
        }
      },
      onChange: (e) => {
        props.dispatch(updateEmail(e.target.value));
      },
      onFocus: () => {
        props.dispatch(removeEmailError());
      },
    },
    {
      type: 'input',
      id: 'first_name',
      labelText: '',
      placeholder: 'FirstName*',
      containerClassName: 'form-row',
      errorStyle: {},
      value: props.firstName.value,
      error: props.firstName.error,
      onBlur: (e) => {
        const isValid = /\w+/.test(e.target.value);
        if (!isValid) {
          props.dispatch(addFirstNameError('Обязательное поле'));
        }
      },
      onChange: (e) => {
        props.dispatch(updateFirstName(e.target.value));
      },
      onFocus: () => {
        props.dispatch(removeFirstNameError());
      },
    },
    {
      type: 'input',
      id: 'last_name',
      labelText: '',
      placeholder: 'LastName*',
      containerClassName: 'form-row',
      errorStyle: {},
      value: props.lastName.value,
      error: props.lastName.error,
      onBlur: (e) => {
        const isValid = /\w+/.test(e.target.value);
        if (!isValid) {
          props.dispatch(addLastNameError('Обязательное поле'));
        }
      },
      onChange: (e) => {
        props.dispatch(updateLastName(e.target.value));
      },
      onFocus: () => {
        props.dispatch(removeLastNameError());
      },
    },
  ];
};

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {registrationSchema: getInitialSchema(props)};
    this.sendRegistration = this.sendRegistration.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      registrationSchema: getInitialSchema(props),
    });
  }

  sendRegistration() {
    this.props.dispatch(sendRegistration());
  }

  render() {
    return (
      <div className="registration-page">
        <div className="registration-form wrapper wrapper-sm">
          <div className="logo-headline">
            <div className="logo">IGNAT</div>
            <div className="headline">Учиться просто!</div>
          </div>
          <FormBuilder className="name-rows" elements={this.state.registrationSchema}/>
          <Button
            style={{ display: 'flex', justifyContent: 'center' }}
            disabled={this.props.error}
            onClick={this.sendRegistration}
            className="btn registration-button"
            buttonText="Регистрация"
          />
          <Link to={`/${this.props.language}/home`}>Уже зарегистрированы?</Link>
          <div className="registration-books" />
          <div className="ignat-registration" />
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect(state => {
  return {
    login: state.registration.login,
    email: state.registration.email,
    password: state.registration.password,
    language: state.application.language,
    repeatedPassword: state.registration.repeatedPassword,
    error: state.registration.error,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
  };
})(Registration);

// <FormBuilder elements={this.state.registrationSchema} />
// <Button onClick={this.sendRegistration} buttonText="Register" />