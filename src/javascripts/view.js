

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
require('osd');


module.exports = Backbone.View.extend({


  id: 'image',


  /**
   * If necessary, mount a new image.
   *
   * @param {String} group
   * @param {String} image
   * @param {Function} cb
   */
  setImage: function(group, image, cb) {

    var newImage = !(
      this.group == group &&
      this.image == image
    );

    if (newImage) this.mountImage(group, image, cb);
    else cb();

    this.group = group;
    this.image = image;

  },


  /**
   * Instantiate OSD.
   *
   * @param {String} group
   * @param {String} image
   * @param {Function} cb
   */
  mountImage: function(group, image, cb) {

    if (this.osd) this.osd.destroy();

    // Set the tile prefix.
    this.prefix = group+'/'+image+'/';

    // Start OSD.
    this.osd = OpenSeadragon({
      id: this.id,
      tileSources: this.prefix+'/'+image+'.dzi',
      immediateRender: true,
      showNavigationControl: false,
      showNavigator: true
    });

    _.bindAll(this, 'setRoute');

    // Update route on pan/zoom.
    this.osd.addHandler('zoom', _.debounce(this.setRoute, 500));
    this.osd.addHandler('pan',  _.debounce(this.setRoute, 500));

    // Resolve when loaded.
    this.osd.addHandler('open', cb);

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

  }


});
