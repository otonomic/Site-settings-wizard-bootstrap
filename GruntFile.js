module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        scsslint: {
            allFiles: [
                'src/scss/*.scss'
            ],
            options: {
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'dist/css',
                    sourcemap: true,
                    force: true
                }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'dist/'}
                ]
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'tests/**/*.js', 'src/js/**/*.js']
        },

        imagemin: {
            options: {
                cache: false
            },

            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },

        watch: {
            sass: {
                files : ['src/scss/**/*.scss', '!*tmp*.js'],
                tasks : ['compass']
            },
            html: {
                files : ['src/html/**/*.html'],
                tasks : ['copy']
            },
            js: {
                files : ['src/js/**/*.js'],
                tasks : ['jshint']
            }
        }
    });

    grunt.registerTask('build', ['imagemin', 'compass', 'jshint', 'copy']);
    grunt.registerTask('default', ['compass', 'jshint', 'copy', 'watch']);
};