

module.exports = {

  livereload: {
    files: '_site/**/*',
    options: { livereload: true }
  },

  jade: {
    files: 'index.jade',
    tasks: 'jade'
  },

  less: {
    files: 'assets/**/*.less',
    tasks: 'less'
  }

};
