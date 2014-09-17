

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
require('osd');


module.exports = Backbone.View.extend({

  id: 'text',

  /**
   * Initialize Openseadragon.
   *
   * @param {Object} opts
   */
  initialize: function(opts) {

    this.options = opts;

    // Build the tile source prefix.
    this.prefix = opts.group+'/'+opts.slug+'/';

    this.viewer = OpenSeadragon({

      id: 'text',

      immediateRender: true,
      showNavigationControl: false,
      showNavigator: true,

      tileSources: {
        Image: {
          Url: this.prefix,
          xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
          Format: 'jpg',
          TileSize: 512,
          Size: {
            Height: 20000,
            Width: 20000
          }
        }
      }

    });

    _.bindAll(this, 'setRoute');

    // When the viewport is panned or zoomed.
    this.viewer.addHandler('zoom', _.debounce(this.setRoute, 500));
    this.viewer.addHandler('pan',  _.debounce(this.setRoute, 500));

    // Notify when the source is loaded.
    this.viewer.addHandler('open', _.bind(function() {
      this.trigger('open');
      //this._positionRetina();
    }, this));

  },

  /**
   * Apply a x/y/z focus position.
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  focus: function(x, y, z) {
    this.viewer.viewport.panTo(new OpenSeadragon.Point(x, y));
    this.viewer.viewport.zoomTo(z);
  },

  /**
   * Update the route.
   */
  setRoute: function() {

    var c = this.viewer.viewport.getCenter();
    var z = this.viewer.viewport.getZoom();

    var x = c.x.toFixed(4);
    var y = c.y.toFixed(4);
    var z = z.toFixed(4);

    Backbone.history.navigate(this.prefix+x+'/'+y+'/'+z, {
      replace: true
    });

  },

  /**
   * Tear down the viewer.
   */
  destroy: function() {
    this.viewer.destroy();
  },

  /**
   * Fix the resolution on retina displays.
   */
  _positionRetina: function() {

    var h = $(window).height();
    var w = $(window).width();

    $('.openseadragon-container').css({
      width:  2*w,
      height: 2*h,
      top:   -h/2,
      left:  -w/2,
    });

    var canvas = $(this.viewer.canvas).find('canvas');

    canvas.attr({
      width:  2*w,
      height: 2*h
    });

    canvas.css({
      width:  w,
      height: h
    });

    var context = canvas.get(0).getContext('2d');
    context.scale(2, 2);

    this.viewer.viewport.resize({
      x: 2*w,
      y: 2*h
    });

    this.viewer.viewport.resetContentSize();

  }

});
