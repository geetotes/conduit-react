import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image, Label, Dropdown, Icon, Checkbox } from 'semantic-ui-react'
import BookTags from './BookTags.js';
import './App.css';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import ListCheckbox  from './ListCheckbox.js'
class List extends Component {

  constructor(props) {
    super(props);
     this.getUserTagByName = this.getUserTagByName.bind(this);
  }

  getUserTagByName(d){
    const userbookTags = d.userBooks? d.userBooks.map((x) => {
      return this.props.userBooks.filter(y => y._id === x)[0].fullName;
    }) : [];
    return userbookTags;
  }

  getLabelColor(d) {
    let now = moment();
    let color = 'grey';
    if (now.diff(moment(d.publishedAt), 'hours') < 24) {
      color = 'red';
    }

    if (d.userBooks !== undefined && d.userBooks.length > 0) {
      color = 'teal';
      if (now.diff(moment(d.publishedAt), 'hours') < 24) {
        color = 'blue';
      }
    }

    return color;
  }

  render() {
    const { items, newsActionsTemp } = this.props;
    let feedback = null;
    if (this.props.activeItem === 'sent') {
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

    let sentDisabled = this.props.selectDisabled;

    return (
      <Grid celled>
        {items.map((d,i) => {
          const userbookTags = d.userBooks? d.userBooks.map((x) => {
            return userBooks.filter(y => y._id === x)[0].fullName;
          }) : [];
          return (
            <Grid.Row key={`grid-item-${i}`}>
              <Grid.Column width={3}>
                <Image src={d.urlToImage}/>
              </Grid.Column>
              <Grid.Column width={13}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Label as='a' color={this.getLabelColor(d)} ribbon>{d.title}</Label>
                  </Grid.Column>
                  {(this.props.selectedBook&& d.userBooks.indexOf(this.props.selectedBook) > -1 ) &&
                    <Grid.Column>
                      <ListCheckbox
                        news={d}
                        selectedBook={this.props.selectedBook}
                        >
                        </ListCheckbox>
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
                  updateTags={newsActionsTemp.updateNews}/>

                <BookTags key={`users-$i`} icon={'user circle outline'}
                  tags={userbookTags}
                  item={d}
                  options={userBooks}
                  itemPropsName={'userBooks'}
                  updateTags={newsActionsTemp.updateNews}/>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    );
  }
}

export default List;
