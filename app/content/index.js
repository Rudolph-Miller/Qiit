'use strinct';

var React = require('react-native');

var {
  Text,
  ScrollView
} = React;

module.exports = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequierd
  },

  render: function() {
    var item = this.props.item;

    return (
      <ScrollView>
        <Text>{item.body}</Text>
      </ScrollView>
    );
  }
});
