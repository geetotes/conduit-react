import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image, Label, Dropdown, Icon, Checkbox } from 'semantic-ui-react'
import BookTags from './BookTags.js';
// import { Grid, Image, Label, Dropdown, Icon } from 'semantic-ui-react'
import './App.css';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

class List extends Component {
  state = {
    isChecked: false,
}
  constructor(props) {
    super(props);
    this.checkBooked = this.checkBooked.bind(this);
    this.getUserTagByName = this.getUserTagByName.bind(this);
  }

  checkBooked(e, data, news){
    console.log("checked", data);
    this.setState({isChecked: !this.state.isChecked});
    if(this.state.isChecked){
      this.props.newsActionsTemp.adduserArticle({userId: this.props.selectedBook, newsId: data._id, order: 1 });
    }else{
      // this.props.find
    }
  }
  getUserTagByName(d){
    const userbookTags = d.userBooks? d.userBooks.map((x) => {
      return this.props.userBooks.filter(y => y._id === x)[0].fullName;
    }) : [];
    console.log("userbookTags", userbookTags)
    return userbookTags;
  }
  render() {
    let items = this.props.items;
    const newsActions = this.props.newsActionsTemp;
    let feedback = null;
    if (this.props.activeItem === 'yesterday') {
      let options = [
        {
          key: 1,
          value: 'good',
          text: 'Useful',
          content: <Icon name='smile' color='green'/>
        },
        {
          key: 2,
          value: 'meh',
          text: 'Meh',
          content: <Icon name='meh' color='grey'/>
        },
        {
          key: 3,
          value: 'bad',
          text: 'Useless',
          content: <Icon name='frown' color='red'/>
        }
      ];
      feedback = (
        <Dropdown style={{float: 'right'}} selection options={options} placeholder='Feedback' />
      );
    }

    const userBooks = this.props.userBooks;
    let now = moment();

    return (
      <Grid celled>
        {items.map((d,i) => {
          const userbookTags = d.userBooks? d.userBooks.map((x) => {
            return userBooks.filter(y => y._id === x)[0].fullName;
          }) : [];
          // console.log("news", d._id, "userbooks", d.userBooks, userbookTags);
          return (
            <Grid.Row key={`grid-item-${i}`}>
              <Grid.Column width={3}>
                <Image src={d.urlToImage}/>
              </Grid.Column>
              <Grid.Column width={13}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Label as='a' color={now.diff(moment(d.publishedAt), 'hours') > 24 ? 'grey' : 'red'} ribbon>{d.title}</Label>
                  </Grid.Column>
                  {(this.props.selectedBook&& d.userBooks.indexOf(this.props.selectedBook) > -1 ) &&
                    <Grid.Column>
                      <Checkbox
                        label={{ children: 'Select' }}
                        checked={this.state.isChecked}
                        onChange={(e,data) => this.checkBooked(e. data ,d)} />
                    </Grid.Column>
                  }
                </Grid.Row>

                {feedback}
                <p>{moment(d.publishedAt).fromNow()}</p>
                <p><Link to={"/main/"+ d._id}>{d.description}</Link></p>
                <Tags key={`tags-$i`} icon={'tags'}
                  tags={d.tags}
                  item={d}
                  itemPropsName={'tags'}
                  updateTags={newsActions.updateNews}/>


                <BookTags key={`users-$i`} icon={'user circle outline'}
                  tags={userbookTags}
                  item={d}
                  options={userBooks}
                  itemPropsName={'userBooks'}
                  updateTags={newsActions.updateNews}/>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    );
  }
}

export default List;
