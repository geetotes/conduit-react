import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import Home from './Home';
import MainPage from './MainPage';
// import * as firebase from 'firebase';
//
//
// const config = {
//    apiKey: "AIzaSyA5Fh7tb7DREA5fgAKwJjh_llXfIKs9iMs",
//    authDomain: "my-test-website-c0fcc.firebaseapp.com",
//    databaseURL: "https://my-test-website-c0fcc.firebaseio.com",
//    projectId: "my-test-website-c0fcc",
//    storageBucket: "my-test-website-c0fcc.appspot.com",
//    messagingSenderId: "575661525828"
//  };
//
// const fb = firebase
//   .initializeApp(config)
//   .database()
//   .ref();

export default (
  <Route  path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/main" component={MainPage}/>
  </Route>
);
