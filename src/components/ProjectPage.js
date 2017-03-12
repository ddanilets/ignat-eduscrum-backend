import React from 'react';
import { connect } from 'react-redux';
import { removeMilestone,
  addMilestone as addMs,
  addDev as addDevToProject,
  removeDev as removeDevFromProject,
} from '../redux/currentProject/actions';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Select from 'react-select';
import Button from './form/Button';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderMilestones = this.renderMilestones.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.deleteMilestone = this.deleteMilestone.bind(this);
    this.addMilestone = this.addMilestone.bind(this);
    this.renderAddMilestone = this.renderAddMilestone.bind(this);
    this.createTask = this.createTask.bind(this);
    this.renderDevTeam = this.renderDevTeam.bind(this);
    this.addDev = this.addDev.bind(this);
    this.removeDev = this.removeDev.bind(this);
    this.state = { name: null, description: null, selectedDev: null, position: null };
  }

  deleteMilestone(id) {
    return () => {
      this.props.dispatch(removeMilestone(id));
    };
  }

  addMilestone() {
    this.props.dispatch(addMs({ name: this.state.name, description: this.state.description }));
  }

  renderMilestones() {
    return this.props.data.milestones.map((el, key) => {
      return (<div key={key}>
        {`${el.name} ${el.description}`} <span onClick={this.deleteMilestone(el.id)}>[x]</span>
      </div>);
    });
  }

  renderAddMilestone() {
    return (<div>
      <div>
      Name <input
        type="text"
        value={this.state.name}
        onChange={(e) => {
          this.setState({ name: e.target.value });
        }}
      />
      </div>
      <br/>
      <div>
      Description <input
        value={this.state.description}
        onChange={(e) => {
          this.setState({ description: e.target.value });
        }}
      />
      </div>
      <br/>
      <button onClick={this.addMilestone}>add new milestone</button>
    </div>);
  }

  createTask() {
    this.props.dispatch(push(`/${this.props.language}/task-creation`));
  }

  renderTasks() {
    return (<div>
      {this.props.data.tasks.map((el, key) => {
        return <div key={key}>{`${el.name} ${el.description}`}</div>;
      })}
      <button onClick={this.createTask}>Create new task</button>
    </div>);
  }

  renderDevTeam() {
    return (<div>
      <table>
        <thead>
        <tr>
          <td colSpan="3">Project members</td>
        </tr>
        </thead>
        <tbody>
        {this.props.data.actors.map((member, key) => {
          return (<tr key={key}>
            <td>{member.username}</td>
            <td>{member.position_name}</td>
            <td onClick={() => {
              this.removeDev(member.id);
            }}
            >Delete</td>
          </tr>);
        })}
        </tbody>
      </table>
      <div>Select developer <div style={{ display: 'inline-block', width: '200px' }}>
      <Select value={this.state.selectedDev}
        onChange={(e) => {
          this.setState({ selectedDev: e });
        }}
        options={this.props.data.users.map((user) => {
          return { label: user.username, value: user.id };
        })}
      />
    </div>
      </div>
      <div>
      Enter role <input
        value={this.state.position}
        onChange={(e) => {
          this.setState({ position: e.target.value });
        }}
      />
      </div>
      <Button buttonText="Add" onClick={this.addDev} disabled={!this.state.selectedDev} />

    </div>);
  }

  addDev() {
    this.props.dispatch(addDevToProject(this.state.selectedDev.value, this.state.position));
  }

  removeDev(id) {
    this.props.dispatch(removeDevFromProject(id));
  }

  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="logo">
              <a href="#">
                <img src="../../static/img/logo.png" />
              </a>
            </div>
            <nav>
              <div className="search-form">
                <input type="text" placeholder="Search" />
                <button className="btn btn-icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../../static/icon/all.svg#search"></use>
                  </svg>
                </button>
              </div>
              <div className="logout">
                <button className="btn btn-icon" onClick={this.logout}>
                  <svg viewBox="0 0 512 512">
                    <use href="../../static/icon/all.svg#logout"></use>
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
                    <use href="../../static/icon/all.svg#avatar"></use>
                  </svg>
                </div>
                <Link to={`/${this.props.language}/user`}>
                  <span className="menu-text">Profile</span>
                </Link>
              </li>
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../../static/icon/all.svg#plus"></use>
                  </svg>
                </div>
                <Link to={`/${this.props.language}/create-project`}>
                  <span className="menu-text">Add project</span>
                </Link>
              </li>
              <li className="active">
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../../static/icon/all.svg#idea"></use>
                  </svg>
                </div>
                <span className="menu-text">Project</span>
              </li>
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../../static/icon/all.svg#list"></use>
                  </svg>
                </div>
                <span className="menu-text">Task</span>
              </li>
              <li>
                <div className="icon">
                  <svg viewBox="0 0 512 512">
                    <use href="../../static/icon/all.svg#bar-chart"></use>
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
                  <h2>Project {this.props.data.name}</h2>
                  <p>{this.props.data.description}</p>
                </div>
              </div>
              <div className="register-form">
                <div className="name-rows">
                Milestones: {this.renderMilestones()}
                  <br />
                {this.renderAddMilestone()}
                  <br />
                Dev team: {this.renderDevTeam()}
                {/* this.renderTasks()*/}
                <Link to={`/${this.props.language}/user`}>Return to user dashboard</Link>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }
}

ProjectPage.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object,
  language: React.PropTypes.string,
};

export default connect(state => {
  return {
    data: state.currentProject,
    language: state.application.language,
  };
})(ProjectPage);
