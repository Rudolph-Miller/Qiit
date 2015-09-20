'use strinct';

var React = require('react-native');

var {
  Text,
  TouchableHighlight,
  View
} = React;

module.exports = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequierd,
    navigator: React.PropTypes.object.isRequierd
  },

  onBack: function() {
    this.props.navigator.pop();
  },

  render: function() {
    var item = this.props.item;

    return (
      <View>
        <TouchableHighlight onPress={this.onBack}>
          <Text>
            Back
          </Text>
        </TouchableHighlight>
        <Text>{item.body}</Text>
      </View>
    );
  }
});
