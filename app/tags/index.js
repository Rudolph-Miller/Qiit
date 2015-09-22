'use strict';

var React = require('react-native');

module.exports = React.createClass({
  propTypes: {
    route: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequierd
  },

  renderTag: function(tag) {
    return(
      <View>
        <Text>
          tag.name
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
