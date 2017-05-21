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
  const getNewsbyId = id => fb.child('news').child(id);

  const addNews = data => fb.child('news').push(data, response => response);
  const updateNews = (id, data) => fb.child(`news/${id}`).update(data, response => response);
  export const newsActions = {
    addNews,
    updateNews,
    getNewsbyId,
  };

fb.on('value', snapshot => {
  // console.log("snapshot", snapshot)

  const store = snapshot.val();


  console.log("index.js", store)
  ReactDOM.render(
    <Router {...store}>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/home">About</Link></li>
        <li><Link to="/main">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={(props) => <App {...props} data={store} newsActionsTemp={newsActions}/>} />
      <Route path="/home" component={Home}   />
      <Route path="/main/:newsId" component={(props) => <MainPage  {...props} data={store}  newsActionsTemp={newsActions}/>}   />
    </div>
  </Router>,
    document.getElementById('root')
  );
});
registerServiceWorker();
