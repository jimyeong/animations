// gruntFile composition
// task setting
// trigerring setting in watch field
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass_globbing: {
      your_target: {
        files: {
          "assets/scss/style.scss": "assets/scss/lib/**/*.scss",
        },
        options: {
          useSingleQuotes: false,
          signature: "//Hello, World!",
        },
      },
    },
    browserify: {
      client: {
        src: ["assets/js/index.js"],
        dest: "assets/js/bundle.js",
      },
    },
    sass: {
      dist: {
        files: { "assets/css/style.css": "assets/scss/style.scss" },
      },
    },
    jshint: {
      all: {
        src: ["*.js"],
      },
    },
    includereplace: {
      your_target: {
        options: {
          // Task-specific options go here.
        },
        // Files to perform replacements and includes with
        src: "html/*.html",
        // Destination directory to copy files to
        dest: "dist/",
      },
    },
    watch: {
      gruntfile: {
        files: "Gruntfile.js", // grunt파일 변경되면 서버 리로드됨
        tasks: ["jshint:gruntfile"],
        options: {
          livereload: true,
        },
      },
      src: {
        files: ["*.html"],
        options: {
          livereload: true,
        },
      },
      css: {
        files: ["assets/scss/**/*.scss"], // 해당 파일이 변경되면 리로드되게 된다.
        tasks: ["sass"],
        options: {
          livereload: true,
        },
      },
      js: {
        files: ["assets/js/index.js"],
        tasks: ["browserify"],
      },
    },
    connect: {
      server: {
        options: {
          livereload: true,
          port: 9000,
        },
      },
    },
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-sass-globbing");
  grunt.loadNpmTasks("grunt-contrib-sass");

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-browserify");
  // grunt.loadNpmTasks('grunt-include-replace');

  // grunt.registerTask('default',["sass",'connect:server', 'watch:server' ]);
  grunt.registerTask("default", ["connect", "watch"]);
  grunt.registerTask("scss", ["sass"]);
  grunt.registerTask("jshint", ["jshint"]); // 확인해볼것 뭔지
  grunt.registerTask("globbing", ["sass_globbing"]);
  grunt.registerTask("browserify", ["browserify"]);
};
