/* @flow */

import React, { Component } from 'react';
import { Header } from './commons';

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
        <View style={{flex:1
          // ,borderColor:'yellow'
          // ,borderWidth:2
        }}>
        <Header headerText="Requests"
        // style={{borderColor:'red', borderWidth:3 }}
        />
        {this._renderSeparator()}
        <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderLine}
          renderSeparator={this._renderSeparator}
          enableEmptySections={true}
          // renderHeader={() => <View style={{backgroundColor: '#CCCCCC'}}/>}
          renderHeader={this._renderSeparator}
          automaticallyAdjustContentInsets={false}
        />
        </View>
    );
  }

  renderLine(rowData){
    return (
      <View style={[styles.row
      ]}>
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
  // container: {
  //   flex: 1,
  // },
  row: {
    // borderWidth: 1,
    // borderColor:'red',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: ,
    padding: 5,
    paddingLeft: 10,
    // backgroundColor: '#F6F6F6',
    // borderTopWidth: 1,
    backgroundColor: 'white',
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

  },
  listView: {
    margin: 0,
    padding: 0,
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2
  }
});
