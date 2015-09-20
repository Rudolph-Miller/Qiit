'use strict';

var React = require('react-native');

var {
  ListView,
  StyleSheet
} = React;

var Item = require('./item');

module.exports = React.createClass({
  propTypes: {
    items: React.PropTypes.object.isRequierd,
    navigator: React.PropTypes.object.isRequierd
  },

  renderItem: function(item) {
    return(
      <Item
        item={item}
        navigator={this.props.navigator}
      />
    );
  },

  dataSource: function() {
    return (
      new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows(this.props.items)
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
  }
});
