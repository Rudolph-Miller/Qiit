'use strict';

var React = require('react-native');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequierd
  },

  render: function () {
    var item = this.props.item;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: item.user.profile_image_url}}
          style={styles.thubnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.userId}>{item.user.id}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  thubnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  userId: {
    textAlign: 'center'
  }
});
