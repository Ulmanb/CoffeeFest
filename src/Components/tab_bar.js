import React from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import MainScreen from './drawer';
import Leaderboard from './leaderboard';
import CoffeeRequests from './coffeeRequests';
import { createUserWithToken } from '../WebFirebase';
import {
  getFBAccessToken,
  getUsingFBFriends
} from '../utils/facebookConnector';

class TabBar extends React.Component {

  constructor(props) {
    super(props);

    this.tabs = {
      main: 'Main',
      leaderboard: 'Leaderboard',
      coffeRequests: 'Requests',
      friends: 'Friends'
    }

    this.state = {
      selectedTab: this.tabs.main,
      notifCount: 0,
      friends: [],
      presses: 0,
    };
  }

  _renderContent = (color, pageText, num) => {
    return (
      <View style={[styles2.tabContent, {backgroundColor: color}]}>
        <Text style={styles2.tabText}>{pageText}</Text>
        <Text style={styles2.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  };

  componentWillMount() {
    // Get FB access token -> get the one used or get a new one
    getFBAccessToken()
    .then(data => {
      createUserWithToken(data.accessToken, data.userID);
      return getUsingFBFriends(data.accessToken);
    })
    .then(result => {
      this.setState({
        friends: result.data
      });
    })
    .catch(reason => {
      alert('Login failed');
      console.log(reason);
    });
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="black"
        // tintColor="rgb(177, 237, 241)"
        // tintColor="blue"
        // barTintColor="darkslateblue"
        // barTintColor="rgb(241, 241, 241)"
        barTintColor="white"
        >
        <TabBarIOS.Item
          // title="Home"
          icon={require('../../images/home_icon.png')}
          selected={this.state.selectedTab === this.tabs.main}
          onPress={() => {
            this.setState({
              selectedTab: this.tabs.main,
            });
          }}>
          {/* {this._renderContent('#414A8C', 'Blue Tab')} */}
          <MainScreen friends={this.state.friends} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../../images/checklist2.png')}
          // selectedIcon={require('./relay.png')}
          // renderAsOriginal
          // title="Checklist"
          selected={this.state.selectedTab === this.tabs.requests}
          onPress={() => {
            this.setState({
              selectedTab: this.tabs.requests,
              presses: this.state.presses + 1
            });
          }}>
          <CoffeeRequests />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('../../images/winnericon.png')}
          // selectedIcon={require('./relay.png')}
          // renderAsOriginal
          // title="Leaderboard"
          selected={this.state.selectedTab === this.tabs.leaderboard}
          onPress={() => {
            this.setState({
              selectedTab: this.tabs.leaderboard,
              presses: this.state.presses + 1
            });
          }}>
          <Leaderboard />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          // systemIcon="history"
          icon={require('../../images/friendsico.png')}
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === this.tabs.friends}
          onPress={() => {
            this.setState({
              selectedTab: this.tabs.friends,
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles2 = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

export default TabBar;
