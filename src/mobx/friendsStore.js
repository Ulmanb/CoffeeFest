import {observable} from 'mobx';

class CoffeeStore {
  @observable usingFriends = [];
  @observable allFriends = [];
  @observable coffeesInTheMaking = [];
  @observable coffeeRequests = [];

  setAllFriends (arrFriends) {
    // TODO maybe dont spread? not efficient..
    this.allFriends = [...allFriends];
  }

  setUsingFriends (arrFriends) {
    this.usingFriends = [...arrFriends];
  }

  setCoffees (arrCoffees) {
    this.coffeesInTheMaking = [...arrCoffees];
  }

  addCoffeeRequest (request) {
    this.coffeeRequests.push(request);
  }
}

const observableStore = new CoffeeStore();
export default observableStore;
