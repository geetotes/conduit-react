import React, { Component } from 'react';
import { Icon, Label, Button, Input, Segment } from 'semantic-ui-react';
import Tag from './Tag.js';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tags: props.tags || [],
      tag: ''
    };
    this._remove = this._remove.bind(this);
    this._change = this._change.bind(this);
    this._add = this._add.bind(this);
    this._filter = this._filter.bind(this);
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

  _filter(t) {
    let e = new CustomEvent('addTag', { detail: t });
    window.dispatchEvent(e);
  }

  _remove(e) {
    let tags = this.state.tags.filter((t) => {
      return t !== e
    });
    let ev = new CustomEvent('removeTag', { detail: e });

    this.setState({
      tags: tags
    });
  }

  render() {
    let icon = this.props.icon;
    return(
      <Segment>
        <Icon name={icon}/>
          {this.state.tags.map((t) => {
            return (<Tag 
              key={`tag-for-${t}`}
              filter={this._filter}
              text={t} 
              remove={this._remove} />)
          })}
          <Input type='text' size='mini' onChange={this._change} value={this.state.tag} action={{ onClick: this._add, content: 'Add' , icon: 'add'}} />
      </Segment>
    );
  }
}

export default Tags;
