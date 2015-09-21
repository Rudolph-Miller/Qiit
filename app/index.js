'use strict';

var React = require('react-native');

var {
  Navigator,
  ScrollView,
  Text
} = React;

var Toolbar = require('./toolbar');
var Progressbar = require('./progressbar');
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

  renderMain: {
    items: function(route, navigator) {
      if (!this.state.loaded) {
        return (<Progressbar />);
      } else {
        return (
          <Items
            items={this.state.items}
            navigator={navigator}
          />
        );
      }
    },

    content: function(route, navigator) {
      return (
        <Content
          item={route.item}
          navigator={navigator}
        />
      );
    }
  },

  getTitle: {
    items: function(route) {
      if (!this.state.loaded) {
        return 'Loading...';
      } else {
        return '(' + this.state.items.length + ')';
      }
    },

    content: function(route) {
      return route.item.title;
    }
  },

  renderScene: function(route, navigator) {
    route.title = this.getTitle[route.name].call(this, (route));
    var main = this.renderMain[route.name].call(this, route, navigator);
    return (
      <ScrollView>
        <Toolbar 
          route={route}
          navigator={navigator}
        />
        {main}
      </ScrollView>
    );
  },

  render: function() {
    return (
      <Navigator 
        initialRoute={{name: 'items'}}
        renderScene={this.renderScene}
      />
    );
  }
});
