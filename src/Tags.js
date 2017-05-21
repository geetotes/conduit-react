import React, { Component } from 'react';
import { Icon, Label, Button, Input, Segment, Search } from 'semantic-ui-react';
import Tag from './Tag.js';

const resultRenderer = ({ fullName, jobTitle }) => (
  <Label content={<div>
    <h5>{fullName}</h5>
    <p>{jobTitle}</p>
  </div>} />
)

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags || [],
      tag: '',
      isLoading: false, results: [], value: ''
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


  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => {
    console.log(e,result);
    const newTags = this.state.tags.push(result.fullName);
    this.setState({ value: ""})
  }

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      function escapeRegExp(str) {
        return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }
      const re = new RegExp(escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.fullName)
      const tempResult = this.props.options.filter(x => {
        return x.fullName.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1&& this.state.tags.indexOf(x.fullName) === -1;
      })
      this.setState({
        isLoading: false,
        results: tempResult,
      })
    }, 500)
  }

  render() {
    let icon = this.props.icon;
    return(
      <Segment className="row">
        <Icon name={icon}/>
          {this.state.tags.map((t) => {
            return (<Tag
              key={`tag-for-${t}`}
              filter={this._filter}
              text={t}
              remove={this._remove} />)
          })}
          {!this.props.options&&
            <Input type='text' size='mini' onChange={this._change} value={this.state.tag} action={{ onClick: this._add, content: 'Add' , icon: 'add'}} />
          }
          {this.props.options &&<Search
               loading={this.state.isLoading}
               onResultSelect={this.handleResultSelect}
               onSearchChange={this.handleSearchChange}
               results={this.state.results}
               resultRenderer={resultRenderer}
               value={this.state.value}
               {...this.props}
             />}
      </Segment>
    );
  }
}

export default Tags;
