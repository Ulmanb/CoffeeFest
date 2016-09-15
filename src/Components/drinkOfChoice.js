/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Drink Choice extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight>
          <Image source={require('../../images/coffeeNmilk.png')}/>
        </TouchableHighlight>
        <TouchableHighlight>
          <Image source={require('../../images/coffeeNmilk.png')}/>
        </TouchableHighlight>
        <TouchableHighlight>
          <Image source={require('../../images/coffeeNmilk.png')}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(168, 143, 93)'
  },
});
