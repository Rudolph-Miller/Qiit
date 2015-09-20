'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var DATA = require('../data.json');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },

  componentDidMount: function() {
    this.setState({items: DATA});
  },

  renderItem: function(item) {
    return(
      <View style={styles.container}>
        <Image
          source={{uri: item.user.profile_image_url}}
          style={styles.thubnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.userId}>{item.user.id}</Text>
        </View>
      </View>
    );
  },

  dataSource: function() {
    return (
      new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows(this.state.items)
    );
  },

  render: function() {
    return (
      <ListView style={styles.listView}
        dataSource={this.dataSource()}
        renderRow={this.renderItem}
      />
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  thubnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  userId: {
    textAlign: 'center'
  }
});
