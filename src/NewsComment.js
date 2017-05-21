import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import * as moment from 'moment';
import { Dropdown } from 'semantic-ui-react'

class NewsComment extends Component {
  constructor(props) {
  super(props);
  this.state = {
    userId: '',
    commentText: '',
  };
  this.getUserbyId = this.getUserbyId.bind(this);
this._changeText= this._changeText.bind(this);
this._changeUser= this._changeUser.bind(this);

  }

  getUserbyId(id){
    console.log("id", id);

    var self = this;
    let userData;
    const user = this.props.userActions.getUsersbyId("id");
    console.log("user", user);
    console.log("getUsersbyId",  this.props.userActions.getUsersbyId);

    user.once('value').then(function(snapshot) {
      userData = snapshot.val();
      console.log("userData",  snapshot.val());

    });
    console.log("userData", userData);
    return userData
  }

  submintComment(e){
    console.log("submit",  e, this.state);

    e.preventDefault();

  }

  _changeText(e) {
    this.setState({
      commentText: e.target.value
    });
  }

  _changeUser(e) {
    console.log("dropdown", e.target.value)
    this.setState({
      userId: e.target.value
    });
  }
  render() {
    const { item, updateNews } = this.props;
    const usersOption = this.props.users.map(z=> ({key: z._id, value: z._id, text: z.name}));
    console.log(item, updateNews, "usersOption", usersOption);
    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        {item.comments&& item.comments.map(x =>{
          const userTemp = this.props.users.filter(y => y._id === x.userId)[0];
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



        <Form reply onSubmit={e => this.submintComment(e)}>
          <Form.TextArea onChange={this._changeText}/>
          <Form.Dropdown placeholder='Name' search selection
            options={usersOption}
            onChange={this._changeUser}
            value={this.state.userId}
          />

          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    )
  }
}

export default NewsComment
