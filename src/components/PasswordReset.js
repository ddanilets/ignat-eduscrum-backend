import React from 'react';
import { connect } from 'react-redux';
import { updateEmail,
  addEmailError,
  removeEmailError,
  resetPassword,
} from '../redux/password/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';

const getInitialSchema = (props) => {
  return [
    {
      type: 'input',
      id: 'email',
      labelText: <div className="icon">
        <svg viewBox="0 0 512 512">
          <use href="../static/icon/all.svg#mail"></use>
        </svg>
      </div>,
      placeholder: 'Email*',
      containerClassName: 'form-row',
      errorStyle: { color: 'red', fontSize: '12px' },
      value: props.email.value,
      error: props.email.error,
      onBlur: (e) => {
        const isValid = /[0-z]*@[1-z]*\.[A-z]{2,}/.test(e.target.value);
        if (!isValid) {
          props.dispatch(addEmailError('enter a valid email'));
        }
      },
      onChange: (e) => {
        props.dispatch(updateEmail(e.target.value));
      },
      onFocus: () => {
        props.dispatch(removeEmailError());
      },
    },
  ];
};

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: getInitialSchema(props) };
    this.sendResetPassword = this.sendResetPassword.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      schema: getInitialSchema(props),
    });
  }

  sendResetPassword() {
    this.props.dispatch(resetPassword());
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
                  <h2>Reset password</h2>
                  <p>Enter your email and we will send you a latter with instructions</p>
                </div>
                <div className="icon"></div>
              </div>
              <div className="login-form">
                <FormBuilder elements={this.state.schema} />
                <Button
                  style={{ display: 'block', textAlign: 'right' }}
                  onClick={this.sendResetPassword}
                  className="btn"
                  buttonText="Reset Password"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect(state => {
  return {
    email: state.password.email,
  };
})(PasswordReset);
