import {
  observable,
  computed
} from 'mobx';
import firebase from 'firebase';
import autobind from 'autobind-decorator';
import {
   getUsingFBFriends,
   getTaggableFBFriends
} from '../utils/facebookConnector';

class User {
  // @observable displayName;
  @observable facebookUID;
  // @observable firebaseUID;
  @observable photoURL;
  @observable firebaseUser;
  @observable usingFriends = [];
  @observable coffeeFriends = [];
  @observable allFriends = [];

  setUserDataFromFirebase(firebaseUser) {
        this.firebaseUser = firebaseUser;

    console.log('ofer hegati');
    if (!firebaseUser)
      throw new Error("Not logged in");

    const userFacebookData = firebaseUser.providerData.filter(provider => provider.providerId === 'facebook.com')[0];

    if (!userFacebookData)
      throw new Error("no facebook data in - weird stuff");

    // this.FirebaseUID = firebaseUser.uid;
    // this.displayName = firebaseUser.displayName;
    this.facebookUID = userFacebookData.uid;
    this.photoURL = userFacebookData.photoURL;

    this.fetchFriends();
  }

  @computed get displayName(){
    return this.firebaseUser && this.firebaseUser.displayName;
  }

  @computed get firebaseUID(){
    return this.firebaseUser && this.firebaseUser.uid;
  }

  fetchFriends () {
    this.fetchAllFriends();
    this.fetchCoffeeFriends();
  }

  @autobind
  setCoffeeFriends(result) {
    this.coffeeFriends = result.data;
    setTimeout(() =>
      this.coffeeFriends = [{name:'Goodi', picture: {data: {url: 'http://google.com'} }}],
      5000
    );
  }

  fetchCoffeeFriends () {
    getUsingFBFriends()
    // .then(result => {
    //   debugger;
    //   self.coffeeFriends = result.data;
    // })
    .then(this.setCoffeeFriends)
    .catch(err => {
      // Retry
      debugger;
      this.fetchCoffeeFriends();
    });
  }

  fetchAllFriends () {
    let self = this;

    getTaggableFBFriends()
    .then(result => {
            this.allFriends = result.data;
      console.log(this.allFriends);
      console.log(self.allFriends);
    }).catch(err => {
      // Retry
      fetchAllFriends();
    });
  }

  // @computed get facebookUID(){
  //   return this.firebaseUser && this.firebaseUser.displayName;
  // }

}

export default new User();
// export default user;
