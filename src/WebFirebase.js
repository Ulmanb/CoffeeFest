
import * as firebase from 'firebase';
import config from '../config';

firebase.initializeApp(config);

let _currUser = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    _currUser = new User(user);
  } else {
    _currUser = null;
  }
});

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


export function makeCoffee() {
  // console.log('makeCoffee');
  // var { currentUser } = firebase.auth();
  // console.log(currentUser);
  // if (!currentUser)
  //   throw new Error("Not logged in when making coffee");
  //
  // var userId = currentUser.uid;
  // var userFacebookData = currentUser.providerData.filter(provider => provider.providerId === 'facebook.com')[0];
  //
  // if (!userFacebookData) {
  //   throw new Error("no facebook data in make coffee - weird stuff");
  // }
  // else {

    // const facebookId = _currUser.FacebookUID;
    console.log(_currUser);
    const { photoURL, FacebookUID, FirebaseUID, displayName } = _currUser;

    var coffeeData = {
      makerFacebook: FacebookUID,
      makerFirebase: FirebaseUID,
      makerName: displayName,
      makerPhoto: photoURL,
      timeStart: new Date(),
      requests: [],
    };

    // var newCoffeeKey = firebase.database().ref().child('coffees').push().key;
    // var updates = {};

    // Since you can only make one coffee at a time
    // updates['/coffees/' + userId] = coffeeData;

    var p = firebase.database().ref('coffees/' + FacebookUID).set(coffeeData);
    console.log(p);
    setTimeout(getCoffees, 1000);
    return p;
}

function getCurrentUser(){

}

export function getCoffees() {
  var coffees = firebase.database().ref('coffees/');

  coffees.on('value', function(snapshot) {
    console.log(snapshot.val());
  });
}

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

class User {
  constructor(FirebaseUser) {
    this.FirebaseUID = FirebaseUser.uid;

    if (!FirebaseUser)
      throw new Error("Not logged in");

    var userId = FirebaseUser.uid;
    var userFacebookData = FirebaseUser.providerData.filter(provider => provider.providerId === 'facebook.com')[0];

    if (!userFacebookData) {
      throw new Error("no facebook data in - weird stuff");
    }
    else {
      this.FacebookUID = userFacebookData.uid;
      this.photoURL = userFacebookData.photoURL;
      this.displayName = FirebaseUser.displayName;
    }
  }
}
// class DBManager {
//   constructor(user.uid)
// }
