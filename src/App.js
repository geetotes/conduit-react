import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import logo from './logo.svg';
import List from './List.js';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    console.log("props", this.props);
    return (
      <div>
        <Menu>
          <Menu.Item header>Today's Shit</Menu.Item>
          <Menu.Item name='newest' active={activeItem === 'newest'} onClick={this.handleItemClick} />
          <Menu.Item name='hottest' active={activeItem === 'hottest'} onClick={this.handleItemClick} />
        </Menu>
        <List/>
        {/* <ExampleComponent /> */}
      </div>
    );
  }
}

export default App;
