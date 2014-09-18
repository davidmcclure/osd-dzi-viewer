

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var L = require('leaflet');
require('zoomify');
require('minimap');


module.exports = Backbone.View.extend({

  id: 'text',

  options: {
    size: 20000
  },

  /**
   * Initialize Leaflet.
   *
   * @param {String} group
   * @param {String} slug
   */
  setImage: function(group, slug) {

    // Break if the image is already set.
    if (this.g == group && this.s == slug) return;

    // Clear an existing map.
    if (this.map) this.destroy();

    this.prefix = group+'/'+slug+'/';

    var layerOpts = {
      width:      this.options.size,
      height:     this.options.size,
      tolerance:  0.8,
      tileSize:   128
    };

    this.map = L.map('image').setView(new L.LatLng(0,0), 0);

    var layer1 = L.tileLayer.zoomify(this.prefix, layerOpts);
    var layer2 = L.tileLayer.zoomify(this.prefix, layerOpts);

    // Main layer:
    this.map.addLayer(layer1);

    // Minimap:
    var mini = new L.Control.MiniMap(layer2);
    this.map.addControl(mini);

    _.bindAll(this, 'setRoute');

    // Update the route on move.
    this.map.on('move', _.debounce(this.setRoute, 500));

    this.g = group;
    this.s = slug;

  },

  /**
   * Apply a x/y/z focus position.
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  focus: function(x, y, z) {
    this.map.setView([x, y], z);
  },

  /**
   * Update the route.
   */
  setRoute: function() {

    var c = this.map.getCenter();
    var z = this.map.getZoom();

    var x = c.lat.toFixed(4);
    var y = c.lng.toFixed(4);

    Backbone.history.navigate(this.prefix+x+'/'+y+'/'+z, {
      replace: true
    });

  },

  /**
   * Tear down the map.
   */
  destroy: function() {
    this.map.remove();
  }

});
