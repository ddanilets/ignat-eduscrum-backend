import React from 'react';
import Login from './Login';
import VisibilitySensor from 'react-visibility-sensor';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      books: '',
      ignatName: '',
      booksHard: '',
      time: '',
      solution: '',
    };
  }
  renderLoginForm() {
    return (
      <div className="login-container">
        <Login />
      </div>
    );
  }

  handleBooks(isVisible, key, delay=0) {
    const newState = {};
    newState[key] = isVisible ? 'mounted' : '';
    setTimeout(() => {
      this.setState(newState);
    }, delay);
  }

  renderBody() {
    return (
      <div className="ignat-container">
        <div className="section">
          <VisibilitySensor scrollDelay={0} onChange={(isVisible) => {
          ::this.handleBooks(isVisible, 'books');
          }} partialVisibility={true}>
            <div className={`books ${this.state.books}`}/>
          </VisibilitySensor>
          <div className="ignat" />
          <div className="clock" />
          <VisibilitySensor scrollDelay={0} onChange={(isVisible) => {
          ::this.handleBooks(isVisible, 'ignatName', 1000);
          }} partialVisibility={true}>
            <div className={`line ignat-name ${this.state.ignatName}`}>Игнат</div>
          </VisibilitySensor>
          <VisibilitySensor scrollDelay={0} onChange={(isVisible) => {
          ::this.handleBooks(isVisible, 'booksHard', 1000);
          }} partialVisibility={true}>
            <div className={`line books-hard ${this.state.booksHard}`}>Гранит науки</div>
          </VisibilitySensor>
          <VisibilitySensor scrollDelay={0} onChange={(isVisible) => {
          ::this.handleBooks(isVisible, 'time', 1000);
          }} partialVisibility={true}>
            <div className={`line time-ticks ${this.state.time}`}>Время</div>
          </VisibilitySensor>
        </div>
        <div className="section">
          <div className="ignat-with-books" />
          <VisibilitySensor scrollDelay={0} onChange={(isVisible) => {
          ::this.handleBooks(isVisible, 'solution', 1000);
          }} partialVisibility={true}>
            <div className={`line solution ${this.state.solution}`}>Решение</div>
          </VisibilitySensor>
        </div>
        <div className="section">
          <div className="footnote">
            <div className="footnote-headline">IGNAT</div>
            <div className="footnote-description">
              Сервис, позволяющий школам и другим образовательным учреждениям эффективнее отслеживать и работать над учебным процессом on-line
            </div>
          </div>
          <div className="flying-ignat" />
          <div className="books-stand" />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="home-body">
        {this.renderBody()}
        {this.renderLoginForm()}
      </div>
    )
  }
}

export default Home;