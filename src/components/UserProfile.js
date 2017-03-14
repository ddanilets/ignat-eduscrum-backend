import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

class UserProfile extends React.PureComponent {

  renderTickets() {
    const data = {};
    this.props.tickets
      .filter(ticket => parseInt(ticket.creator.id, 10) === parseInt(this.props.data.id, 10)
      || parseInt(ticket.assignee.id, 10) === parseInt(this.props.data.id, 10))
      .map(ticket => {
        return {
          project: ticket.project.name,
          projectId: ticket.project.id,
          ticket: ticket.name,
          id: ticket.id,
        };
      })
      .forEach(ticket => {
        if (data[ticket.projectId]) {
          data[ticket.projectId].tickets.push({
            name: ticket.ticket,
            id: ticket.id,
          });
        } else {
          data[ticket.projectId] = {
            tickets: [{name: ticket.ticket, id: ticket.id}],
            project: ticket.project,
          }
        }
      })
    return Object.keys(data)
      .map(key => data[key])
      .map((project, key) => {
        return (
          <div className="project" key={key}>
            <div className="project-name">{project.project}</div>
            <div className="tickets">
              {project.tickets.map((ticket, id) => {
                return (
                  <div className="ticket" key={id}>
                    <Link to={`/${this.props.language}/ticket/${ticket.id}`}>{ticket.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
  }

  renderProjects() {
    return this.props.projects
      .filter(project => parseInt(project.user.id, 10) === parseInt(this.props.data.id, 10))
      .map(project => {
        return {
          name: project.name,
          id: project.id,
        };
      }).map((project, key) => {
        return (
          <div className="project" key={key}>
            <Link to={`/${this.props.language}/project/${project.id}`}>
              {project.name}
            </Link>
          </div>
        );
      });
  }

  render() {
    return (
      <div className="user-page">
        <div className="section-background">
          <div className="avatar" />
        </div>
        <div className="wrapper">
          <div className="name">{this.props.data.firstName}</div>
          <div className="surname">{this.props.data.lastName}</div>
          <div className="activity">
            <div className="projects">
              <div className="headline">
                Мои проекты
              </div>
              <div className="projects-list">
                {this.renderProjects()}
              </div>
            </div>
            <div className="tickets-container">
                <div className="headline">
                  Мои задачи
                </div>
              <div className="tickets-list">
                {this.renderTickets()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object,
  language: React.PropTypes.string,
};

export default connect(state => {
  return {
    data: state.user,
    language: state.application.language,
    projects: state.projects.projects,
    tickets: state.tickets.tickets,
  };
})(UserProfile);
