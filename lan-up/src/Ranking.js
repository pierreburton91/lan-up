import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Board from './Board';
import FilterModal from './FilterModal';
import Spinner from './Spinner';
import NotResponding from './NotResponding';
import NotFound from './NotFound';
import './ranking.css';

class Ranking extends Component {

  constructor(props) {
    super(props);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.state = {openModal: false, ranking: [], items: [], loading: true, serverError: false, notFound: false};
    /*============================================ 
      openModal : Defines if filter modal must be rendered or not.
      ranking : Array containing ranking data from server.
      items : Array containing list of servers and games.
      loading : Defines if spinner or content must be rendered.
      serverError : Tells if server throws error.
      notFound : Tells if the API server finds something.
    ==============================================*/
  }

  componentDidMount() {

    /*============================================ 
      Get url parameters when component mounted.
      Request data from server through Axios async request
    ==============================================*/

    const url = this.props.match.url;
    const getRankingsFromUrl = axios.get('http://localhost:4000'+url+'');
    const getServersAndGamesList = axios.get('http://localhost:4000/itemslist');

    axios.all([getRankingsFromUrl, getServersAndGamesList])
      .then(axios.spread((ranking, items) => {

        const data = ranking.data;
        const itemsList = items.data;

        this.setState({ranking: data, items: itemsList, loading: false});

      }))
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

  /*============================================ 
      Check state of openModal to open or close
      the filters modal.
  ==============================================*/
  toggleFilter() {
      if (this.state.openModal) {
        this.setState({openModal: false});
      }
      else {
        this.setState({openModal: true});
      }
  }

  render() {
    /*============================================ 
      Get states and props
    ==============================================*/
    const isLoading = this.state.loading;

    const isServerOnError = this.state.serverError;
    const isServerLost = this.state.notFound;
    let serverStatus;

    const rankingList = this.state.ranking;
    const inputs = this.state.items;

    const params = this.props.match.params;
    const server = params.server;
    const game = params.game;

    const openModal = this.state.openModal;
    let filterModal = null;

    /*============================================ 
      Initialize title and subtitle.
      Then, check for url params and set them
      to corresponding variable
    ==============================================*/
    let title = "";
    let subtitle = "";

    if (game) {
      title = server;
      subtitle = game;
    }
    else if (!game && server) {
      title = server;
      subtitle = "";
    }
    else {
      title = "Hall of Fame";
      subtitle = "";
    }

    /*============================================ 
      Check openModal's state
      to render or not the filters.
      Passing toggleFilter method to FilterModal
      in order to close himself later.
    ==============================================*/
    if (openModal) {
      filterModal = <FilterModal closeFilter={this.toggleFilter} server={server} game={game} inputs={inputs} />
    }
    else {
      filterModal = null;
    }

    /*============================================ 
      In case of Axios request error.
      Check for error type to render the proper message.
    ==============================================*/
    if (isServerLost) {
      serverStatus = <NotFound />;
    }
    else {
      serverStatus = <NotResponding />;
    }
    

    /*============================================ 
      #1 Renders loading until axios request responds.
      #2 When Axios responds, render server fail or content.
    ==============================================*/
    return (
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {isServerOnError ? (
              <div>
              {serverStatus}
              </div>
            ) : (
              <div className="container">
                <div className="title-container">
                  <h3>{title}<br/><span>{subtitle}</span></h3>
                  <button className="link filter-link" onClick={this.toggleFilter}>Filter</button>
                </div>
                <Link to="/search" className="button fab search" />
                <Board ranking={rankingList} />
                {filterModal}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Ranking;