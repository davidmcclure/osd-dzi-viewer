

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var View = require('./view');


module.exports = Backbone.Router.extend({

  routes: {
    ':group/:slug': 'init',
    ':group/:slug/:x/:y/:z': 'focus'
  },

  /**
   * Start the viewer.
   */
  init: function(group, slug) {
    new View({ group: group, slug: slug });
  },

  /**
   * Focus on a specific location.
   *
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  focus: function(group, slug, x, y, z) {

    // Start the viewer.
    var osd = new View({ group: group, slug: slug });

    // Apply the focus when the source is ready.
    osd.on('open', _.bind(function() {
      osd.focus(Number(x), Number(y), Number(z));
    }, this));

  }

});
