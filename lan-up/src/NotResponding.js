import React, { Component } from 'react';
import './NotResponding.css';
import syncSvg from './img/sync.svg';

class NotResponding extends Component {
  
  refreshPage() { 
    window.location.reload(); 
  }

  render() {
  return (
      <div className="container">
        <img src={syncSvg} className="not-responding" alt="sync-error" />
        <h3>The server couldn't be reached.<br />Please, try again later.</h3>
        <p>or</p>
        <a className="button" href="" onClick={this.refreshPage}>Refresh</a>
      </div>
    );
  }
}

export default NotResponding;