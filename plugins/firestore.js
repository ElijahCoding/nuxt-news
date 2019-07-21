import firebase from 'firebase/app';
import 'firebase/firestore';

if (!firebase.apps.length) {
    var firebaseConfig = {
        apiKey: "AIzaSyD_qByK8iAxoqOQG97QhY-e0bML66DwFtg",
        authDomain: "nuxt-news-3fae4.firebaseapp.com",
        databaseURL: "https://nuxt-news-3fae4.firebaseio.com",
        projectId: "nuxt-news-3fae4",
        storageBucket: "nuxt-news-3fae4.appspot.com",
        messagingSenderId: "789530272463",
        appId: "1:789530272463:web:cb9da24676c3a051"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.firestore().settings({
          timestampsInSnapshots: true
      });
}

const db = firebase.firestore();

export default db;
