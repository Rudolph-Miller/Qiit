'use strict';

var React = require('react-native');

var {
  BackAndroid,
  StyleSheet,
  Text,
  ToolbarAndroid,
  TouchableHighlight,
  View
} = React;

module.exports = React.createClass({
  PropTypes: {
    route: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
    toggleDrawer: React.PropTypes.func.isRequired
  },

  getTitle: function() {
    return this.props.route.title;
  },

  renderToolbar: {
    items: function() {
      return (
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={require("image!ic_drawer")}
          onIconClicked={this.props.toggleDrawer}
          titleColor="#ffffff"
          title={this.getTitle()}
        />
      );
    },

    tags: function() {
      return (
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={require("image!ic_drawer")}
          onIconClicked={this.props.toggleDrawer}
          titleColor="#ffffff"
          title={this.getTitle()}
        />
      );
    },

    content: function() {
      return (
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={require("image!ic_arrow_back_white_24dp")}
          onIconClicked={this.props.navigator.pop}
          titleColor="#ffffff"
          title={this.getTitle()}
        />
      );
    }
  },

  render: function() {
    return this.renderToolbar[this.props.route.name].call(this);
  }
});

var styles = StyleSheet.create({
  toolbar:{
    height: 56,
    backgroundColor: '#81c04d',
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row'
  }
});
