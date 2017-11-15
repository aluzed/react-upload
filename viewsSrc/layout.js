import React from 'react';
import { Link } from 'react-router-dom';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <img className="logo" src="/views/img/logo.png"/>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            React Client Sample.
          </p>
        </footer>
      </div>
    );
  }
}
