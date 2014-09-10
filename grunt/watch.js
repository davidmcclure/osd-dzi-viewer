

module.exports = {

  livereload: {
    files: ['_site/**/*', 'grunt/*'],
    options: { livereload: true }
  },

  jade: {
    files: 'index.jade',
    tasks: 'jade'
  },

  less: {
    files: 'src/**/*.less',
    tasks: 'less'
  }

};
