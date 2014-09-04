

var _ = require('lodash');

module.exports = function(grunt, options) {
  return {

    war_and_peace: {
      src: 'index.jade',
      dest: '_site/war-and-peace.html',
      options: {
        data: {
          config: _.extend(options.config, {
            slug: 'walden',
            title: 'War and Peace'
          })
        }
      }
    }

  };
};
