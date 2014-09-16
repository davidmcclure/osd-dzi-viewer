

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
   */
  initialize: function() {

    _.bindAll(this, 'setRoute');

    this.viewer = OpenSeadragon({

      id: 'text',

      immediateRender: true,
      showNavigationControl: false,
      showNavigator: true,

      tileSources: {
        Image: {
          xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
          Url: config.bucket+'/'+config.slug+'/tiles/',
          Format: 'jpg',
          TileSize: 512,
          Size: {
            Height: 20000,
            Width: 20000
          }
        }
      }

    });

    // When the viewport is panned or zoomed.
    this.viewer.addHandler('zoom', _.debounce(this.setRoute, 500));
    this.viewer.addHandler('pan',  _.debounce(this.setRoute, 500));

    // Apply the route when the source is loaded.
    this.viewer.addHandler('open', _.bind(function() {
      Backbone.history.start();
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

    Backbone.history.navigate(x+'/'+y+'/'+z, {
      replace: true
    });

  }

});


var Router = Backbone.Router.extend({

  routes: {
    ':x/:y/:z': 'focus'
  },

  /**
   * Start the viewer.
   */
  initialize: function() {
    this.osd = new View();
  },

  /**
   * Focus on a specific location.
   *
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  focus: function(x, y, z) {
    this.osd.focus(Number(x), Number(y), Number(z))
  }

});


$(function() {
  new Router();
});
