import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


class MainPage extends Component {
  render() {
    console.log("props", this.props);
    return (

      <div>
        <h1>MainPage</h1>
      </div>
    );
  }
}

export default MainPage;
