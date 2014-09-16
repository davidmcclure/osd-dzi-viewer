

var _ = require('lodash');

module.exports = function(grunt, options) {
  return {

    war_and_peace: {
      src: 'index.jade',
      dest: '_site/war-and-peace.html',
      options: {
        data: _.extend(options.config, {
          slug: 'war-and-peace',
          title: 'War and Peace'
        })
      }
    }

  };
};
