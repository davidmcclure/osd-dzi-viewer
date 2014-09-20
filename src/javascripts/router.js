

var _ = require('lodash');
var Backbone = require('backbone');
var View = require('./view');


module.exports = Backbone.Router.extend({


  routes: {
    ':group/:image(/:x/:y/:z)': 'focus'
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
   * @param {String} image
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  focus: function(group, image, x, y, z) {

    // If necessary, mount the image.
    this.viewer.setImage(group, image, _.bind(function() {

      if (x && y && z) { // Apply the focus.
        this.viewer.focus(Number(x), Number(y), Number(z));
      }

    }, this));

  }


});
