import React from 'react';
import { connect } from 'react-redux';
import { updatePassword,
  updateRepeatedPassword,
  addPasswordError,
  addRepeatedPasswordError,
  removePasswordError,
  removeRepeatedPasswordError,
  setNewPassword,
} from '../redux/password/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';

const getInitialSchema = (props) => {
  return [
    {
      type: 'password',
      id: 'password',
      labelText: <div className="icon">
        <svg viewBox="0 0 512 512">
          <use href="../static/icon/all.svg#security"></use>
        </svg>
      </div>,
      placeholder: 'Password*',
      containerClassName: 'form-row',
      value: props.password.value,
      error: props.password.error,
      onBlur: (e) => {
        const isNumeric = /\d/g.test(e.target.value);
        const isAlpha = /[A-z]/g.test(e.target.value);
        const isEnoughLength = e.target.value.length > 10;
        if (!isAlpha || !isNumeric || !isEnoughLength) {
          props.dispatch(addPasswordError('password length must be more than 10 symbols,' +
            ' contain letters and digits'));
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
      labelText: <div className="icon">
        <svg viewBox="0 0 512 512">
          <use href="../static/icon/all.svg#security"></use>
        </svg>
      </div>,
      placeholder: 'Repeat password*',
      containerClassName: 'form-row',
      value: props.repeatedPassword.value,
      error: props.repeatedPassword.error,
      onBlur: (e) => {
        if (e.target.value !== props.password.value) {
          props.dispatch(addRepeatedPasswordError('passwords must be the same'));
        }
      },
      onChange: (e) => {
        props.dispatch(updateRepeatedPassword(e.target.value));
      },
      onFocus: () => {
        props.dispatch(removeRepeatedPasswordError());
      },
    },
  ];
};

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: getInitialSchema(props) };
    this.sendNewPassword = this.sendNewPassword.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      schema: getInitialSchema(props),
    });
  }

  sendNewPassword() {
    this.props.dispatch(setNewPassword(this.props.location.query));
  }

  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="logo">
              <a href="#">
                <img src="../static/img/logo.png"/>
              </a>
            </div>
          </div>
        </header>
        <main className="login-page">
          <div className="container">
            <div className="login">
              <div className="login-header">
                <div className="text">
                  <h2>Set new password</h2>
                  <p>Want to set new password fill out this form</p>
                </div>
                <div className="icon"></div>
              </div>
              <div className="login-form">
                <FormBuilder elements={this.state.schema} />
                <Button
                  style={{ display: 'block', textAlign: 'right' }}
                  onClick={this.sendNewPassword}
                  className="btn"
                  buttonText="Set new password"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

NewPassword.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect(state => {
  return {
    password: state.password.password,
    repeatedPassword: state.password.repeatedPassword,
  };
})(NewPassword);