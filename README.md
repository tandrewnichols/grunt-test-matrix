[![Build Status](https://travis-ci.org/tandrewnichols/grunt-test-matrix.png)](https://travis-ci.org/tandrewnichols/grunt-test-matrix) [![downloads](http://img.shields.io/npm/dm/grunt-test-matrix.svg)](https://npmjs.org/package/grunt-test-matrix) [![npm](http://img.shields.io/npm/v/grunt-test-matrix.svg)](https://npmjs.org/package/grunt-test-matrix) [![Code Climate](https://codeclimate.com/github/tandrewnichols/grunt-test-matrix/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/grunt-test-matrix) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/grunt-test-matrix/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/grunt-test-matrix) [![dependencies](https://david-dm.org/tandrewnichols/grunt-test-matrix.png)](https://david-dm.org/tandrewnichols/grunt-test-matrix)

# grunt-test-matrix

Run a grunt command against your travis test matrix

![Demo](demo.gif)

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-test-matrix --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-test-matrix');
```

Alternatively, install [task-master](http://github.com/tandrewnichols/task-master) and let it manage this for you.

## The "testMatrix" task

### Overview

In your project's Gruntfile, add a section named `testMatrix` to the data object passed into `grunt.initConfig()`. Each target must have, at minimum, a `task` property. `task` can be a string of space separated tasks and/or arguments to pass to grunt or an array of tasks and/or arguments.

```js
grunt.initConfig({
  testMatrix: {
    mocha: {
      task: 'mocha:unit mocha:integration'
    },
    karma: {
      task: ['coffee', 'build', 'karma']
    }
  }
});
```

### Options

#### quiet

Suppress logging. Default false.

#### global

Prefix the beginning of the command with the global npm binary path. Default true. Note that `grunt` is added to the command you pass in, so changing this to `false` will probably make grunt explode, unless you have a local copy of grunt in your root directory.

#### install

Set to true to install _only_ missing node.js versions or to false to skip missing versions. The default is `'latest'` which means, install the most recent node version matching a range, even if another installed version satisfies that range. This is the default because it's closest to how your code will run on travis.

#### versions

By default, `testMatrix` uses the versions of node specified in your `.travis.yml` file, but you can override that with this property.

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
