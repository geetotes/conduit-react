import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import logo from './logo.svg';
import List from './List.js';
import Tag from './Tag.js';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  state = {
    tagFilters: [] ,
    bookVal: '',
    selectedBook: null,
    selectDisabled: false
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.changeBook = this.changeBook.bind(this);
    this._r = this._r.bind(this);
    this._nullFunc = this._nullFunc.bind(this);
    this.selectDisabled = this.selectDisabled.bind(this);
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
      selectedBook: tags
    });
  }

  changeBook(e, data) {
    let t = e.target.textContent;
    if (t === 'All Books') {
      t = null;
    }

    this.setState({
      selectedBook: t
    });
    this.setState({bookVal: data.value})

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
  }

  selectDisabled(e) {
    e.preventDefault;
    let selectDisabled = this.state.selectDisabled;
    this.setState({
      selectDisabled: !selectDisabled
    });
    alert('Book sent!');
  }

  render() {
    const { activeItem, bookVal } = this.state;
    let news = this.props.data.news;

    let books = this.props.data.userBooks.map((u) => {
      return {
        key: `book-list-${u._id}`,
        value: u._id,
        text: u.fullName,
      };
    });

    books.unshift ({
      key: 'book-list-allbooks',
      value: null,
      text: 'All Books'
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

    if (this.state.selectedBook !== null) {
      let book = books.filter((b) => {
        return b.text === this.state.selectedBook
      });

      let _id = book[0].value;
      news = news.filter((n) => {
        if (n.userBooks === undefined) {
          return false;
        } else {
          let matches = n.userBooks.filter((ubs) => {
            return ubs === _id;
          });
          return matches.length > 0;
        }
      });
    }

    if (activeItem === 'newest') {
      news = news.sort((a, b) => {
        return (new Date(b.publishedAt) - new Date(a.publishedAt));
      });
    }

    if (activeItem === 'oldest') {
      news = news.sort((a, b) => {
        return (new Date(a.publishedAt) - new Date(b.publishedAt));
      });
    }

    const popularActive = (news) => {
      var results = {};
      for (var i = 0; i < news.length; i++) {
        const everyTagsOnNews = news[i].tags || [];
        for (var j = 0; j < everyTagsOnNews.length; j++) {
          if(results[everyTagsOnNews[j]]){
            results[everyTagsOnNews[j]]++ ;
          }else{
            results[everyTagsOnNews[j]] = 1;
          }
        }
      }
      console.log("result", results);
       const tempResult = Object.keys(results).map((key) => ({count: results[key], value: key})) || [];
       console.log("tempResult", tempResult);

      return tempResult;
    }

    return (
      <div>
        <Menu>
          <Menu.Item header>Today's News</Menu.Item>
          <Menu.Item name='newest' active={activeItem === 'newest'} onClick={this.handleItemClick} />
          <Menu.Item name='oldest' active={activeItem === 'oldest'} onClick={this.handleItemClick} />
          <Menu.Item name='sent' active={activeItem === 'sent'} onClick={this.handleItemClick} />
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
                search
                selection
                onChange={(e, data) => this.changeBook(e, data)}
                options={books} />
            </Menu.Item>
            <Menu.Item>
              <Button
                icon='send'
                disable={bookVal}
                onClick={this.selectDisabled}
                className="snedButton"/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {/* {popularActive(this.props.data.news).map((x, tempIndex)=>
          <Tag
            key={`overall-for-${tempIndex}`}
            text={x.value + " " + x.count}/>
          )} */}
        <List
          selectedBook={this.state.bookVal}
          selectDisabled={this.state.selectDisabled}
          items={news}
          userArticle={this.props.data.userArticle}
          userBooks={this.props.data.userBooks}
          activeItem={activeItem}
          newsActionsTemp={this.props.newsActionsTemp} />
      </div>
    );
  }
}

export default App;
