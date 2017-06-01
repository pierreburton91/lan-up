import React, { Component } from 'react';
import './player-score.css';

class PlayerScore extends Component {
  render() {
    return (
      <div className="score-container">
        <div className="ranking">{this.props.position}</div>
        <div className="nickname">{this.props.name}</div>
        <div className="score">{this.props.score}</div>
      </div>
    );
  }
}

export default PlayerScore;