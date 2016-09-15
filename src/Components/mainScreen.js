import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

// const FBSDK = require('react-native-fbsdk');
// const {
// LoginManager,
// } = FBSDK;

import {LoginManager} from 'react-native-fbsdk';

import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './facebookLogin';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.onCoffeeClick = this.onCoffeeClick.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      isDrawerOpen: false
    }
  }

  static contextTypes = {drawer: React.PropTypes.object};

  componentWillMount() {
// ...

debugger;
// Attempt a login using the Facebook login dialog,
// asking for default permissions.
LoginManager.logInWithReadPermissions(['public_profile']).then(
  function(result) {
    if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      alert('Login was successful with permissions: '
        + result.grantedPermissions.toString());
    }
  },
  function(error) {
    alert('Login failed with error: ' + error);
  }
);
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
          {/* <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button> */}
          <Login />
        </View>
      </View>
    );
  }

  openDrawer() {
    // if(!this.state.isDrawerOpen) {
        this.context.drawer.open();
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

const myButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
    Login with Facebook
  </Icon.Button>
);

export default MainScreen;
