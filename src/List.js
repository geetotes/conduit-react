import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image, Label } from 'semantic-ui-react'

class List extends Component {
  render() {
    let data = [
      { title: 'News From Middle East', description: 'biz' },
      { title: 'News From Europe', description: 'buzz'}
    ];

    return (
      <Grid celled>
        {data.map((d,i) => {
          return (
            <Grid.Row>
              <Grid.Column width={3}>
                <Image src={`https://robohash.org/${i}.jpg`}/>
              </Grid.Column>
              <Grid.Column width={13}>
                <Label as='a' color='red' ribbon>{d.title}</Label>
                <p>12 minutes ago</p>
                <p>{d.description}</p>
                <Tags key={`tags-$i`} icon={'tags'}/>
                <Tags key={`users-$i`} icon={'user circle outline'}/>
                <Books/>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    );
  }
}

export default List;
