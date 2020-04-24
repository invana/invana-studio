module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/**/*.js',],
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
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('watch', ['watch']);

};