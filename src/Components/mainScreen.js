import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from 'react-native';
// import { LoginManager } from 'react-native-fbsdk';
import {
  observer,
  inject
} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './unused/facebookLogin';
// import { makeCoffee } from '../WebFirebase';

@inject('store') @observer
class MainScreen extends Component {
  static contextTypes = { drawer: React.PropTypes.object };

  constructor(props) {
    super(props);
    this.onCoffeeClick = this.onCoffeeClick.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerContainer}>
          <View style={styles.logoContainer}>
            {/* <Image source={require('../../images/LOGO.png')}
                   style={styles.logo}/> */}
          </View>
          <TouchableWithoutFeedback style={styles.toolbar}
            onPress={this.openDrawer}>
            <Image source={require('../../images/makelist.png')}
                   style={styles.thumbnail}/>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.coffeeButton}
            // underlayColor="grey"
            onPress={this.onCoffeeClick}>
            <Image
              source={require('../../images/aaaa.png')}
            />
          </TouchableOpacity>
          <Login />
        </View>
      </View>
    );
  }

  openDrawer() {
    this.context.drawer.open();
  }

  onCoffeeClick() {
    console.log("coffecClicked");
    this.props.store.makeCoffee();
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
    // backgroundImage: ''
  },
  logo: {
    zIndex: -3,
    flex: 1,
    // width: 200,
    // height: 200
  },
  logoContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 64,
    height: 64,
  }
});

const myButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
    Login with Facebook
  </Icon.Button>
);

export default MainScreen;
