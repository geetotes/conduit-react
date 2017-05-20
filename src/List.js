import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image } from 'semantic-ui-react'


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

                <h4>{d.title}</h4>
                <p>{d.description}</p>
                <Tags/>
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