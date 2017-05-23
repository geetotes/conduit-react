import React, { Component } from 'react';
import { Button, Comment, Form, Header, Dropdown } from 'semantic-ui-react'
import * as moment from 'moment';

class NewsComment extends Component {
  constructor(props) {
  super(props);
  let us = props.users.map(z=> ({key: z._id, value: z._id, text: z.name}));
  this.state = {
    userId: us[0].value,
    commentText: '',
  };
  this.getUserbyId = this.getUserbyId.bind(this);
  this._changeText= this._changeText.bind(this);
  this._changeUser= this._changeUser.bind(this);

  }

  getUserbyId(id){
    var self = this;
    let userData;
    const user = this.props.userActions.getUsersbyId("id");
    user.once('value').then(function(snapshot) {
      userData = snapshot.val();
    });
    return userData
  }

  submitComment(e){
    e.preventDefault();
    let newComment = {title: this.state.commentText, userId: this.state.userId};
    let updateComments = this.props.item.comments || [];
    updateComments.push(newComment);
    const updateNews = Object.assign({}, this.props.item, {comments: updateComments})
    this.props.updateNews(this.props.item._id, updateNews);
  }

  _changeText(e) {
    this.setState({
      commentText: e.target.value
    });
  }

  _changeUser(e,data) {
    this.setState({
      userId: data.value
    });
  }
  render() {
    const { item, updateNews, users } = this.props;
    const usersOption = users.map(z=> ({key: z._id, value: z._id, text: z.name}));
    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        { item.comments && item.comments.map(x =>{
          const userTemp = users.filter(y => y._id === x.userId)[0];
          return (
            <Comment>
              <Comment.Content>
                <Comment.Author as='a'>{x.title} </Comment.Author>
                <Comment.Metadata>
                  <div>{moment().format('MM/DD/YYYY')}</div>
                </Comment.Metadata>
                <Comment.Text>{userTemp.name + " / " + userTemp.role }</Comment.Text>
              </Comment.Content>
            </Comment>
            )
          }
        )}

        <Form reply onSubmit={e => this.submitComment(e)}>
          <Form.TextArea onChange={this._changeText}/>
          <Form.Dropdown placeholder='Name' search selection
            options={usersOption}
            onChange={(e,data) => this._changeUser(e,data)}
            value={this.state.userId}
          />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    )
  }
}

export default NewsComment
