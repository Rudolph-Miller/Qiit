'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var EAW = require('eastasianwidth');

module.exports = React.createClass({
  PropTypes: {
    route: React.PropTypes.object.isRequierd,
    navigator: React.PropTypes.object.isRequierd
  },

  renderLeftButton: {
    items: function() {
    },

    content: function() {
      return (
        <TouchableHighlight 
          onPress={this.onBack} >
          <Text style={styles.toolbarButton}>
            Back
          </Text>
        </TouchableHighlight>
      );
    }
  },

  onBack: function() {
    this.props.navigator.pop();
  },

  render: function() {
    var titleCharacters = this.props.route.title;
    if (EAW.length(titleCharacters) > 25) {
      titleCharacters = EAW.slice(titleCharacters, 0, 22) + '...';
    }
    var title = (<Text style={styles.toolbarTitle}>{titleCharacters}</Text>);
    var leftButton = this.renderLeftButton[this.props.route.name].call(this)
    return (
      <View style={styles.toolbar}>
        {leftButton}
        {title}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  toolbar:{
    backgroundColor: '#81c04d',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarButton:{
    width: 50,
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  }
});
