import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List.js';

class App extends Component {
  render() {
    console.log("props", this.props);
    return (

      <div>
        <h1>Today's News</h1>
        <List/>
        {/* <ExampleComponent /> */}
      </div>
    );
  }
}

export default App;
