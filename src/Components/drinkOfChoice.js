/* @flow */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

export default ({ coffeeMakerId }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{opacity:1}}>
        <Image style={styles.imageStyle} source={require('../../images/coffeeNmilk.png')}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.imageStyle} source={require('../../images/blackcoffee.png')}/>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.imageStyle} source={require('../../images/TEA.png')}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(168, 143, 93)',
    // opacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    opacity: 1,
    flex: 1,
    width: 300,
    height: 60
  }
});
