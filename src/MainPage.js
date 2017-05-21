import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';


class MainPage extends Component {
  constructor(props) {
  super(props);
  this.state = { newsData: null};
  }
  componentWillMount(){
    var self =this;
    const id = this.props.match.params.newsId;
    const newsMain = this.props.newsActionsTemp.getNewsbyId(id);
    newsMain.once('value').then(function(snapshot) {
      var newsData = snapshot.val();
      self.setState({newsData: newsData});
      console.log(newsData);
    });

  }

  render() {
    console.log("props", this.props);

    return (

      <div>
        <h1>MainPage</h1>
        <h2>{this.state.newsData? this.state.newsData.title : "No new was found"}</h2>

      </div>
    );
  }
}

export default MainPage;
