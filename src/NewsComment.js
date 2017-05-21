import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import * as moment from 'moment';

class NewsComment extends Component {
  constructor(props) {
  super(props);
  this.getUserbyId = this.getUserbyId.bind(this);
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
  render() {
    const { item, updateNews } = this.props;
    console.log(item, updateNews);
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
                {/* <Comment.Text>{x._id}</Comment.Text> */}

                <Comment.Text>{userTemp.name + " / " + userTemp.role }</Comment.Text>
              </Comment.Content>
            </Comment>
            )
          }
        )}



        <Form reply onSubmit={e => e.preventDefault()}>
          <Form.TextArea />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    )
  }
}

export default NewsComment
