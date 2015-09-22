'use strict';

var React = require('react-native');

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

module.exports = React.createClass({
  propTypes: {
    route: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequierd
  },

  renderTag: function(tag) {
    return(
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>
          {tag.id}
        </Text>
      </View>
    );
  },

  dataSource: function() {
    return (
      new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows(this.props.route.state.tags)
    );
  },

  render: function() {
    return (
      <ListView
        dataSource={this.dataSource()}
        renderRow={this.renderTag}
      />
    );
  }
});

var styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: '#eee',
    marginBottom: 10,
    marginLeft: 10,
    padding: 5,
    width: 300
  },
  tag: {
    fontSize: 15
  }
});
