import React from 'react';
import Header from './components/Header';

class App extends React.PureComponent {

  renderHeader() {
    if (this.props.children.props.route.header) {
      return <Header/>;
    }
  }

  render() {
    return (
      <div className="application">
        {this.renderHeader()}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
