'use strinct';

var React = require('react-native');

var {
  Text,
  ScrollView
} = React;

module.exports = React.createClass({
  propTypes: {
    route: React.PropTypes.object.isRequired
  },

  render: function() {
    var item = this.props.route.item;

    return (
      <ScrollView>
        <Text>{item.body}</Text>
      </ScrollView>
    );
  }
});
