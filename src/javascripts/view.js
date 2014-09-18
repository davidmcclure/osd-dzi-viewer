

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
require('ol');


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

    //this.options = opts;

    //// Build the tile source prefix.
    //this.prefix = opts.group+'/'+opts.slug+'/';

    //var size = this.options.size;

    //var proj = new ol.proj.Projection({
      //code: 'ZOOMIFY',
      //extent: [0, 0, size, size],
      //units: 'pixels'
    //});

    //var source = new ol.source.Zoomify({
      //url: this.prefix,
      //crossOrigin: 'anonymous',
      //size: [size, size]
    //});

    //this.map = new ol.Map({

      //target: 'image',

      //view: new ol.View({
        //projection: proj,
        //center: [size/2, -size/2],
        //zoom: 0
      //}),

      //layers: [
        //new ol.layer.Tile({
          //source: source
        //})
      //]

    //});var imgWidth = 9911;

    var imgWidth = 20000;
    var imgHeight = 20000;
    var url = 'mental-maps/test/';
    var crossOrigin = 'anonymous';

    var imgCenter = [10000, -10000];

    // Maps always need a projection, but Zoomify layers are not geo-referenced, and
    // are only measured in pixels.  So, we create a fake projection that the map
    // can use to properly display the layer.
    var proj = new ol.proj.Projection({
      code: 'ZOOMIFY',
      units: 'pixels',
      extent: [0, 0, imgWidth, imgHeight]
    });

    var source = new ol.source.Zoomify({
      url: url,
      size: [imgWidth, imgHeight],
      crossOrigin: crossOrigin
    });

    var map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: source
        })
      ],
      target: 'image',
      renderer: 'dom',
      view: new ol.View({
        projection: proj,
        center: imgCenter,
        zoom: 0
      })
    });

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

    Backbone.history.navigate(this.prefix+x+'/'+y+'/'+z, {
      replace: true
    });

  },

  /**
   * Tear down the viewer.
   */
  destroy: function() {
    // TODO
  }

});
