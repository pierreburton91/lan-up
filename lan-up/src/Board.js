import React, { Component } from 'react';
import PlayerScore from './PlayerScore';

class Board extends Component {
  render() {
    const users = this.props.ranking;
    let i = 1;
    const scores = users.map((user) => <PlayerScore key={user.name} position={i++} name={user.name} score={user.score} />);

    return (
      <div>
        {scores}
      </div>
    );
  }
}

export default Board;