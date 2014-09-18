

var _ = require('lodash');
var Backbone = require('backbone');
var View = require('./view');


module.exports = Backbone.Router.extend({

  routes: {
    ':group/:slug(/:x/:y/:z)': 'focus'
  },

  /**
   * Spin up the viewer.
   */
  initialize: function() {
    this.viewer = new View();
  },

  /**
   * Focus on a location.
   *
   * @param {String} group
   * @param {String} slug
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  focus: function(group, slug, x, y, z) {

    this.viewer.setImage(group, slug);

    if (x && y && z) { // Apply the focus.
      this.viewer.focus(Number(x), Number(y), Number(z));
    }

  }

});
