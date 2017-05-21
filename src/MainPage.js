import React, { Component } from 'react';
import './MainPage.css';
import 'semantic-ui-css/semantic.min.css';
import * as moment from 'moment';
// import './../public/css/font-awesome.min.css';
import IconBar from './IconBar'
class MainPage extends Component {
  constructor(props) {
  super(props);
  this.state = { newsData: null};
  }
  componentWillMount(){
    var self = this;
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
    const news = this.state.newsData;
    return (

      <div>
        <h1>MainPage</h1>
        <div className="mainPanel">
        {news&& <img className="mainImg" src={news.urlToImage} />  }
        {/* <img src={this.news.urlToImage} /> */}
        <h2>{news? news.title : "No new was found"}</h2>
        <h5>{news? news.description : "No new was found"}</h5>
        <h5>{news? news.source : "No new was found"}</h5>
        <div className="row footerBar">
          <IconBar/>
        <h5 className="timeTag">{news? moment(news.publishedAt).fromNow() : "No new was found"}</h5>
        {/* <span className="fa fa-eye" aria-hidden="true"></span> */}
        </div>
      </div>

      </div>
    );
  }
}

export default MainPage;
