module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['js/main.js']
    },

    uglify: {
      // debug: {
      //   src: 'js/main.js',
      //   dest: 'dist/main.js',
      //   options: {
      //     beautify: true
      //   }
      // },
      minified: {
        src: 'js/main.js',
        dest: 'js/main.min.js',
        options: {
          mangle: true,
          compress: true
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/style.css': 'css/scss/style.scss'
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],

      css: {
        files: ['css/scss/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'sass']);

};
