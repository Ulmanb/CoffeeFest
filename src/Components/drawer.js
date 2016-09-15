/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

import MainScreen from './mainScreen';
import PendingCooffees from './notifications';
import Drawer from 'react-native-drawer';

export default class DrawerComp extends Component {
  constructor(props){
    super(props);
    this.closeControlPanel = this.closeControlPanel.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
    this.coffeeClick = this.coffeeClick.bind(this);
  }
  static contextTypes = {drawer: React.PropTypes.object}

  closeControlPanel() {
    this._drawer.close()
  }

  openControlPanel(){
    this.context.drawer.open()
  }


  componentWillMount() {
    // this.openControlPanel();
  }

  render () {
    return (
      <Drawer
        type="static"
        // content={<View style={styles.container} />}
        content={<PendingCooffees />}
        openDrawerOffset={100}
        styles={drawerStyles}
        ref={(ref) => this._drawer = ref}
        side='right'
        tweenHandler={Drawer.tweenPresets.parallax}
        open = {false}
        tapToClose = {true}
        >
        {/* <View> */}

          <MainScreen drawer={this._drawer} />
        {/* </View> */}
      </Drawer>
    );
  }

  coffeeClick() {
    this.openControlPanel();
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(237, 185, 66)'
  },
  toolbar: {
    justifyContent: 'flex-end'
  },
  thumbnail: {
    width: 64,
    height: 64,
  }
});
