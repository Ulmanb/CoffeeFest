/* @flow weak */

import React from 'react';
import {
  View
} from 'react-native';

export const CardSection = ({ children }) => (
  <View style={styles.container}>
    { children }
  </View>
);

// export CardSection;

const styles = {
  container: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
};
