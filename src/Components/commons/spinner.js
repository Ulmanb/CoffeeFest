/* @flow weak */

import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

const Spinner = ({ size = 'large' }) => (
  <View style={styles.spinnerContainer}>
    <ActivityIndicator size={size} />
  </View>
);

export { Spinner };

const styles = {
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
};
