'use strinct';

var React = require('react-native');

var {
  Text,
  View
} = React;

module.exports = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequierd
  },

  render: function() {
    var item = this.props.item;

    return (
      <View>
        <Text>{item.body}</Text>
      </View>
    );
  }
});
