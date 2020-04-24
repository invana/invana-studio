module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            files: ['./Gruntfile.js', './src/**/*.js'],
            options: {
                'esversion': 6,
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['./src/**/*.js',],
                dest: './dist/graph.js',
            },
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["./src/**/*.css"],
                dest: "./dist/graph.css"
            },
        },
        watch: {
            files: ['Gruntfile.js', 'src/**/*.js',],
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