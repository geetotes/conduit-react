import React, { Component } from 'react';
import './MainPage.css';
import 'semantic-ui-css/semantic.min.css';
import * as moment from 'moment';

class IconBar extends Component {

  render() {
    return (
      <div>
        <div className="ui labeled button" tabindex="0">
        <div className="ui red button">
          <i className="heart icon"></i> Like
        </div>
        <a className="ui basic red left pointing label">
          1,048
        </a>
      </div>
      <div className="ui labeled button" tabindex="0">
        <div className="ui basic blue button">
          <span className="fa fa-eye" aria-hidden="true"></span> View
        </div>
        <a className="ui basic left pointing blue label">
          1,048
        </a>
      </div>
    </div>

    );
  }
}

export default IconBar;
