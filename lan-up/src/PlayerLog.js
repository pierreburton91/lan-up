import React, { Component } from 'react';

class PlayerLog extends Component {

  render() {
  const data = this.props.data;
  const logs = data.map(log => <div className="log-container" key={log.server + log.game + log.session}>
		  							<div className="log-server">{log.server}</div>
		  							<div className="log-game">{log.game}</div>
		  							<div className="log-session">Session: {log.session}</div>
	  								<div className="log-score"><span>Score:</span> {log.score}</div>
  								</div>);
  return (
      <div>
        {logs}
      </div>
    );
  }
}

export default PlayerLog;