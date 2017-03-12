import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const ParticipatedProjects = (props) => {
  return (<table cellSpacing="10px" className="projects-table">
    <thead><tr><th colSpan="2" className="table-header">Participated project List</th></tr></thead>
    <tbody>
    {props.data.map((el, key) => {
      return (<tr className="project-row" key={key}>
        <td className="project-name">
        <Link to={`/${props.language}/project/${el.project_id}`}>{el.project_name}</Link>
        </td>
        <td className="project-description">
        {el.position_name}
        </td>
      </tr>);
    }) }</tbody>
  </table>);
};

ParticipatedProjects.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.object,
  language: React.PropTypes.string,
};

export default connect(state => {
  return {
    data: state.user.roles,
    language: state.application.language,
  };
})(ParticipatedProjects);
