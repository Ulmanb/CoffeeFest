/* @flow */

import React, { Component } from 'react';
import Drawer from 'react-native-drawer';

import MainScreen from './mainScreenRouterWrapper';
import PendingCooffees from './notifications';

export default class DrawerComp extends Component {
  render () {
    return (
      <Drawer
        type="static"
        content={<PendingCooffees friends={this.props.friends}/>}
        openDrawerOffset={100}
        styles={drawerStyles}
        side='right'
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose = {true}
        >
          <MainScreen />
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
