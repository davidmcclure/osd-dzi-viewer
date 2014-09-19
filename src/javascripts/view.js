

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Q = require('q');
require('osd');


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

    var deferred = Q.defer();
    if (this.g == group && this.s == slug) deferred.resolve();
    if (this.osd) this.destroy();

    this.prefix = group+'/'+slug+'/';

    this.osd = OpenSeadragon({

      id: 'image',

      tileSources: this.prefix+'/'+slug+'.dzi',

      immediateRender: true,
      showNavigationControl: false,
      showNavigator: true

    });

    _.bindAll(this, 'setRoute');

    // Update route when the viewport is panned or zoomed.
    this.osd.addHandler('zoom', _.debounce(this.setRoute, 500));
    this.osd.addHandler('pan',  _.debounce(this.setRoute, 500));

    // Resolve when the source is loaded.
    this.osd.addHandler('open', deferred.resolve);

    this.g = group;
    this.s = slug;

    return deferred.promise;

  },


  /**
   * Apply a x/y/z focus position.
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  focus: function(x, y, z) {
    this.osd.viewport.panTo(new OpenSeadragon.Point(x, y));
    this.osd.viewport.zoomTo(z);
  },


  /**
   * Update the route.
   */
  setRoute: function() {

    var c = this.osd.viewport.getCenter();
    var z = this.osd.viewport.getZoom();

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
    this.osd.destroy();
  }


});
