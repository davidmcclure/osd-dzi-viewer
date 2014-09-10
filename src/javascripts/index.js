

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
            Height: 10000,
            Width: 10000
          }
        }
      }

    });

    // When the viewport is panned or zoomed.
    this.viewer.addHandler('zoom', _.debounce(this.setRoute, 500));
    this.viewer.addHandler('pan',  _.debounce(this.setRoute, 500));

  },

  /**
   * Update the route.
   */
  setRoute: function() {

    var focus = this.viewer.viewport.getCenter();
    var level = this.viewer.viewport.getZoom();

    var x = focus.x.toFixed(4);
    var y = focus.y.toFixed(4);
    var z = level.toFixed(4);

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
    this.viewer = new View();
  },

  /**
   * Focus on a specific location.
   *
   * @param {String} x
   * @param {String} y
   * @param {String} z
   */
  focus: function(x, y, z) {
    console.log(x, y, z);
  }

});


$(function() {
  new Router();
  Backbone.history.start();
});
