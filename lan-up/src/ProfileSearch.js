import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Spinner from './Spinner';
import DataList from './DataList';
import './ProfileSearch.css';

class ProfileSearch extends Component {

  constructor(props) {
  	super(props);
  	this.loadDataList = debounce(this.loadDataList.bind(this), 500);
  	this.loadDataListDelayed = this.loadDataListDelayed.bind(this);
  	this.handleChange = this.handleChange.bind(this);
  	this.handleClickOnDataList = this.handleClickOnDataList.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.state = {loading: false, search: '', dataListValue: [], shouldLoadDataList: false};
  }

  loadDataList(e) {
  	const value = e.target.value;
 	if (value) {
	  	axios.get('http://localhost:4000/datalist/'+value)
	  		.then(res => {
	  			this.setState({dataListValue: res.data, loading: false, shouldLoadDataList: true});
	  		})
	  		.catch(err => {

	        	this.setState({loading: false});

	        if(err.response) {
	        }
	        else if (err.request) {
	        }
	        else {
	        }
	      });
  	}
  }

  loadDataListDelayed(e) {
  	e.persist();
  	this.loadDataList(e);
  }

  handleChange(e) {
  	this.setState({loading: true, shouldLoadDataList: false, search: e.target.value});
  }

  handleClickOnDataList(e) {
  	this.setState({shouldLoadDataList: false, search: e.target.innerHTML});
  	document.querySelector('input[type="text"]').focus();
  }

  handleSubmit(e) {
  	this.props.history.push('/player-profile/'+this.state.search);
  	e.preventDefault();
  }

  render() {

  const search = this.state.search;
  const loading = this.state.loading;
  const shouldLoadDataList = this.state.shouldLoadDataList;
  const toDataList = this.state.dataListValue;
  let datalist = null;

  if (!search || !shouldLoadDataList) {
  	datalist = null;
  }
  if (search && loading) {
  	datalist = <Spinner />;
  }
  if (search && !loading && shouldLoadDataList) {
  	datalist = <DataList click={this.handleClickOnDataList} data={toDataList} />;
  }

  return (
      <div className="container">
      	<div className="search-box-container">
      		<div className="title-container">
      			<h3>Search for a player</h3>
      		</div>
      		<div className="search-box">
      			<form onSubmit={this.handleSubmit} >
	        	<input type="text" autoFocus placeholder="Username" name="username" className="search-bar" value={search} onKeyUp={this.loadDataListDelayed} onChange={this.handleChange} autoComplete="off"/>
	        	<input type="submit" className="search-submit" value="" />
	        	</form>
        	</div>
        	{datalist}
        </div>
      	<Link to="/" className="button fab home" />
      </div>
    );
  }
}

export default ProfileSearch;