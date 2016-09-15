/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image
} from 'react-native';
// import ItemCheckbox from 'react-native-item-checkbox';

export default class MyComponent extends Component {
  componentWillMount(){
    // TODO fetch()
  }

  constructor() {
    super();
    this.renderLine = this.renderLine.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(
        [{name: 'Adam Lauz',level: "Grand Barista", points: 10},
         {name: 'Tal Shemesh', level:"Novice", points: 3}]),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        //  renderRow={(rowData) => <Text>{rowData}</Text>}
        renderRow={this.renderLine}
        renderSeparator={this._renderSeparator}
      />
    );
  }

  renderLine(rowData){
    return (
      <View style={styles.row}>
        <Image style = {styles.thumb} source={require('../../images/coffeeButton.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {`${rowData.name} wants ☕️!`}
          </Text>
          {/* <ItemCheckbox //example with icon settings
             color="#FF9999"
             icon="tree"
             iconSize="normal" //"small", "normal", "large"
             size={100}
          /> */}
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
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 54,
    height: 54,
  },
  text: {
    flex: 1,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  pointsView: {

  }
});
