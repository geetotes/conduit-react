import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image, Label, Dropdown, Icon } from 'semantic-ui-react'
import './App.css';

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let items = this.props.items;
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
                <Label as='a' color='red' ribbon>{d.title}</Label>
                {feedback}
                <p>{d.publishedAt}</p>
                <p>{d.description}</p>
                <Tags key={`tags-$i`} icon={'tags'} tags={d.tags}/>
                <Tags key={`users-$i`} icon={'user circle outline'} tags={userbookTags} options={userBooks}/>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    );
  }
}

export default List;
