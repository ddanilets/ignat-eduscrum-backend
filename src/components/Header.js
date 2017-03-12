import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { logout } from '../redux/user/actions';

class Header extends React.PureComponent {

  navigateTo(address) {
    this.props.dispatch(push(`/${this.props.language}/${address}`));
  }

  render() {
    return (
      <div className="header">
        <div className="logo">IGNAT</div>
        <div className="menu">
          <div className="item" onClick={() => {
            ::this.navigateTo('project');
          }}>
            Доска
          </div>
          <div className="item" onClick={() => {
            ::this.navigateTo('user');
          }}>
            Кабинет
          </div>
          <div className="item" onClick={() => {
            ::this.props.dispatch(logout());
          }}>
            Выход
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    language: state.application.language,
  };
})(Header);
