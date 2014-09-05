

var _ = require('lodash');

module.exports = function(grunt, options) {
  return {

    walden: {
      src: 'index.jade',
      dest: '_site/walden.html',
      options: {
        data: _.extend(options.config, {
          slug: 'walden',
          title: 'Walden'
        })
      }
    }

  };
};
