

require('osd');
var config = require('config');

// Spin up OSD.
var viewer = OpenSeadragon({

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
