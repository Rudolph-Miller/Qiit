'use strict';

var React = require('react-native');

var {
  DrawerLayoutAndroid,
  Text,
  TouchableHighlight,
  View
} = React;

module.exports = React.createClass({
  componentDidMount: function() {
    this.isOpen = false;
  },

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
    this.closeDrawer();
  },

  onDrawerOpen: function() {
    this.isOpen = true;
  },

  onDrawerClose: function() {
    this.isOpen = false;
  },

  openDrawer: function() {
    this.drawer.openDrawer();
  },

  closeDrawer: function() {
    this.drawer.closeDrawer();
  },

  toggleDrawer: function() {
    if ( this.isOpen ) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  },

  render: function() {
    return (
      <DrawerLayoutAndroid
        ref={function(drawer) { this.drawer = drawer }.bind(this)}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose} >
        {this.props.children}
      </DrawerLayoutAndroid>
    );
  }
});
