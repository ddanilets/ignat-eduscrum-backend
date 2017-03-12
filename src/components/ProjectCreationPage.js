/**
 * Created by malamud on 02.12.16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { updateName, updateDescription, createProject } from '../redux/currentProject/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';
import { Link } from 'react-router';

const getInitialSchema = props => {
  return [
    {
      type: 'input',
      id: 'name',
      labelText: null,
      placeholder: 'Project name',
      containerClassName: 'form-row',
      value: props.name,
      onChange: (e) => {
        props.dispatch(updateName(e.target.value));
      },
    },
    {
      type: 'input',
      id: 'description',
      labelText: null,
      placeholder: 'Project description',
      containerClassName: 'form-row',
      value: props.description,
      onChange: (e) => {
        props.dispatch(updateDescription(e.target.value));
      },
    },
  ];
};

class ProjectCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: getInitialSchema(props) };
    this.create = this.create.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      schema: getInitialSchema(props),
    });
  }

  create() {
    this.props.dispatch(createProject());
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
                <button className="btn btn-icon" onClick={this.logout}>
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
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../static/icon/all.svg#avatar"></use>
                  </svg>
                </div>
                <Link to={`/${this.props.language}/user`}>
                  <span className="menu-text">Profile</span>
                </Link>
              </li>
              <li className="active">
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
              <div className="user-view-header">
                <div className="icon">

                </div>
                <div className="text">
                  <h2>Project creation</h2>
                  <p>Fill this form to create a project</p>
                </div>
              </div>
              <div className="register-form">
                <div className="name-rows">
                  <FormBuilder elements={this.state.schema} />
                   <Button
                   style={{ display: 'block', textAlign: 'right' }}
                   onClick={this.create}
                   className="btn"
                   buttonText="Create"
                   />
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }
}

ProjectCreationPage.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect(state => {
  return {
    name: state.currentProject.name,
    description: state.currentProject.description,
    language: state.application.language,
  };
})(ProjectCreationPage);
