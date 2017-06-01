import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './not-found.css';

class NotFound extends Component {
  render() {

  return (
      <div className="container">
        <h4 className="not-found">WOOPS!</h4>
        <h3>Looks like you got lost.</h3>
        <Link className="button" to="/redirect">Back</Link>
      </div>
    );
  }
}

export default NotFound;