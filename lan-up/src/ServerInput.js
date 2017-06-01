import React, { Component } from 'react';

class ServerInput extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  	this.props.change(e);
  }

  render() {
  	const name = this.props.name;
  	const isChecked = this.props.isChecked;

    return (
      <label className="radio">
      	<input type="radio" value={name} name="server" checked={isChecked === name} onChange={this.handleChange}/>
      	<span>{name}</span>
      </label>
    );
  }
}

export default ServerInput;