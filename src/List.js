import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';
import { Grid, Image, Label } from 'semantic-ui-react'

class List extends Component {
  render() {
    let items = this.props.items;

    return (
      <Grid celled>
        {items.map((d,i) => {
          return (
            <Grid.Row>
              <Grid.Column width={3}>
                <Image src={d.urlToImage}/>
              </Grid.Column>
              <Grid.Column width={13}>
                <Label as='a' color='red' ribbon>{d.title}</Label>
                <p>{d.publishedAt}</p>
                <p>{d.description}</p>
                <Tags key={`tags-$i`} icon={'tags'} tags={d.tags}/>
                <Tags key={`users-$i`} icon={'user circle outline'} tags={d.tags}/>
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
