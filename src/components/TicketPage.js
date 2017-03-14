/**
 * Created by malamud on 02.12.16.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class TicketPage extends React.PureComponent {

    static contextTypes = {
    router: React.PropTypes.object,
  };

    render() {
        if (!this.props.tickets || !this.props.users || !this.props.projects || !this.props.id) {
            return null;
        }

        const ticket = this.props.tickets.filter(ticket => ticket.id === this.props.id)[0];
        return (
            <div className="ticket-page">
                <div className="wrapper wrapper-sm ticket-fields">
                    <div className="headline">
                        {this.props.name}
                    </div>
                    <div className="description">
                        {this.props.description}
                    </div>
                    <div className="priority">
                        <div className="priority-label">Приоритет</div>
                        <div className="priority-value">{this.props.priority}</div>
                    </div>
                    <div className="priority">
                        <div className="priority-label">Оценка</div>
                        <div className="priority-value">{this.props.estimate}</div>
                    </div>
                    <div className="creator">
                        <div className="creator-label">Создатель</div>
                        <div className="creator-name">{ticket.creator.user.username}</div>
                    </div>
                    <div className="project">
                        <div className="project-label">Проект</div>
                        <div className="project-name">{ticket.project.name}</div>
                    </div>
                    <div className="assignee">
                        <div className="assignee-label">Исполнитель</div>
                        <div className="assignee-name">{ticket.assignee.user.username}</div>
                    </div>
                    <div className="controls">
                        <div className="edit-link">
                          <Link to={`/${this.props.language}/ticket/${this.props.id}/edit`}>Редактировать</Link>
                        </div>
                        <div className="back-link" onClick={this.context.router.goBack}>Назад</div>
                    </div>
                </div>
            </div>
        );
    }
}

TicketPage.propTypes = {
    dispatch: React.PropTypes.func,
};

export default connect(state => {
    return {
        name: state.ticket.name,
        description: state.ticket.description,
        estimate: state.ticket.estimate,
        priority: state.ticket.priority,
        projectId: state.ticket.projectId,
        assignee: state.ticket.assignee,
        id: state.ticket.id,
        attachments: state.ticket.attachments,
        projects: state.projects.projects,
        users: state.user.users,
        tickets: state.tickets.tickets,
        language: state.application.language,
    };
})(TicketPage);
