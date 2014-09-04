

module.exports = function(grunt) {

  var config = grunt.file.readJSON('config.json');
  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    data: { config: config },
    jitGrunt: true
  });

};
