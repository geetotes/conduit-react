import React, { Component } from 'react';
import { Icon, Label, Button, Input, Segment, Search } from 'semantic-ui-react';
import Tag from './Tag.js';

const resultRenderer = ({ fullName, jobTitle }) => (
  <Label content={<div>
    <h5>{fullName}</h5>
    <p>{jobTitle}</p>
  </div>} />
)

class BookTags extends Component {
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
    this.updateNewsAPI = this.updateNewsAPI.bind(this);
    this.autoCategorize = this.autoCategorize.bind(this);

  }

  componentWillReceiveProps(nextProps){
    this.setState({tags: nextProps.tags || []});
  }

  updateNewsAPI(newTags){
    console.log("update news", newTags, this.props.updateTags )
    if(this.props.updateTags){
      if(this.props.itemPropsName === 'tags'){
        const newNews =  Object.assign({}, this.props.item, {tags: newTags});
        this.props.updateTags(this.props.item._id, newNews );
      }else if(this.props.itemPropsName === 'userBooks'){
        console.log("save userbooks", newTags);
        //Save array of ID to userbooks
        const newUserbooks = newTags.map(x=>{
          const results = this.props.options.filter(y => y.fullName === x);
          if(results.length > 0){
            return results[0]._id;
          }else{
            return null;
          }
        })

        const newNews =  Object.assign({}, this.props.item, {userBooks: newUserbooks});
        this.props.updateTags(this.props.item._id, newNews );
      }

    }
  }

  _add(e) {
    e.preventDefault();
    let tags = this.state.tags.concat(this.state.tag);
    this.updateNewsAPI(tags);
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
    this.updateNewsAPI(tags);

    this.setState({
      tags: tags
    });
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => {
    const tags = this.state.tags.concat(result.fullName);
    this.updateNewsAPI(tags);
    this.setState({
      tags: tags,
      tag: '',
      value: ''
    })
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

  autoCategorize(e) {
    e.preventDefault();
    console.log(this.state.tags);
    console.log(this.props.options);
    let currentTags = this.state.tags;
    let availTags = this.props.options.map((o) => {
      return o.fullName;
    }).filter((f) => {
      return !currentTags.includes(f)
    });

    if (availTags.length > 0) {
      let newTags = currentTags.concat(availTags[Math.floor(Math.random()*availTags.length)]);
      alert(`Brefing book suggestions: ${newTags}`);
    } 


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
          <Button 
            color='olive' 
            floated={'right'} 
            icon='cubes' 
            labelPosition='left' 
            content='Suggest' 
            onClick={this.autoCategorize}/>
      </Segment>
    );
  }
}

export default BookTags;
