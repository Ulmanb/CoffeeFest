/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LeaderboardList from './leaderboardList';

export default class MyComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LeaderboardList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
