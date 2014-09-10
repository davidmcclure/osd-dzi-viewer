

require('osd');
var config = require('config');
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var NetworkView = Backbone.View.extend({

  id: 'text',

  /**
   * Initialize Openseadragon.
   */
  initialize: function() {

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

  }

});


var Router = Backbone.Router.extend({

  routes: {
    ':x/:y/:z': 'focus'
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
