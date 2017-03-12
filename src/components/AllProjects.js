import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const AllProjects = (props) => {
  return (<table cellSpacing="10px" className="projects-table">
    <thead><tr><th colSpan="3" className="table-header">Own project list</th></tr></thead>
    <tbody>
    {props.data.map((el, key) => {
      return (<tr className="project-row" key={key}>
        <td className="project-name">
        <Link to={`/${props.language}/project/${el.id}`}>{el.name}</Link>
        </td>
        <td className="project-description">
        {el.description}
        </td>
        <td>
          {props.roles.filter(role => role.project_id === el.id)[0] ?
            props.roles.filter(role => role.project_id === el.id)[0].position_name
          : null}
        </td>
      </tr>);
    }) }</tbody>
  </table>);
};

AllProjects.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object,
  language: React.PropTypes.string,
};

export default connect(state => {
  return {
    data: state.projects.projects,
    language: state.application.language,
    roles: state.user.roles,
  };
})(AllProjects);
