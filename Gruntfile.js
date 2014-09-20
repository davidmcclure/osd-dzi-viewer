

module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    jitGrunt: true,
    data: { pkg: pkg }
  });

};
