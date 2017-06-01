import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import NotResponding from './NotResponding';
import NotFound from './NotFound';
import PlayerLog from './PlayerLog';
import './PlayerProfile.css';

class PlayerProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true, serverError: false, notFound: false, userData: []};
  }

  componentDidMount() {
    const player = this.props.match.params.user;
    axios.get('http://localhost:4000/player/'+player+'')
      .then(res => {
          this.setState({loading: false, userData: res.data});
        })
      .catch(err => {
          this.setState({loading: false, serverError: true});

          if(err.response) {

            this.setState({notFound: true});

          }
          else if (err.request) {
          }
          else {
          }
        });
  }

  render() {
    const isLoading = this.state.loading;
    const isServerOnError = this.state.serverError;
    const isServerLost = this.state.notFound;
    let serverStatus;

    const player = this.props.match.params.user;
    const playerData = this.state.userData;

    if (isServerLost) {
      serverStatus = <NotFound />;
    }
    else {
      serverStatus = <NotResponding />;
    }

    return (
      <div className="container">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {isServerOnError ? (
              <div>
                {serverStatus}
              </div>
            ) : (
              <div>
                <div className="title-container">
                  <h3>{player}</h3>
                </div>
                <PlayerLog data={playerData} />
                <Link to="/search" className="button fab search" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PlayerProfile;