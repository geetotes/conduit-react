import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Icon, Label } from 'semantic-ui-react'


const Tag = (props) => {
  let text = props.text;
  return(
    <Label>
      <span>{text}</span>
      <Icon name={'delete'} onClick={() => props.remove(text)} />
    </Label>
  )
}
class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tags: [],
      tag: ''
    };

    this._remove = this._remove.bind(this);
    this._change = this._change.bind(this);
    this._add = this._add.bind(this);
  }

  _add(e) {
    e.preventDefault();
    let tags = this.state.tags.concat(this.state.tag);
    this.setState({
      tags: tags,
      tag: ''
    });
  }

  _change(e) {
    this.setState({
      tag: e.target.value
    });
  }

  _remove(e) {
    let tags = this.state.tags.filter((t) => {
      return t !== e
    });

    this.setState({
      tags: tags
    });
  }

  render() {
    return(
      <div className='tags'>
        {this.state.tags.map((t) => <Tag text={t} remove={this._remove} />)}
        <form onSubmit={this._add}>
          <Input type='text' onChange={this._change} value={this.state.tag} />
          <Button type='submit'>Add</Button>
        </form>
        
      </div>
    );
  }
}

export default Tags;
