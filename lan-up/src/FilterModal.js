import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GameInput from './GameInput';
import ServerInput from './ServerInput';
import './FilterModal.css';

class FilterModal extends Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createUrl = this.createUrl.bind(this);
    this.state = {disabler: false, server: '', game: '', url: '/'};
  }

  componentWillMount() {
  	this.setState({server: this.props.server, game: this.props.game});
  }

  /*============================================ 
      Set first url, in case user do not interact
      with the form.
    ==============================================*/
  componentDidMount() {
  	this.createUrl(this.state.server, this.state.game);
  	if (!this.state.server) {
  		this.setState({disabler: true});
  	}
  }

  /*============================================ 
      Allow close of modal and Ranking component re-render.
    ==============================================*/
  close() {
  	this.props.closeFilter();
  }

  handleInputChange(e) {
  	if(e.target.name === "server") {
	  	this.setState({server: e.target.value});
	  	this.createUrl(e.target.value, this.state.game);
	  	if (!e.target.value) {
	  		this.setState({disabler: true});
	  	}
	  	else {
	  		this.setState({disabler: false});
	  	}
	}
	else {
	  	this.setState({game: e.target.value});
	  	this.createUrl(this.state.server, e.target.value);
	}
  }

  createUrl(server, game) {
  	if (server) {
  		if (game) {
  			return this.setState({url: "/ranking/"+server+"/"+game+""});
  		}
  		else {
  			return this.setState({url: "/ranking/"+server+""});
  		}
  	}
  	return this.setState({url: "/"});
  }

  render() {

  const server = this.state.server;
  const game = this.state.game;
  const url = this.state.url;
  const inputs = this.props.inputs;
  const serversInputs = inputs.map(input => <ServerInput key={input.server} name={input.server} change={this.handleInputChange} isChecked={server} />);
  let gamesInputs;

  if (server) {
  	const currentServer = inputs.find(input => {return input.server === server});
  	const currentServerGames = currentServer.games;
  	gamesInputs = currentServerGames.map(input => <GameInput key={input} name={input} change={this.handleInputChange} isChecked={game} isDisabled={this.state.disabler} />);
  }
  else {
  	gamesInputs = null;
  }

  return (
  	<div className="filter-overlay">
      <div className="filter-modal">
      	<div className="modal-title-container">
	        <h3>Filters</h3>
	        <Link className="link confirm" to={url} onClick={close}>Confirm</Link>
        </div>
        <div className="modal-group">
	        <label className="group-title">Server</label>
	        <label className="radio"><input type="radio" value="" name="server" checked={!server} onChange={this.handleInputChange}/><span>All</span></label>
	        {serversInputs}
        </div>
        <div className="modal-group">
	        <label className="group-title">Game</label>
	        <label className="radio"><input disabled={this.state.disabler ? "disabled" : ""} type="radio" value="" name="game" checked={!game && !this.state.disabler} onChange={this.handleInputChange}/><span>All</span></label>
	        {gamesInputs}
        </div>
      </div>
    </div>
    );
  }
}

export default FilterModal;