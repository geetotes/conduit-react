import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,  Route, Link } from 'react-router-dom'
import {  database, newsActions, userActions} from './FirebaseService';

import Home from './Home';
import MainPage from './MainPage';
import App from './App';
import './index.css';


  database.ref('news').on('value', snapshot => {
    const newsStore = snapshot.val();
    database.ref('users').on('value', snapshot => {
      const usersStore = snapshot.val();
      database.ref('userBooks').on('value', snapshot => {
        const userBooksStore = snapshot.val();
        const store = Object.assign({}, {news:newsStore}, {users: usersStore}, {userBooks: userBooksStore});
        console.log("index.js", store)
        ReactDOM.render(
          <Router {...store}>
            <div>
              <Route exact path="/" component={(props) => <App {...props} data={store} newsActionsTemp={newsActions}/>} />
              <Route path="/home" component={Home} />
              <Route path="/main/:newsId" component={(props) => <MainPage  {...props} data={store}  newsActionsTemp={newsActions} userActions={userActions}/>}   />
            </div>
          </Router>,
          document.getElementById('root')
      );
    });
  });
});

registerServiceWorker();
