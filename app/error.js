'use strict';

var React = require('react-native');

var {
  Text,
  View
} = React;

module.exports = React.createClass({
  propTypes: {
    error: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <View>
        <Text>Error</Text>
        <Text>
          {this.props.error}
        </Text>
      </View>
    );
  }
});
