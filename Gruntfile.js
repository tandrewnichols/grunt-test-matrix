module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadTasks('./tasks');

  grunt.initConfig({
    clean: {
      coverage: ['coverage']
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        eqeqeq: true,
        es3: true,
        indent: 2,
        newcap: true,
        quotmark: 'single',
        boss: true
      },
      all: ['tasks/**/*.js']
    },
    matrix: {
      v4: 'codeclimate-test-reporter < coverage/lcov.info'
    },
    travis: {
      options: {
        targets: {
          test: '{{ version }}',
          when: 'v4',
          tasks: ['istanbul:unit', 'matrix:v4']
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        ui: 'mocha-given',
        require: ['coffee-script/register', 'should', 'should-sinon']
      },
      test: {
        src: ['test/helpers/**/*.coffee', 'test/**/*.coffee']
      }
    },
    mochacov: {
      lcov: {
        options: {
          reporter: 'mocha-lcov-reporter',
          ui: 'mocha-given',
          instrument: true,
          require: ['coffee-script/register', 'should', 'should-sinon'],
          output: 'coverage/coverage.lcov'
        },
        src: ['test/**/*.coffee'],
      },
      html: {
        options: {
          reporter: 'html-cov',
          ui: 'mocha-given',
          require: ['coffee-script/register', 'should', 'should-sinon'],
          output: 'coverage/coverage.html'
        },
        src: ['test/**/*.coffee']
      }
    },
    open: {
      coverage: {
        path: 'coverage/coverage.html'
      }
    },
    watch: {
      tests: {
        files: ['tasks/**/*.js', 'test/**/*.coffee'],
        tasks: ['mocha'],
        options: {
          atBegin: true
        }
      }
    },
    testMatrix: {
      test: {
        task: 'mocha'
      }
    }
  });

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('default', ['jshint:all', 'mocha']);
  grunt.registerTask('coverage', ['mochacov:html']);
  grunt.registerTask('ci', ['jshint:all', 'mocha', 'travis']);
};
