'use strict';

var React = require('react-native');

var {
  ProgressBarAndroid,
  StyleSheet,
  View
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <ProgressBarAndroid />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  }
});
