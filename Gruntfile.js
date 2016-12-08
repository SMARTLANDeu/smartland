/*global module*/

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: {
          drop_console: true
        }
      },
      smartland: {
        src: 'public/assets/js/smartland.js',
        dest: 'public/assets/js/smartland.min.js'
      },
      common: {
        src: 'public/assets/js/common.js',
        dest: 'public/assets/js/common.min.js'
      }
    },
    md: {
      pages: {
        options: {
          wrapper: 'wrappers/page.html'
        },
        src: 'public/**/*.md',
        dest: './'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      ng: {
        src: ['src/lib/angular/angular.min.js',
              'src/lib/angular/angular-resource.min.js',
              'src/lib/angular/angular-route.min.js',
              'src/lib/angular/angular-sanitize.min.js',
              'src/lib/angular-ui-router/angular-ui-router.min.js',
              'src/js/ng/app.js',
              'src/js/ng/app.routes.js',
              'src/js/ng/controllers/**/*.controller.js'
             ],
        dest: 'public/assets/js/app.js'
      },
      common: {
        src: ['src/lib/numeral.min.js',
              'src/js/common/events.js'],
        dest: 'public/assets/js/common.js'
      },
      smartland: {
        src: 'src/js/smartland/**/*.js',
        dest: 'public/assets/js/smartland.js'
      }
    },
    watch: {
      smartland: {
        files: ['src/js/smartland/**/*.js'],
        tasks: ['Build-Smartland'],
      },
      ng: {
        files: ['src/js/ng/**/*.js'],
        tasks: ['Build-Ng'],
      }

    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-md');
  // Default task(s).
  grunt.registerTask('Build-Common', ['concat:common', 'uglify:common']);
  grunt.registerTask('Build-Ng', ['concat:ng']);
  grunt.registerTask('Build-Smartland', ['concat:smartland', 'uglify:smartland']);
  grunt.registerTask('Build-All', ['Build-Common', 'Build-Ng', 'Build-Smartland']);

};
