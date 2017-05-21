import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import logo from './logo.svg';
import List from './List.js';
import Tag from './Tag.js';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  state = { tagFilters: [] }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    //this.handleItemClick = this.handleItemClick(this);
  }

  componentDidMount() {
    window.addEventListener('addTag', this.addTag, false);
    window.addEventListener('removeTag', this.addTag, false);
  }

  componentWillUnmount() {
    window.removeEventListener('addTag', this.addTag, false);
    window.removeEventListener('removeTag', this.addTag, false);
  }

  addTag(e) {
    let tags = this.state.tagFilters.concat(e.detail);
    // Remove duplicates
    let ts = tags.sort().filter((item, pos, arr) => {
      return !pos || item != arr[pos - 1];
    });

    this.setState({
      tagFilters: ts
    });
  }

  removeTag(e) {
    let tags = this.stateTagFilters.filter((t) => {
      return t !== e.detail;
    });
    this.setState({
      tagFilters: tags
    });
  }

  render() {
    const { activeItem } = this.state;
    let news = this.props.data.news;
    console.log("APP", this.props);

    let books = this.props.data.users.map((u) => {
      return {
        key: `book-list-${u._id}`,
        value: u._id,
        text: u.name,
      };
    });

    return (
      <div>
        <Menu>
          <Menu.Item header>Today's Shit</Menu.Item>
          <Menu.Item name='newest' active={activeItem === 'newest'} onClick={this.handleItemClick} />
          <Menu.Item name='hottest' active={activeItem === 'hottest'} onClick={this.handleItemClick} />
          <Menu.Item name='yesterday' active={activeItem === 'yesterday'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              {this.state.tagFilters.map((t) => {
                return <Tag key={`header-tag-for-${t}`}
                  filter={null}
                  text={t}
                  remove={null} />

              })}
            </Menu.Item>
          </Menu.Menu>
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
        <List items={news} userBooks={this.props.data.userBooks} activeItem={activeItem} newsActionsTemp={this.props.newsActionsTemp} />
      </div>
    );
  }
}

export default App;
