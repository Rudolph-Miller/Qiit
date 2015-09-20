'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var DATA = require('../data.json');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: null
    };
  },

  componentDidMount: function() {
    this.setState({items: DATA});
  },

  render: function() {
    var content;

    if (this.state.items) {
      content = this.state.items.map(function(item) {
        return(
          <View>
            <Text>
              {item.title}
            </Text>
          </View>
        );
      });
    } else {
      content = (<Text>Loading...</Text>);
    }

    return (
      <View style={styles.cotainer}>
        {{content}}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
