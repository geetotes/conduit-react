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
    this._r = this._r.bind(this);
    this._nullFunc = this._nullFunc.bind(this);
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
    let tags = this.state.tagFilters.filter((t) => {
      return t !== e.detail;
    });
    this.setState({
      tagFilters: tags
    });
  }

  _r(tag) {
    let tags = this.state.tagFilters.filter((t) => {
      return t !== tag;
    });
    this.setState({
      tagFilters: tags
    });
  }

  _nullFunc(t) {
    //do nothing
  }

  render() {
    const { activeItem } = this.state;
    let news = this.props.data.news;
    console.log("APP", this.props);

    let books = this.props.data.userBooks.map((u) => {
      return {
        key: `book-list-${u._id}`,
        value: u._id,
        text: u.fullName,
      };
    });

    if (this.state.tagFilters.length > 0) {
      let filters = this.state.tagFilters;
      news = news.filter((n) => {
        if (n.tags !== undefined) {
          let matchCount = n.tags.filter((nn) => filters.includes(nn));
          return matchCount.length > 0;
        } else {
          return false;
        }
      });
    }

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
                  filter={this._nullFunc}
                  text={t}
                  remove={this._r} />

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
