

require('osd');
var config = require('config');
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = $;


var View = Backbone.View.extend({

  id: 'text',

  /**
   * Initialize Openseadragon.
   *
   * @param {Object} opts
   */
  initialize: function(opts) {

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

  }

});


var Router = Backbone.Router.extend({

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


$(function() {
  new Router();
  Backbone.history.start();
});
