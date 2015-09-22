var DEBUG = true;
var ITEMS = require('../data/items.json');
var TAGS = require('../data/tags.json');
var DATA = {
  items: ITEMS,
  tags: TAGS
};

var MAP = require('./map');

function getRequestURL(name) {
  return MAP[name].url.call(this);
}

function getRequestCallback(name) {
  return MAP[name].callback;
}

module.exports = function(name) {
  if ( DEBUG ) {
    var json = DATA[name];
    getRequestCallback(name).call(this, json);
  } else {
    fetch(getRequestURL(name))
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      if (json.message) {
        this.setState({
          error: json.message,
          loaded: true
        });
      } else {
        getRequestCallback(name).call(this, json);
      }
    }.bind(this)).catch(function(e) {
      this.setState({
        error: e,
        loaded: true
      });
    }.bind(this));
  }
};
