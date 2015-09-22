Items = require('./items');
Tags = require('./tags');
Content = require('./content');

module.exports = {
  items: {
    component: Items,
    title: function(route) {
      return 'Qiit - List (' + this.state.items.length + ')';
    },
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
    component: Tags,
    title: function(route) {
      return 'Qiit - Tags';
    },
    url: function() {
      return 'https://qiita.com/api/v2/tags';
    },
    callback: function(json) {
      this.setState({
        tags: json,
        loaded: true
      });
    }
  },

  content: {
    component: Content,
    title: function(route) {
      return 'Qiit - ' + route.item.title;
    }
  }
}
