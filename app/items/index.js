'use strict';

var React = require('react-native');

var {
  ListView
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
        <ListView
          dataSource={this.dataSource()}
          renderRow={this.renderItem}
        />
      );
  }
});
