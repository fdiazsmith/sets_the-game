module.exports = function(grunt) {

   /**
    *
    * Grunt Task Configuration
    *
    */
    // very basic task set up.

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    bower: {
      dev: {
        dest: 'dist/',
        js_dest: 'dist/',
        css_dest: 'dist/'
      }
    },

    clean: {
      //ref: https://github.com/gruntjs/grunt-contrib-clean
      dist: 'dist/*' //deletes files in dist dir   
    },

    concat: { //TODO: Configure Task
      //ref: https://github.com/gruntjs/grunt-contrib-concat
      dist: {
        options: {
          separator: '\n',
          banner: '/**\n * \n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> ' +
                  '<%= grunt.template.today("yyyy.mm.dd") %>\n' +
                  '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
                  '<%= pkg.author ? " * " + pkg.author + "\\n" : "" %>' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %>, License - <%= pkg.license %>\n' +
                  ' *\n */\n'
        },
        src: ['src/path/to/scripts'],
        dest: 'dist/build.js'
      }
    },
    
    connect: { //TODO: Configure Task
      //ref: https://github.com/gruntjs/grunt-contrib-connect
      dev: {
        options: {
          port: 9001,
          base: '.',
          keepalive: true,
          hostname : '*'
        }
      }
    },

    copy: { //TODO: Configure Task

      //ref: https://github.com/gruntjs/grunt-contrib-copy

      dist: { 
        //for copying assets; concat will handle copying script files
        files: [
          {
          expand: true, 
          cwd: 'src/assets_path',
          src: [ ], // include or exclude files to copy
          dest: 'dist/assets_path'
          }
        ]
      }
    },

    open: {
      src: {
        path: 'http:localhost:9001/src'
      }
    },

    watch: { //TODO: Configure Task
      options: {
        livereload: true
      },
      src: {
        files: ['src/**'],
        tasks: [ /*setup tasks to run on watch */ ]
      },
      docs: {
        files: ['src/**'],
        tasks: [ /* tasks to run on watch */ ]
      }
    },
    exec: {
      open_sublime: {
        cwd: '',
        command: 'subl -a .',
        stdout: true,
        stderr: true
      }
    },
  yuidoc: {
    compile: {
      name: '<%= pkg.name %>',
      description: '<%= pkg.description %>',
      version: '<%= pkg.version %>',
      url: '<%= pkg.homepage %>',
      options: {
        paths: 'src/scripts/',
        themedir: 'src',
        outdir: 'docs/'
      }
    }
  }
  });

  /*
   * Load NPM Tasks
   */

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  /*
   * Registered Grunt Tasks
   */

  //development and distribution tasks

  //TODO: Setup Grunt Tasks
  // grunt.registerTask('default', ['clean', 'concat']);
  grunt.registerTask('start', ['exec:open_sublime', 'connect']);

};