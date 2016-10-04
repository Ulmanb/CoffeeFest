/* @flow weak */

import React from 'react';
import {
  // View,
  Text,
  TouchableOpacity
} from 'react-native';

const Button = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>
      {children}
    </Text>
  </TouchableOpacity>
);

export { Button };

const styles = {
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
  // container: {
  //   flex: 1,
  // },
};
