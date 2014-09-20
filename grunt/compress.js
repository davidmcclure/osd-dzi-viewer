

module.exports = {

  dist: {

    cwd: '_site/',
    src: '*',
    dest: 'osd-dzi/',
    expand: true,

    options: {
      archive: 'pkg/osd-dzi-<%= pkg.version %>.tar.gz',
      mode: 'tgz'
    }

  }

};
