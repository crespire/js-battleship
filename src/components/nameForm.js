import React, { Component } from 'react';
import { PlayerBuilder } from '../lib/player.js';

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted name:', this.state.name);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id='name' type="text" value={this.state.name} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;