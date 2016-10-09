/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { Scene, Router, Actions } from 'react-native-mobx';
import { Provider } from 'mobx-react/native';

import store from './src/mobx/userStore';
import TabBar from './src/Components/tab_bar';
import DrinkChoice from './src/Components/drinkOfChoice';

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Router>
           <Scene key="root">
            <Scene key="tabBar" component={TabBar} initial />
             <Scene key="drinkChoice" component={DrinkChoice} title="ChooseDrink!" />
           </Scene>
         </Router> */}
         <TabBar />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('CoffeeFest', () => Main);

// setTimeout(() => Actions.drinkChoice(), 10000);
