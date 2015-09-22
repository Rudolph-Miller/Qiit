'use strict';

var React = require('react-native');

var {
  DrawerLayoutAndroid,
  Text,
  TouchableHighlight,
  View
} = React;

module.exports = React.createClass({
  renderNavigationView: function() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.handlePressNavigationView}
          name='items'>
          <Text>
            Items
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.handlePressNavigationView}
          name='tags'>
          <Text>
            Tags
          </Text>
        </TouchableHighlight>
      </View>
    );
  },

  handlePressNavigationView: function(e) {
  },

  render: function() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}>
        {this.props.children}
      </DrawerLayoutAndroid>
    );
  }
});
