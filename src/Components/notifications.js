/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  observer,
  inject
} from 'mobx-react/native';
import { Actions } from 'react-native-mobx';

@inject('store') @observer
class Notifications extends Component {
  static contextTypes = { drawer: React.PropTypes.object };

  constructor() {
    super();
    this.notificationLine = this.notificationLine.bind(this);
  }

  onLineClick(rowData) {
    this.context.drawer.close();
    Actions.drinkChoice({ coffeeMakerId: rowData.makerId });
  }

  notificationLine(rowData) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onLineClick(rowData);
        }}
        style={styles.row}
      >
        <Image style={styles.thumb} source={{ uri: rowData.photoURL }} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            {`${rowData.name} `}is making ☕️!
          </Text>
          <Text style={styles.text}>
            Since: {rowData.since.toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
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

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const lds = ds.cloneWithRows(this.props.store.coffeeMakers.slice());
    // debugger;
    console.log('store', this.props.store, lds);
    return (
      <ListView
        style={styles.listView}
      // dataSource={this.state.dataSource}
        dataSource={lds}
        //  renderRow={(rowData) => <Text>{rowData}</Text>}
        renderRow={this.notificationLine}
        renderSeparator={this._renderSeparator}
        enableEmptySections
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
    flexDirection: 'column',
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
