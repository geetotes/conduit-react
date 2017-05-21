import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


class Home extends Component {
  render() {
    console.log("props", this.props);
    return (

      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
