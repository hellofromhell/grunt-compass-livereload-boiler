module.exports = function(grunt) {

  "use strict";
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/*.js'],
        dest: 'build/main.js',
      },
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './'
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'server/css/styles.min.css': ['build/styles.css']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'server/images/'
        }]
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'css',
          cssDir: 'build'
        }
      }
    },

    uglify: {
      build: {
        src: 'build/main.js',
        dest: 'server/js/main.min.js'
      }
    },

    open: {
      dev: {
        path: 'http://127.0.0.1:8000',
        app: 'Chrome'
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['compass', 'cssmin'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      },
      html:{
        files: ['./**/*.html'],
        tasks: [],
        options: {
          spawn: false
        }
      }
    }

  });

  // register tasks
  grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'compass', 'imagemin', 'cssmin']);
  grunt.registerTask('dev', ['open', 'connect', 'watch']);
};