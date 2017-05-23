import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import MainPage from './MainPage';

export default (
  <Route  path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/main" component={MainPage}/>
  </Route>
);
