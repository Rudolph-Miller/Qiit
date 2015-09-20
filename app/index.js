'use strict';

var React = require('react-native');

var DATA = require('../data.json');

var Loading = require('./loading');
var Items = require('./items');

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

  render: function() {
    if (!this.state.loaded) {
      return (<Loading />);
    } else {
      return (<Items items={this.state.items} />);
    }
  }
});
