'use strict';

var React = require('react-native');

var {
  Navigator
} = React;

var Loading = require('./loading');
var Content = require('./content');
var Items = require('./items');

var DATA = require('../data.json');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      loaded: false
    };
  },

  componentDidMount: function() {
    this.setState({
      items: DATA,
      loaded: true
    });
  },

  renderScene: function(route, navigator) {
    switch (route.name) {
      case 'items':
        if (!this.state.loaded) {
          return (<Loading />);
        } else {
          return (
            <Items
              items={this.state.items}
              navigator={navigator}
            />);
        };
        break;
      case 'content':
        return (
          <Content
            item={route.item}
            navigator={navigator}
          />);
        break;
    }
  },

  render: function() {
    return (
      <Navigator 
        initialRoute={{name: 'items'}}
        renderScene={this.renderScene}
      />);
  }
});
