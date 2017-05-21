import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import logo from './logo.svg';
import List from './List.js';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    let news = this.props.news;
    if (news === undefined) {
      alert('Error with firebase -- news is undefined');
      return;
    }

    if (this.props.users === undefined) {
      alert('Error with firebase -- users are undefined');
      return;
    }

    let books = this.props.users.map((u) => {
      return {
        key: `book-list-${u._id}`,
        value: u._id,
        text: u.name,
      };
    });


    console.log("props", this.props);
    return (
      <div>
        <Menu>
          <Menu.Item header>Today's Shit</Menu.Item>
          <Menu.Item name='newest' active={activeItem === 'newest'} onClick={this.handleItemClick} />
          <Menu.Item name='hottest' active={activeItem === 'hottest'} onClick={this.handleItemClick} />
          <Menu.Item name='yesterday' active={activeItem === 'yesterday'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Dropdown 
                placeholder='Book'
                multiple
                search
                selection
                options={books} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <List items={news} activeItem={activeItem}/>
        {/* <ExampleComponent /> */}
      </div>
    );
  }
}

export default App;
