import React, { Component } from 'react';
import { Icon, Label, Button, Input, Segment } from 'semantic-ui-react';

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
      tags: props.tags || [],
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
    let icon = this.props.icon;
    return(
      <Segment>
        <Icon name={icon}/>
          {this.state.tags.map((t) => <Tag text={t} remove={this._remove} />)}
          <Input type='text' size='mini' onChange={this._change} value={this.state.tag} action={{ onClick: this._add, content: 'Add' , icon: 'add'}} />
      </Segment>
    );
  }
}

export default Tags;
