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
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      isDrawerOpen: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerContainer}>
          <TouchableHighlight style={styles.toolbar}
            onPress={this.openDrawer}>
            <Image source={require('../../images/coffeeButton.png')}
                   style={styles.thumbnail}/>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style = {styles.coffeeButton}
            underlayColor="grey"
            onPress={this.onCoffeeClick}>
            <Image
              source={require('../../images/coffeeButton.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  openDrawer() {
    // if(!this.state.isDrawerOpen) {
        this.props.drawer.open();
    //     this.setState({
    //       isDrawerOpen: true
    //     })
    // }
    // else {
    //   this.props.drawer.close();
    //   this.setState({
    //     isDrawerOpen: false
    //   })
    // }
  }

  onCoffeeClick() {
    console.log("coffecClicked");
  }
}

const styles = StyleSheet.create({
  container: {
    // borderWidth:2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    alignItems: 'stretch'
  },
  buttonContainer: {
    // borderWidth:2,
    flex: 3.5,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  drawerContainer: {
    // borderWidth: 2,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 2
  },
  coffeeButton: {
    borderRadius: 400,
    // borderWidth: 2
  },
  toolbar: {

  },
  thumbnail: {
    width: 64,
    height: 64,
  }
});

export default MainScreen;
