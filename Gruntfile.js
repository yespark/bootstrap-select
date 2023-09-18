module.exports = function (grunt) {
  // From TWBS
  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    clean: {
      css: 'dist/css',
      js: 'dist/js',
      docs: 'docs/docs/dist'
    },

    eslint: {
      gruntfile: {
        options: {
          overrideConfigFile: 'js/.eslintrc.node.json'
        },
        src: 'Gruntfile.js'
      },
      main: {
        src: 'js/*.js',
        options: {
          overrideConfigFile: 'js/.eslintrc.browser.json'
        }
      },
      i18n: {
        src: 'js/i18n/*.js',
        options: {
          overrideConfigFile: 'js/.eslintrc.browser.json'
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
        sourceMap: false
      },
      main: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.js',
        options: {
          banner: grunt.file.read('js/umd-intro.js'),
          footer: grunt.file.read('js/umd-outro.js')
        }
      },
      i18n: {
        expand: true,
        src: '<%= eslint.i18n.src %>',
        dest: 'dist/',
        options: {
          banner: grunt.file.read('js/umd-intro.js'),
          footer: grunt.file.read('js/umd-outro.js')
        }
      }
    },

    'dart-sass': {
      options: {
        implementation: require('dart-sass'),
        sourceMap: false
      },
      css: {
        src: 'sass/<%= pkg.name %>.scss',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    copy: {
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/docs/dist/'
      }
    },

    csslint: {
      options: {
        'adjoining-classes': false,
        'box-sizing': false,
        'box-model': false,
        'compatible-vendor-prefixes': false,
        'floats': false,
        'font-sizes': false,
        'gradients': false,
        'important': false,
        'known-properties': false,
        'outline-none': false,
        'qualified-headings': false,
        'regex-selectors': false,
        'shorthand': false,
        'text-indent': false,
        'unique-headings': false,
        'universal-selector': false,
        'unqualified-attributes': false,
        'overqualified-elements': false
      },
      css: {
        src: '<%= sass.css.dest %>'
      }
    },

    version: {
      js: {
        options: {
          prefix: 'Selectpicker.VERSION = \''
        },
        src: [
          'js/<%= pkg.name %>.js'
        ]
      },
      docs: {
        options: {
          prefix: '<%= pkg.name %>/archive/v',
          replace: '[0-9a-zA-Z\\-_\\+\\.]+)([^/]+(?=\.zip+)'
        },
        src: [
          'README.md',
          'docs/docs/index.md'
        ]
      },
      default: {
        options: {
          prefix: '[\'"]?version[\'"]?:[ "\']*'
        },
        src: [
          'docs/mkdocs.yml',
          'package.json'
        ]
      }
    },

    watch: {
      gruntfile: {
        files: '<%= eslint.gruntfile.src %>',
        tasks: 'eslint:gruntfile'
      },
      js: {
        files: ['<%= eslint.main.src %>', '<%= eslint.i18n.src %>'],
        tasks: 'build-js'
      },
      sass: {
        files: 'sass/**/*.scss',
        tasks: 'build-css'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  // Version numbering task.
  // to update version number, use grunt version::x.y.z

  // CSS distribution
  grunt.registerTask('build-css', ['clean:css', 'dart-sass']);

  // JS distribution
  grunt.registerTask('build-js', ['clean:js', 'eslint', 'concat']);

  // Copy dist to docs
  grunt.registerTask('copy-docs', ['clean:docs', 'copy:docs']);

  // Build CSS & JS
  grunt.registerTask('build', ['build-css', 'build-js']);

  // Development watch
  grunt.registerTask('dev-watch', ['build', 'watch']);

  // Default task.
  grunt.registerTask('default', 'build');

  // Linting
  grunt.registerTask('lint', 'eslint');

  // Debug
  grunt.registerTask('debug', 'Debugging the grunt setup', function () {
    console.log('Available tasks are: ', grunt.task._tasks);
  });
};
