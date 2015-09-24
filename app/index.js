'use strict';

var React = require('react-native');

var {
  BackAndroid,
  Navigator,
  ScrollView
} = React;

var Drawer = require('./drawer');
var ToolBar = require('./tool_bar');
var ProgressBar = require('./progress_bar');
var Loading = require('./loading');
var ErrorComponent = require('./error');

var REQUEST = require('./request');

var MAP = require('./map');

var INITIAL_ROUTE_NAME = 'items';
var BACKABLE_ROUTE_NAMES = ['content'];

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

  fetchData: function() {
    var routes = _navigator.getCurrentRoutes();
    var name = routes[routes.length-1].name;
    REQUEST.call(this, name);
  },

  componentDidMount: function() {
    this.fetchData();
  },

  toggleDrawer: function() {
    this.drawer.toggleDrawer();
  },

  renderScene: function(route, navigator) {
    _navigator = navigator;
    route.state = this.state;
    if (this.state.error) {
      route.title = 'Error';
    } else if (!this.state.loaded) {
      route.title = 'Qiit - Loading...';
    } else {
      route.title = MAP[route.name].title.call(this, (route));
    }

    var main;
    if (this.state.error) {
      main = (<ErrorComponent error={this.state.error} />);
    } else if (!this.state.loaded) {
      main = (<ProgressBar />);
    } else {
      main = React.createElement(MAP[route.name].component, {route: route, navigator: navigator});
    }

    return (
      <Drawer ref={function(drawer) { this.drawer = drawer; }.bind(this)}>
        <ScrollView>
          <ToolBar 
            route={route}
            navigator={navigator}
            toggleDrawer={this.toggleDrawer}
          />
          {main}
        </ScrollView>
      </Drawer>
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
