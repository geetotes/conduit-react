import * as firebase from 'firebase';

const config = {
   apiKey: "AIzaSyA5Fh7tb7DREA5fgAKwJjh_llXfIKs9iMs",
   authDomain: "my-test-website-c0fcc.firebaseapp.com",
   databaseURL: "https://my-test-website-c0fcc.firebaseio.com",
   projectId: "my-test-website-c0fcc",
   storageBucket: "my-test-website-c0fcc.appspot.com",
   messagingSenderId: "575661525828"
 };


firebase.initializeApp(config);
 export const database = firebase.database();

 //News API
 const getNewsbyId = id => database.ref('news').child(id);
 const addNews = data => database.ref('news').push(data, response => response);
 const adduserArticle = data => database.ref("userArticle").push(data, response => response);
 const removeUserArticle = (id) => database.ref("userArticle").child(id).remove();
 const updateNews = (id, data) => database.ref(`news/${id}`).update(data, response => response);
 export const newsActions = {
   addNews,
   updateNews,
   getNewsbyId,
   adduserArticle,
   removeUserArticle
 };
 //User API
 const getUsersbyId = id => database.ref('users').child(id);
 const updateUserbyID = (id, data) => database.ref(`users/${id}`).update(data, response => response);
 export const userActions = {
   getUsersbyId,
   updateUserbyID,
 };
