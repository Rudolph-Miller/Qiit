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
    item: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired
  },

  onPress: function() {
    this.props.navigator.push({
      name: 'content',
      item: this.props.item
    });
  },

  render: function () {
    var item = this.props.item;
    var tags = item.tags.map(function(tag) {
      return (
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>
            {tag.name}
          </Text>
        </View>
      );
    });

    return (
      <View>
        <TouchableHighlight onPress={this.onPress}>
          <View style={styles.container}>
            <Image
              source={{uri: item.user.profile_image_url}}
              style={styles.thubnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.userId}>{item.user.id}</Text>
              <View style={styles.tagsContainer}>
                {tags}
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
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
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5
  },
  thubnail: {
    width: 60,
    height: 60,
    marginLeft: 5
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left'
  },
  userId: {
    fontSize: 12,
    textAlign: 'left'
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tagContainer: {
    marginRight: 5,
    backgroundColor: '#eee'
  },
  tag: {
    fontSize: 12,
    textAlign: 'center'
  },
  separator: {
    height: 0.8,
    backgroundColor: '#ddd'
  }
});
