/**
 * Created by malamud on 02.12.16.
 */

import React from 'react';
import {connect} from 'react-redux';
import {updateName,
    updateDescription,
    updateAssignee,
    updateEstimate,
    updatePriority,
    updateProjectId,
    updateTicket} from '../redux/ticket/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';
import {Link} from 'react-router';

const getInitialSchema = props => {
    return [
        {
            type: 'input',
            id: 'name',
            labelText: null,
            placeholder: 'Название',
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
            placeholder: 'Описание',
            containerClassName: 'form-row',
            value: props.description,
            onChange: (e) => {
                props.dispatch(updateDescription(e.target.value));
            },
        },
        {
            type: 'input',
            id: 'estimate',
            labelText: null,
            placeholder: 'Относительная оценка',
            containerClassName: 'form-row',
            value: props.estimate,
            onChange: (e) => {
                props.dispatch(updateEstimate(e.target.value));
            },
        },
        {
            type: 'input',
            id: 'priority',
            labelText: null,
            placeholder: 'Приоритет',
            containerClassName: 'form-row',
            value: props.priority,
            onChange: (e) => {
                props.dispatch(updatePriority(e.target.value));
            },
        },
        {
            type: 'select',
            id: 'assignee',
            value: props.assignee,
            labelText: 'Исполнитель',
            containerClassName: 'form-row',
            options: props.users.map(el => {
                return {
                    value: el.id,
                    text: `${el.first_name} ${el.last_name}(${el.user.username})`,
                }
            }),
            onChange: (e) => {
                props.dispatch(updateAssignee(e.target.value));
            },
        },
        {
            type: 'select',
            id: 'project',
            value: props.projectId,
            labelText: 'Проект',
            containerClassName: 'form-row',
            options: props.projects.map(el => {
                return {
                    value: el.id,
                    text: el.name,
                }
            }),
            onChange: (e) => {
                props.dispatch(updateProjectId(e.target.value));
            },
        },
    ];
};

class ProjectCreationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {schema: getInitialSchema(props), client: false};
        this.update = this.update.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            schema: getInitialSchema(props),
        });
    }

    componentDidMount() {
    }

    update() {
        this.props.dispatch(updateTicket());
    }

    render() {
        return (
            <div className="project-creation-page">
                <div className="wrapper wrapper-sm project-creation-form">
                    <div className="headline">
                        Редактирование задачи
                    </div>
                    <div className="name-rows">
                        <FormBuilder elements={this.state.schema}/>
                        <Button
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={this.update}
            className="btn registration-button"
            buttonText="Сохранить"
          />
                        <div className="attachments">
                            {this.props.attachments.map((el, key) => {
                                return (
                                    <div className="attachment" key={key}>
                                        <div className="icon"/>
                                        <div className="link">{el.link}</div>
                                        <div className="delete" onClick={() => {
                                            this.removeAttachment(el.id)
                                        }}>x</div>
                                    </div>
                                );
                            })}
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

ProjectCreationPage.propTypes = {
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
        attachments: state.ticket.attachments,
        projects: state.projects.projects,
        users: state.user.users,
        language: state.application.language,
    };
})(ProjectCreationPage);
