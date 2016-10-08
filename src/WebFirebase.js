
import * as firebase from 'firebase';
import config from '../config';
import UserStore from './mobx/userStore';

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  console.log('AuthStateChanged');
  UserStore.setUserDataFromFirebase(user);
});

export function getUserCoffeeFriends() {
  console.log('getUserCoffeeFriends');
  return new Promise((resolve) => {
    firebase.database().ref(`users/${UserStore.facebookUID}/friends`)
    // firebase.database().ref(`users/${UserStore.facebookUID}`)
    .on('value', data => {
      resolve(data.val());
    });
  });
}

// Select all the users and their properties
export function getAllUsers() {
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
export function updateUser(firebaseUID, facebookUID, displayName, friends) {
    var postData = {
      firebaseUID,
      facebookUID,
      displayName,
      // photo: photoURL || '',
      friends: friends || []
    };

    console.log('updateUser', postData);

    var updates = {};
    updates['/users/' + facebookUID] = postData;
    return firebase.database().ref().update(updates);
}

export function makeCoffee(photoURL, facebookUID, firebaseUID, displayName, coffeeFriends) {
  console.log('makeCoffee', UserStore);

  if(!UserStore)
    return null;
    
  var coffeeData = {
    makerFacebook: facebookUID,
    makerFirebase: firebaseUID,
    makerName: displayName,
    makerPhoto: photoURL,
    timeStart: new Date(),
    requests: [],
  };

  // var newCoffeeKey = firebase.database().ref().child('coffees').push().key;
  var updates = {};

  // Since you can only make one coffee at a time
  updates[`/coffees/${facebookUID}`] = coffeeData;

  coffeeFriends.forEach(curr => {
    updates[`/users/${curr}/friendsCoffees/${facebookUID}`] = coffeeData;
  });

  console.log(updates);
  var p = firebase.database().ref().update(updates);
  console.log(p);
  // setTimeout(getCoffees, 1000);
  return p;
}

export function getCoffeesForUser(userFacebookUID, coffeesChangeCB) {
  // var coffees = firebase.database().ref('coffees/');
  //
  // coffees.on('value', function(snapshot) {
  //   console.log(snapshot.val());
  // });

  // var coffees2 = firebase.database().ref('users/10210689174805060/friendsCoffees');
  var coffees2 = firebase.database().ref(`users/${userFacebookUID}/friendsCoffees`);

  coffees2.on('value', coffeesChangeCB);
}

export function createUserWithToken(token, facebookUid){

  // var provider = new firebase.auth.FacebookAuthProvider();
  var credential = firebase.auth.FacebookAuthProvider.credential(token);
  var user = null;

  // Return a promise
  return firebase.auth().signInWithCredential(credential).then(function(user) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.

    // UserStore.setUserDataFromFirebase(user);

    // Update user and return a promise
    // return updateUser();
    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
     // TODO handle error? maybe should remove catch and leave handling caller
  });
}
