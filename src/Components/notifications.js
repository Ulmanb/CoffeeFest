/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image
} from 'react-native';
import {
  observer,
  inject
} from 'mobx-react/native';

@inject("store") @observer
class Notifications extends Component {

  // componentWillReceiveProps(nextProps, nextState) {
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //
  //   console.log('willRecieveprops');
  //   // this.setState({
  //   //   friends: nextProps.friends,
  //   //   dataSource: ds.cloneWithRows( nextProps.friends )
  //   // });
  //   debugger;
  //
  //   this.setState({
  //     friends: nextProps.store.coffeeFriends,
  //     dataSource: ds.cloneWithRows( nextProps.store.coffeeFriends )
  //   });
  // }

  constructor() {
    super();
    this.notificationLine = this.notificationLine.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      friends: [],
      dataSource: ds.cloneWithRows( [] ),
    };
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const lds = ds.cloneWithRows( this.props.store.coffeeFriends.slice() );
    // debugger;
    console.log('store', this.props.store);
    return (
      <ListView style={styles.listView}
      // dataSource={this.state.dataSource}
        dataSource={lds}
        //  renderRow={(rowData) => <Text>{rowData}</Text>}
        renderRow={this.notificationLine}
        renderSeparator={this._renderSeparator}
        enableEmptySections={true}
      />
    );
  }

  notificationLine(rowData){
    return (
      <View style={styles.row}>
        <Image style = {styles.thumb} source={{uri : rowData.picture.data.url}} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            {`${rowData.name} `}
          </Text>
          <Text style = {styles.text}>
            is making ☕️!
          </Text>
        </View>
      </View>
    );
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    // backgroundColor: '#F6F6F6',
    // backgroundColor: '',
    backgroundColor: 'rgb(104, 105, 106)'
  },
  thumb: {
    width: 54,
    height: 54,
  },
  nameText: {
    // flex: 1,
    color: 'white',
    fontWeight: 'bold'
  },
  text: {
    // flex: 1,
    color: 'white',
    // fontWeight: 'bold'
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  listView: {
    backgroundColor: 'rgb(104, 105, 106)'
  },
  pointsView: {

  }
});

export default Notifications;
