module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
  grunt.registerTask('vendor', ['concat:jsvendor', 'uglify:jsvendor', 'copy:jsvendor']);
 
  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'javascript/*.js'
        ],
        dest: 'public/js/main.min.js'
      },
      jsvendor: {
        options: {
          separator: ';'
        },
        src: [
          ['bower_components/jquery/dist/jquery.js',
          'bower_components/jquery-dropdown/jquery.dropdown.js',
          'bower_components/nested/jquery.nested.js',
          'bower_components/snap.svg/dist/snap.svg.js',
          'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
          'bower_components/select2-ng/select2.min.js'] 
        ],
        dest: 'public/js/vendors.min.js'
      },
    },
    // copy: {
    //   src: [
    //     ['bower_components/jquery/dist/jquery.min.js'] 
    //   ],
    //   dest: 'public/js/vendor.min.js'
    // }
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'public/js/main.min.js': ['public/js/main.min.js']
        }
      },
      jsvendor: {
        files: {
          'public/js/vendors.min.js': ['public/js/vendors.min.js']
        }
      }
    },
    copy: {
      jsvendor: {
        files: [
          {
            expand: true, cwd: 'public/js/',
            src: ['vendors.min.js'], dest: '../public/js/'
          }
        ]
      },
      general: {
        files: [
          {
            expand: true, cwd: 'public/js/',
            src: ['main.min.js'], dest: '../public/js/'
          },{
            expand: true, cwd: 'public/css/',
            src: ['main.css'], dest: '../public/css/'
          }

        ]
      }
    },
    sass: {
      style: {
        files: {
          "public/css/main.css": "sass/main.sass"
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: [ {
          cwd: "jade",
          src: "**/*.jade",
          dest: "public",
          expand: true,
          ext: ".html"
        } ]
      }
    },
    watch: {
      js: {
        files: ['javascript/*.js'],
        tasks: ['concat:js'],// 'uglify:js'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['sass/*.sass'],
        tasks: ['sass:style'],
        options: {
          livereload: true,
        }
      },
      jade: {
        files: ['jade/*.jade'],
        tasks: ['jade:compile'],
        options: {
          livereload: true
        }
      },
      copy: {
        files: ['public/js/main.min.js','public/css/main.css'],
        tasks: ['copy:general'],
        options: {
          livereload: true
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
