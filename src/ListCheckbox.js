import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image, Label, Dropdown, Icon, Checkbox } from 'semantic-ui-react'
import BookTags from './BookTags.js';
import './App.css';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import {  database, newsActions, userActions} from './FirebaseService';

class ListCheckbox extends Component {

  constructor(props) {
    super(props);
    // let userArticleData = {};
    // let userArticle=[];
    // const self = this;
    // database.ref('userArticle').once("value")
    //   .then(function(snapshot) {
    //     userArticleData = snapshot.val(); // 1 ("name")
    //     userArticle = userArticleData ? Object.keys(userArticleData).map(key => userArticleData[key]) : [];
    //     self.state = {
    //       userArticleData: userArticleData,
    //       checked: userArticle.filter(x => (x.newsId === self.props.news._id && x.userId === self.props.selectedBook )).length > 0,
    //     }
    //   });
    this.state = {
      userArticleData: {},
      checked: false
    }
    // console.log("checked ---", this.state.checked);
    this.checkBooked = this.checkBooked.bind(this);
  }

  componentWillMount(){
    let userArticleData = {};
    let userArticle=[];
    const self = this;
    database.ref('userArticle').once("value")
      .then(function(snapshot) {
        userArticleData = snapshot.val(); // 1 ("name")
        userArticle = userArticleData ? Object.keys(userArticleData).map(key => userArticleData[key]) : [];
        self.setState({
          userArticleData: userArticleData,
          checked: userArticle.filter(x => (x.newsId === self.props.news._id && x.userId === self.props.selectedBook )).length > 0,
        });
      });
  }

  checkBooked(e, data, news){
    e.preventDefault();
    this.setState({checked: data.checked });
    console.log(data.checked);
    if(data.checked){
      let allData = this.state.userArticleData || [];
      newsActions.adduserArticle({userId: this.props.selectedBook, newsId: news._id, order: 1 });
      console.log("ADD");

    }else{
      const selectedArtices = this.state.userArticleData;
      for (var tempProps in selectedArtices) {
        if(selectedArtices[tempProps].userId === this.props.selectedBook && selectedArtices[tempProps].newsId === news._id){
          console.log("Found", tempProps);
          newsActions.removeUserArticle(tempProps);
        }
      }
    }
  }


  render() {
    const { items, news, userBooks } = this.props;
    const { userArticleData, checked } = this.state;
    let userArticle = userArticleData ? Object.keys(userArticleData).map(key => userArticleData[key]) : [];
    return (
      <Checkbox
        checked={checked}
        label={{ children: 'Select' }}
        onChange={(e,data) => this.checkBooked(e, data, this.props.news)} />
    );
  }
}

export default ListCheckbox;
