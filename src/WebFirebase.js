
import * as firebase from 'firebase';
import config from '../config';

firebase.initializeApp(config);

// Select all the users and their properties
export function getAllUsers(){
  var data_container = null;
  var users = firebase.database().ref('users/');
  users.on('value', function(data) {
    data_container = data.val();
  });
  return data_container;
};

// Select user by user_id
export function getUserById(userId){
  var data_container = null;
  var user = firebase.database().ref('users/'+userId);
  user.on('value', function(data){
    data_container = data.val();
  });
  return data_container;
};

//Add new user to db
export function updateUser(firebaseUid, facebookUid, displayName, friends) {
    var postData = {
      firebaseUid,
      facebookUid,
      displayName,
      // photo: photoURL || '',
      friends: friends || []
    };
    var updates = {};
    updates['/users/' + facebookUid] = postData;
    return firebase.database().ref().update(updates);
};




export function createUserWithToken(token, facebookUid){
  // var provider = new firebase.auth.FacebookAuthProvider();
  var credential = firebase.auth.FacebookAuthProvider.credential(token);
  var user = null;

  // Return a promise
  return firebase.auth().signInWithCredential(credential).then(function(user) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.

    // Update user and return a promise
    return updateUser(user.uid, facebookUid, user.displayName);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
     // TODO handle error? maybe should remove catch and leave handling caller
  });

};
