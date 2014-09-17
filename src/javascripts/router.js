

var _ = require('lodash');
var Backbone = require('backbone');
var View = require('./view');


module.exports = Backbone.Router.extend({

  routes: {
    ':group/:slug(/:x/:y/:z)': 'focus'
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

    // Destroy existing viewer.
    if (this.viewer) this.viewer.destroy();

    // Start the new viewer.
    this.viewer = new View({ group: group, slug: slug });

    // Apply the focus, if provided.
    if (x && y && z) {
      this.viewer.on('open', _.bind(function() {
        this.viewer.focus(Number(x), Number(y), Number(z));
      }, this));
    }

  },

});
