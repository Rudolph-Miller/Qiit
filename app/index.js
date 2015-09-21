'use strict';

var React = require('react-native');

var {
  Navigator,
  ScrollView,
  Text,
  View
} = React;

var Toolbar = require('./toolbar');
var Progressbar = require('./progressbar');
var Loading = require('./loading');
var Content = require('./content');
var Items = require('./items');
var Tags = require('./tags');

var INITIAL_ROUTE_NAME = 'items';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      tags: [],
      error: null,
      loaded: false
    };
  },

  getRequestURL: function(name) {
    return this.getRequestData[name].url.call(this);
  },

  getRequestCallback: function(name) {
    return this.getRequestData[name].callback;
  },

  getRequestData: {
    items: {
      url: function() {
      return 'https://qiita.com/api/v2/items';
      },
      callback: function(json) {
        this.setState({
          items: json,
          loaded: true
        });
      }
    },

    tags: {
      url: function() {
      return 'https://qiita.com/api/v2/tags';
      },
      callback: function(json) {
      }
    }
  },

  fetchData: function(name) {
    fetch(this.getRequestURL(name))
      .then(function(res) {
        return res.json();
      }).then(function(json) {
        if (json.message) {
          this.setState({
            error: json.message,
            loaded: true
          });
        } else {
          this.getRequestCallback(name).call(this, json);
        }
      }.bind(this)).catch(function(e) {
        this.setState({
          error: e,
          loaded: true
        });
      }.bind(this));
  },

  componentDidMount: function() {
    this.fetchData(INITIAL_ROUTE_NAME);
  },

  renderMain: {
    items: function(route, navigator) {
      return (
        <Items
          items={this.state.items}
          navigator={navigator}
        />
      );
    },

    tags: function(route, navigator) {
      return (
        <Tags
          tags={this.state.tags}
        />
      );
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
      return 'Qiit - List (' + this.state.items.length + ')';
    },

    tags: function(route) {
      return 'Qiit - Tags';
    },

    content: function(route) {
      return 'Qiit - ' + route.item.title;
    }
  },

  renderScene: function(route, navigator) {
    if (this.state.error) {
      route.title = 'Error';
    } else if (!this.state.loaded) {
      route.title = 'Qiit - Loading...';
    } else {
      route.title = this.getTitle[route.name].call(this, (route));
    }

    var main;
    if (this.state.error) {
      main = (
        <View>
          <Text>Error</Text>
          <Text>{this.state.error}</Text>
        </View>
      );
    } else if (!this.state.loaded) {
      main = (<Progressbar />);
    } else {
      main = this.renderMain[route.name].call(this, route, navigator);
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
        initialRoute={{name: INITIAL_ROUTE_NAME}}
        renderScene={this.renderScene}
      />
    );
  }
});
