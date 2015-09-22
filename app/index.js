'use strict';

var React = require('react-native');

var {
  BackAndroid,
  Navigator,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} = React;

var NavigationView = require('./navigation_view');
var ToolBar = require('./tool_bar');
var ProgressBar = require('./progress_bar');
var Loading = require('./loading');
var Content = require('./content');
var Items = require('./items');
var Tags = require('./tags');

var INITIAL_ROUTE_NAME = 'items';

var BACKABLE_ROUTE_NAMES = ['content'];

var DEBUG = true;

var ITEMS = require('../data/items.json');
var TAGS = require('../data/tags.json');
var DATA = {
  items: ITEMS,
  tags: TAGS
};

var _navigator;

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
        this.setState({
          tags: json,
          loaded: true
        });
      }
    }
  },

  fetchData: function() {
    var routes = _navigator.getCurrentRoutes();
    var name = routes[routes.length-1].name;
    if ( DEBUG ) {
      var json = DATA[name];
      this.getRequestCallback(name).call(this, json);
    } else {
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
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  renderMain: {
    items: function(route, navigator) {
      return (
        <Items
          route={route}
          navigator={navigator}
        />
      );
    },

    tags: function(route, navigator) {
      return (
        <Tags
          route={route}
          navigator={navigator}
        />
      );
    },

    content: function(route, navigator) {
      return (
        <Content
          route={route}
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
    _navigator = navigator;
    route.state = this.state;
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
      main = (<ProgressBar />);
    } else {
      main = this.renderMain[route.name].call(this, route, navigator);
    }

    return (
      <NavigationView>
        <ScrollView>
          <ToolBar 
            route={route}
            navigator={navigator}
          />
          {main}
        </ScrollView>
      </NavigationView>
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

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length <= 1  ) {
    return false;
  } else {
    var routes = _navigator.getCurrentRoutes();
    var currentRouteName = routes[routes.length-1].name;
    if (BACKABLE_ROUTE_NAMES.indexOf(currentRouteName) >= 0) {
      _navigator.pop();
      return true;
    } else {
      return false;
    }
  }
});
