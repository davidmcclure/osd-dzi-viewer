

module.exports = {

  dist: {
    src: '_site/*',
    options: {
      archive: 'pkg/osd-dzi-<%= pkg.version %>.tar.gz',
      mode: 'tgz'
    }
  }

};
