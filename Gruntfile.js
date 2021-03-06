module.exports = function(grunt) {


    grunt.initConfig({
        jshint: {
            files: ['src/**/*.js'],
            options: {
                globals: {
                    angular: true
                }
            }
        },
        uglify: {
            source: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/ng-backstretch.min.js': ['src/ng-backstretch.js']
                }
            }
        },
        copy: {
            source: {
                files: [
                    {'dist/ng-backstretch.js': ['src/ng-backstretch.js']}
                ]
            }
        },
        karma: {
            unit: {
                options: {
                    background: true,
                    singleRun: false,
                    browsers: ['phantomJS'],
                    plugins: ['karma-jasmine', 'karma:coverage', 'karma-phantomjs-launcher'],
                    files: [
                        'bower_components/angular/angular.js',
                        'src/**/*.js'
                    ],
                }
            }
        },
        watch: {
            files: ['src/**/*.js'],
            tasks: ['jshint', 'karma:unit:run']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['jshint', 'uglify:source', 'copy:source']);
};
