import {
  observable,
  computed,
  // autorun
} from 'mobx';
// import firebase from 'firebase';
import autobind from 'autobind-decorator';
import {
   getUsingFBFriends,
   getTaggableFBFriends
} from '../utils/facebookConnector';
import {
  updateUser,
  getUserCoffeeFriends
} from '../WebFirebase';

class User {
  @observable firebaseUser;
  @observable usingFriends = [];
  @observable coffeeFriends = [];
  @observable coffeeMakers = [];
  @observable allFriends = [];
  @observable userFacebookData;

  @computed get displayName() {
    return this.firebaseUser && this.firebaseUser.displayName;
  }

  @computed get firebaseUID() {
    return this.firebaseUser && this.firebaseUser.uid;
  }

  @computed get facebookUID() {
    return this.userFacebookData && this.userFacebookData.uid;
  }

  @computed get photoURL() {
    return this.userFacebookData && this.userFacebookData.photoURL;
  }

  @computed get JSCoffeeFriends() {
    return this.coffeeFriends.slice();
  }

  @computed get DBCoffeeFriends() {
    debugger;
    // Generate an array of facebookUIDs of the friends
    return this.usingFriends.map(curr => curr.id);
  }

  clearAll() {
    this.facebookUID = this.photoURL = this.firebaseUser =
    this.usingFriends = this.coffeeFriends = this.coffeeMakers =
    this.allFriends = this.userFacebookData = null;
  }

  setUserDataFromFirebase(firebaseUser) {
    this.firebaseUser = firebaseUser;

    console.log('ofer hegati');

    debugger;
    // Got null or weird whatever so clear user data
    if (!firebaseUser) {
      this.clearAll();
    } else {
      this.userFacebookData =
        firebaseUser.providerData.filter(provider => provider.providerId === 'facebook.com')[0];

      if (!this.userFacebookData)
        throw new Error('no facebook data in - weird stuff');

      this.fetchFriends();
    }
  }

  @computed
  coffeeMakers() {
    if (this.coffeeFriends) {

    }
  }

  fetchFriends() {
    Promise.all([
      this.fetchUsingFriends(),
      this.fetchAllFriends(),
      this.fetchCoffeeFriends(),
    ]).then((values) => {
      const { firebaseUID, facebookUID, displayName, DBCoffeeFriends } = this;

      if (firebaseUID && facebookUID && displayName) {
        updateUser(
          firebaseUID,
          facebookUID,
          displayName,
          DBCoffeeFriends
        );
      }
    });
  }

  @autobind
  setCoffeeFriends(friends) {
    debugger;
    if(friends) {
      this.coffeeFriends = friends;
    } else {
      this.coffeeFriends = [];
    }
  }

  fetchCoffeeFriends() {
    return getUserCoffeeFriends()
    .then(this.setCoffeeFriends)
    .catch(err => {
      //Retry
      this.fetchCoffeeFriends();
    });
  }

  @autobind
  setUsingFriends(result) {
    debugger;
    this.usingFriends = result.data;
  }

  fetchUsingFriends() {
    debugger;
    return new Promise((resolve) => {
      getUsingFBFriends()
      .then(result => {
        this.setUsingFriends(result);
        resolve(true);
      })
      .catch(err => {
        // Retry
        debugger;
        this.fetchUsingFriends();
      });
    });
  }

  fetchAllFriends() {
    const self = this;

    return getTaggableFBFriends()
    .then(result => {
            this.allFriends = result.data;
      console.log(this.allFriends);
      console.log(self.allFriends);
    }).catch(err => {
      debugger;
      // Retry
      this.fetchAllFriends();
    });
  }

  // @computed get facebookUID(){
  //   return this.firebaseUser && this.firebaseUser.displayName;
  // }

}
// const user = new User();
//
// // Update user to Firebase DB
// autorun(() => {
//   const { firebaseUID, facebookUID, displayName, DBCoffeeFriends } = user;
//
//   if (firebaseUID && facebookUID && displayName) {
//     updateUser(
//       firebaseUID,
//       facebookUID,
//       displayName,
//       DBCoffeeFriends
//     );
//   }
// });

export default new User();
// export default user;
