import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';



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

// ReactDOM.render(<App />, document.getElementById('root'));
fb.on('value', snapshot => {
  const store = snapshot.val();
  ReactDOM.render(
    <App {...store} />,
    document.getElementById('root')
  );
});
registerServiceWorker();
