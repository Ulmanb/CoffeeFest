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
  getUserCoffeeFriends,
  getCoffeesForUser,
  makeCoffee as firebaseMakeCoffee,
  getUserIsMaking,
  doesUserExist,
  addCoffeeRequest as firebaseAddCoffeeRequest
} from '../WebFirebase';

class User {
  @observable firebaseUser;
  @observable usingFriends = [];
  @observable coffeeFriends = [];
  @observable coffeesInTheMaking = [];
  @observable allFriends = [];
  @observable userFacebookData;
  @observable isMaking = null;
  @observable coffeeRequests = [];

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

  // @computed get JSCoffeeFriends() {
  //   return this.coffeeFriends.slice();
  // }

  @computed get DBCoffeeFriends() {
    // Generate an array of facebookUIDs of the friends
    return this.usingFriends.map(curr => curr.id);
  }

  @computed
  get coffeeMakers() {
    let retVal = [];

    if (this.coffeesInTheMaking) {
      // "Serialize" coffee data to an array
      retVal = Object.keys(this.coffeesInTheMaking).map(key => {
        // key: the name of the object key
        const curr = this.coffeesInTheMaking[key];

        if (curr.makerPhoto && curr.makerName && curr.timeStart)
          return {
            photoURL: curr.makerPhoto,
            name: curr.makerName,
            since: new Date(curr.timeStart),
            makerId: curr.makerFacebook
          };
      })
      // Sanity check
      .filter((curr) => curr !== undefined);
    }

    return retVal;
  }

  clearAll() {
    this.facebookUID = this.photoURL = this.firebaseUser =
    this.usingFriends = this.coffeeFriends = this.coffeeMakers =
    this.allFriends = this.userFacebookData = this.coffeeRequests = null;
  }

  setUserDataFromFirebase(firebaseUser) {
    this.firebaseUser = firebaseUser;

    console.log('ofer hegati');

    // debugger;
    // Got null or weird whatever so clear user data
    if (!firebaseUser) {
      this.clearAll();
    } else {
      this.userFacebookData =
        firebaseUser.providerData.filter(provider => provider.providerId === 'facebook.com')[0];

      if (!this.userFacebookData)
        throw new Error('no facebook data in - weird stuff');

      this.fetchFriends();

      // getCoffeesForUser(this.facebookUID, snapshot => {
      getCoffeesForUser('10210689174805060', snapshot => {
        this.setCoffeesInTheMaking(snapshot.val());
      });

      this.fetchIsMaking();
    }
  }

  getCoffeeRequests() {
    
  }

  addCoffeeRequest(makerUID) {
    firebaseAddCoffeeRequest(makerUID, this.facebookUID)
    .catch((err) => {
      //TODO error handling
      // Retry
      this.addCoffeeRequest(makerUID);
      console.log('addCoffeeReqError', err);
    });
  }

  setCoffeesInTheMaking(coffees) {
    if (coffees) {
      this.coffeesInTheMaking = coffees;
    } else {
      this.coffeesInTheMaking = [];
    }
  }

  setIsMaking(isMaking) {
    this.isMaking = isMaking;
  }

  makeCoffee() {
    const {
      photoURL,
      facebookUID,
      firebaseUID,
      displayName,
      coffeeFriends
    } = this;

    firebaseMakeCoffee(photoURL, facebookUID, firebaseUID, displayName, coffeeFriends)
    .catch(err => {
      console.log('error', err);
      this.fetchIsMaking();
    });

    this.isMaking = true;
  }

  fetchIsMaking() {
    getUserIsMaking(this.facebookUID, (snapshot) => {
      console.log('is making', snapshot.val());
      // Convert to bool
      this.isMaking = !!snapshot.val();
    });
  }

  fetchFriends() {
    Promise.all([
      this.fetchUsingFriends(),
      this.fetchAllFriends(),
      this.fetchCoffeeFriends(),
      doesUserExist(this.facebookUID)
    ]).then((values) => {
      const { firebaseUID, facebookUID, displayName, DBCoffeeFriends } = this;

      // !values[3] => If user does not yet exist
      if (!values[3] && firebaseUID && facebookUID && displayName) {
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
    // debugger;
    if (friends)
      this.coffeeFriends = friends;
  }

  fetchCoffeeFriends() {
    // debugger;
    return new Promise((resolve) => {
      getUserCoffeeFriends()
      .then(ret => {
        this.setCoffeeFriends(ret);
        resolve(true);
      })
      .catch(err => {
        //Retry
        console.log('error', err);
        this.fetchCoffeeFriends();
      });
    });
  }

  @autobind
  setUsingFriends(result) {
    this.usingFriends = result.data;
  }

  fetchUsingFriends() {
    // debugger;
    return new Promise(resolve => {
      getUsingFBFriends()
      .then(ret => {
        this.setUsingFriends(ret);
        resolve(true);
      })
      .catch(err => {
        // Retry
        console.log('error', err);
        this.fetchUsingFriends();
      });
    });
  }

  fetchAllFriends() {
    const self = this;

    getTaggableFBFriends()
    .then(result => {
            this.allFriends = result.data;
      console.log(this.allFriends);
      console.log(self.allFriends);
    }).catch(err => {
      // Retry
      console.log('error', err);
      this.fetchAllFriends();
    });
  }
}

export default new User();
