'use strict';

var React = require('react-native');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

module.exports = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequierd,
    navigator: React.PropTypes.object.isRequierd
  },

  onPress: function() {
    this.props.navigator.push({
      name: 'content',
      item: this.props.item
    });
  },

  render: function () {
    var item = this.props.item;
    return (
      <TouchableHighlight onPress={this.onPress}>
        <View style={styles.container}>
          <Image
            source={{uri: item.user.profile_image_url}}
            style={styles.thubnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.userId}>{item.user.id}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thubnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left'
  },
  userId: {
    textAlign: 'center'
  }
});
