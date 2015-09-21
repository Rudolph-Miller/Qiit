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

var _navigator;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      error: null,
      loaded: false
    };
  },

  getRequestURL: {
    items: function() {
      return 'https://qiita.com/api/v2/items';
    }
  },

  fetchData: function() {
    var route = _navigator.getCurrentRoutes()[0];
    fetch(this.getRequestURL[route.name].call(this))
      .then(function(res) {
        return res.json();
      }).then(function(json) {
        this.setState({
          items: json,
          loaded: true
        });
      }.bind(this)).catch(function(e) {
        this.setState({
          error: e,
          loaded: true
        });
      }.bind(this));
  },

  componentDidMount: function() {
    this.fetchData();
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
        return 'Qiit - Loading...';
      } else {
        return 'Qiit - List (' + this.state.items.length + ')';
      }
    },

    content: function(route) {
      return 'Qiit - ' + route.item.title;
    }
  },

  renderScene: function(route, navigator) {
    _navigator = navigator;
    route.title = this.getTitle[route.name].call(this, (route));
    var main = this.renderMain[route.name].call(this, route, navigator);
    if (this.state.error) {
      main = (<Text>{this.state.error}</Text>);
    }
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
