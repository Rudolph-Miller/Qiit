'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text
} = React;

module.exports = React.createClass({
  render: function() {
    return(
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
