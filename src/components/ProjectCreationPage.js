/**
 * Created by malamud on 02.12.16.
 */

import React from 'react';
import {connect} from 'react-redux';
import {updateName, updateDescription, createProject, updateDeadline} from '../redux/currentProject/actions';
import FormBuilder from './form/FormBuilder';
import Button from './form/Button';
import {Link} from 'react-router';
import DayPicker from 'react-day-picker';


const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
  'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь',
  'Декабрь'];

const WEEKDAYS_LONG = ['Воскресенье', 'Понедельник', 'Вторник',
  'Среда', 'Четверг', 'Пятница', 'Суббота'];

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];


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
    ];
};

class ProjectCreationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {schema: getInitialSchema(props), client: false};
        this.create = this.create.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            schema: getInitialSchema(props),
        });
    }

    componentDidMount() {
    }

    create() {
        this.props.dispatch(createProject());
    }

    render() {
        return (
            <div className="project-creation-page">
                <div className="wrapper wrapper-sm project-creation-form">
                    <div className="headline">
                        Создание проекта
                    </div>
                    <div className="name-rows">
                        <FormBuilder elements={this.state.schema}/>
                        <div className="calendar">
                            <DayPicker
                            selectedDays={ this.props.deadline }
                            onDayClick={(e) => {
                            this.props.dispatch(updateDeadline(e))
                            } }
                            disabledDays={ (day) => day < new Date()  }
                            locale="ru"
                            months={ MONTHS }
                            weekdaysLong={ WEEKDAYS_LONG }
                            weekdaysShort={ WEEKDAYS_SHORT }
                            firstDayOfWeek={ 1 }
                        />
                        </div>
                        <Button
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={this.create}
            className="btn registration-button"
            buttonText="Создать"
          />
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
        name: state.currentProject.name,
        description: state.currentProject.description,
        deadline: state.currentProject.deadline,
        language: state.application.language,
    };
})(ProjectCreationPage);
