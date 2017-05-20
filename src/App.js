import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List.js';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Today's News</h1>
        <List/>
      </div>
    );
  }
}

export default App;
