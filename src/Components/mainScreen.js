import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';


class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.onCoffeeClick = this.onCoffeeClick.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style = {styles.coffeeButton}
          underlayColor="grey"
          onPress={this.onCoffeeClick}>
          <Image
            source={require('../../images/coffeeButton.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }

  onCoffeeClick() {
    console.log("coffecClicked");
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
  coffeeButton: {
    borderRadius: 400
    // borderWidth: 2
  }
});

export default MainScreen;
