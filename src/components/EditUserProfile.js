/**
 * Created by malamud on 02.12.16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { updateName,
  updateSurname,
  updateSkype,
  updateUserData,
} from '../redux/user/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';
import { Link } from 'react-router';

const getInitialSchema = props => {
  return [
    {
      type: 'input',
      id: 'fName',
      labelText: <div className="icon">
        <svg viewBox="0 0 512 512">
          <use href="../static/icon/all.svg#avatar"></use>
        </svg>
      </div>,
      containerClassName: 'form-row',
      placeholder: 'First Name',
      value: props.name,
      onChange: (e) => {
        props.dispatch(updateName(e.target.value));
      },
    },
    {
      type: 'input',
      id: 'lName',
      labelText: <div className="icon">
        <svg viewBox="0 0 512 512">
          <use href="../static/icon/all.svg#avatar"></use>
        </svg>
      </div>,
      containerClassName: 'form-row',
      placeholder: 'Last Name',
      value: props.surname,
      onChange: (e) => {
        props.dispatch(updateSurname(e.target.value));
      },
    },
    {
      type: 'input',
      id: 'skype',
      labelText: <div className="icon">
        <svg viewBox="0 0 512 512">
          <use href="../static/icon/all.svg#social-media"></use>
        </svg>
      </div>,
      containerClassName: 'form-row',
      placeholder: 'Skype',
      value: props.skype,
      onChange: (e) => {
        props.dispatch(updateSkype(e.target.value));
      },
    },
  ];
};

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: getInitialSchema(props) };
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      schema: getInitialSchema(props),
    });
  }

  update() {
    this.props.dispatch(updateUserData());
  }

  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="logo">
              <a href="#">
                <img src="../static/img/logo.png" />
              </a>
            </div>
            <nav>
              <div className="search-form">
                <input type="text" placeholder="Search" />
                  <button className="btn btn-icon">
                    <svg viewBox="0 0 512 512">
                      <use href="../static/icon/all.svg#search"></use>
                    </svg>
                  </button>
              </div>
              <div className="logout">
                <button className="btn btn-icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../static/icon/all.svg#logout"></use>
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </header>
        <main className="profiler-page">
          <aside>
            <h2>Menu</h2>
            <ul>
              <li className="active">
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../static/icon/all.svg#avatar"></use>
                  </svg>
                </div>
                <Link to={`/${this.props.language}/user`}>
                  <span className="menu-text">Profile</span>
                </Link>
              </li>
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../static/icon/all.svg#plus"></use>
                  </svg>
                </div>
                <Link to={`/${this.props.language}/create-project`}>
                  <span className="menu-text">Add project</span>
                </Link>
              </li>
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../static/icon/all.svg#idea"></use>
                  </svg>
                </div>
                <span className="menu-text">Project</span>
              </li>
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../static/icon/all.svg#list"></use>
                  </svg>
                </div>
                <span className="menu-text">Task</span>
              </li>
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../static/icon/all.svg#bar-chart"></use>
                  </svg>
                </div>
                <span className="menu-text">Dashboard</span>
              </li>
            </ul>
          </aside>
          <article>

            <div className="register">
              <div className="register-header">
                <div className="text">
                  <h2>Edit</h2>
                  <p>Want to edit information fill out this form</p>
                </div>
                <div className="icon">

                </div>
            </div>
            <div className="register-form">
              <div className="name-rows">
                <FormBuilder elements={this.state.schema} />
              </div>
            <Button onClick={this.update} className="btn" buttonText="Save" />
              <Link to={`/${this.props.language}/user`}>Cancel</Link>
            </div>
            </div>
          </article>
        </main>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object,
};

export default connect(state => {
  return {
    data: state.user,
    language: state.application.language,
  };
})(EditUserProfile);
