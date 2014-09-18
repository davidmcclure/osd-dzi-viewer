

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var L = require('leaflet');
require('zoomify');


module.exports = Backbone.View.extend({

  id: 'text',

  options: {
    size: 20000
  },

  /**
   * Initialize Openseadragon.
   *
   * @param {Object} opts
   */
  initialize: function(opts) {

    this.map = L.map('image').setView(new L.LatLng(0,0), 0);

    var layer = L.tileLayer.zoomify('mental-maps/test/', {
        height: 20000,
        width: 20000,
        tolerance: 0.8,
        tileSize: 128
    });

    this.map.addLayer(layer);

  },

  /**
   * Apply a x/y/z focus position.
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  focus: function(x, y, z) {
    // TODO
  },

  /**
   * Update the route.
   */
  setRoute: function() {
    // TODO
  },

  /**
   * Tear down the viewer.
   */
  destroy: function() {
    // TODO
  }

});
