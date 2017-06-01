import React, { Component } from 'react';

class DataList extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.click(e);
  }

  render() {

    const users = this.props.data;
    const items = users.map(item => <div key={item} onClick={this.handleClick} className="datalist-item">{item}</div>);

    return (
      <div className="search-datalist">
        <div className="datalist-title">Do you mean ?</div>
        {items}
      </div>
    );
  }
}

export default DataList;