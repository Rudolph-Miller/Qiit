'use strinct';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView
} = React;

var HTMLView = require('react-native-htmlview')

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
        <HTMLView value={item.rendered_body}/>
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
