/* @flow */

import React, { Component } from 'react';
import {
  Router,
  Scene
} from 'react-native-mobx';
import Main from './mainScreen';
import DrinkChoice from './drinkOfChoice';

export default () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="main" component={Main} initial hideNavBar />
        <Scene
          key="drinkChoice"
          component={DrinkChoice}
          title="ChooseDrink!"
          hideNavBar={false}
        />
      </Scene>
    </Router>
  );
}
