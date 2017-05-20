import React, { Component } from 'react';
import Tags from './Tags.js';
import Books from './Books.js';

class List extends Component {
  render() {
    let data = [
      { title: 'foo', description: 'biz' },
      { title: 'baz', description: 'buzz'}
    ];

    return (
      <ul>
        {data.map((d,i) => {
          return (<li>
            <img src={`https://robohash.org/${i}.jpg`}/>
            <h4>{d.title}</h4>
            <p>{d.description}</p>
            <Tags/>
            <Books/>
          </li>);
        })}
      </ul>
    );
  }
}

export default List;
