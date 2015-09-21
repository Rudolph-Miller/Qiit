'use strinct';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView
} = React;

module.exports = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequierd,
    navigator: React.PropTypes.object.isRequierd
  },

  onBack: function() {
    this.props.navigator.pop();
  },

  render: function() {
    var item = this.props.item;

    return (
      <ScrollView>
        <TouchableHighlight 
          onPress={this.onBack}
          style={styles.backButton} >
          <Text style={styles.backButtonText}>
            Tap to back
          </Text>
        </TouchableHighlight>
        <Text>{item.body}</Text>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#000'
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }
});
