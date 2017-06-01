import React, { Component } from 'react';
import './App.css';
import AppRoutes from './AppRoutes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>LAN-UP</h1>
          <h2>Your LAN party rankings</h2>
        </div>
        <AppRoutes />
        <div className="App-footer">
          <ul>
            <li><p>Created by <a href="http://pierre-burton.be">Pierre Burton</a></p></li>
            <li><p>Powered by <a href="https://facebook.github.io/react/">React</a></p></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;