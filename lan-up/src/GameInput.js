import React, { Component } from 'react';

class GameInput extends Component {

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
  	const isDisabled = this.props.isDisabled;

    return (
      <label className="radio">
      	<input type="radio" value={name} name="game" checked={isChecked === name && !isDisabled} disabled={isDisabled ? "disabled" : ""} onChange={this.handleChange}/>
      	<span>{name}</span>
      </label>
    );
  }
}

export default GameInput;