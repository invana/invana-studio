module.exports = function (grunt) {


    let js_files = [
        "src/scripts/utils.js",
        "src/scripts/d3.graph.js",
        "src/scripts/gremlin-serializer.js",
        "src/scripts/socket.js",
        "src/scripts/graph-studio.js",
    ];

    let file_to_watch = [
        "src/scripts/utils.js",
        "src/scripts/d3.graph.js",
        "src/scripts/gremlin-serializer.js",
        "src/scripts/socket.js",
        "src/scripts/graph-studio.js",
        "src/styles/*.css"

    ];
    grunt.initConfig({

        jshint: {
            files: js_files,
            options: {
                'esversion': 6,
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: js_files,
                dest: 'dist/graph.js',
            },
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["src/**/*.css"],
                dest: "dist/graph.css"
            },
        },
        watch: {
            files: file_to_watch,
            tasks: ['jshint', 'concat', 'concat_css'],

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'concat', 'concat_css',]);

};