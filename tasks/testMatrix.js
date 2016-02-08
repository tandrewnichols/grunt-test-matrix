var yaml = require('travis-yaml');
var n = require('n-run');
var chalk = require('chalk');

module.exports = function(grunt) {
  grunt.registerMultiTask('testMatrix', require('../package').description, function() {
    var done = this.async();
    var options = this.options({ quiet: false, install: 'latest', global: true });
    var task = this.data.task;
    var gruntCommand = options.global ? 'grunt' : './node_modules/.bin/grunt';
    if (typeof task === 'string') {
      task = gruntCommand + ' ' + task;
    } else {
      task.unshift(gruntCommand);
    }
    yaml(function(err, travis) {
      if (err) {
        return done(err);
      }

      var versions = travis.node_js.map(function(version) {
        return version.replace('iojs-v', '');
      });
      versions = options.versions || versions;
      n.run(task, versions, options, done);
    });
  });
};
