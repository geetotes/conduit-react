import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';


import Home from './Home';
import MainPage from './MainPage';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const config = {
   apiKey: "AIzaSyA5Fh7tb7DREA5fgAKwJjh_llXfIKs9iMs",
   authDomain: "my-test-website-c0fcc.firebaseapp.com",
   databaseURL: "https://my-test-website-c0fcc.firebaseio.com",
   projectId: "my-test-website-c0fcc",
   storageBucket: "my-test-website-c0fcc.appspot.com",
   messagingSenderId: "575661525828"
 };

const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

  //News API
  const getNewsbyId = id => fb.child('news').child(id);
  const addNews = data => fb.child('news').push(data, response => response);
  const adduserArticle = data => fb.child("userArticle").push(data, response => response);
  // this.bindAsArray(fb.child("userArticle"), "userArticle");

  const updateNews = (id, data) => fb.child(`news/${id}`).update(data, response => response);
  export const newsActions = {
    addNews,
    updateNews,
    getNewsbyId,
    adduserArticle,
  };
  //User API
  const getUsersbyId = id => fb.child('users').child(id);
  const updateUserbyID = (id, data) => fb.child(`users/${id}`).update(data, response => response);
  export const userActions = {
    getUsersbyId,
    updateUserbyID,
  };

  fb.on('value', snapshot => {
  const store = snapshot.val();

  console.log("index.js", store)
  ReactDOM.render(
    <Router {...store}>
      <div>
        <Route exact path="/" component={(props) => <App {...props} data={store} newsActionsTemp={newsActions}/>} />
        <Route path="/home" component={Home}   />
        <Route path="/main/:newsId" component={(props) => <MainPage  {...props} data={store}  newsActionsTemp={newsActions} userActions={userActions}/>}   />
      </div>
    </Router>,
    document.getElementById('root')
  );
});
registerServiceWorker();
