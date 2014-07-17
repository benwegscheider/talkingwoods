//module.exports = function(grunt) {
//
//    // Project configuration.
//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
//
////        dirs: {
////            src: 'src/files',
////            dest: 'dist/<%= pkg.name %>/<%= pkg.version %>'
////        },
//        concat: {
//            options: {
//                separator: ';'
//            },
//            mast: {
//                src: [ 'public/master/js/app/**/*.js', 'public/master/js/app/**/*.js'],
//                dest: 'public/master/js/build/masterMin.js'
//            },
//            client: {
//                src: [ 'public/client/js/app/**/*.js', 'public/client/js/app/**/*.js'],
//                dest: 'public/client/js/build/clientMin.js'
//            }
//        },
//
//
//
//        uglify: {
//            mast: {
//                options: {
//                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//                },
//                build: {
//                    src: 'src/<%= pkg.name %>.js',
//                    dest: 'build/<%= pkg.name %>.min.js'
//                },
//                dynamic_mappings: {
//                    // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
//                    // runs and build the appropriate src-dest file mappings then, so you
//                    // don't need to update the Gruntfile when files are added or removed.
//                    files: [
//                        {
//                            expand: true,     // Enable dynamic expansion.
//                            cwd: 'public/',      // Src matches are relative to this path.
//                            src: ['master/js/**/*.js'], // Actual pattern(s) to match.
//                            dest: 'build/',   // Destination path prefix.
//                            ext: '.min.js',   // Dest filepaths will have this extension.
//                            extDot: 'first'   // Extensions in filenames begin after the first dot
//                        }
//                    ]
//                }
//            },
//            client: {
//                options: {
//                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//                },
//                build: {
//                    src: 'src/<%= pkg.name %>.js',
//                    dest: 'build/<%= pkg.name %>.min.js'
//                },
//                dynamic_mappings: {
//                    // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
//                    // runs and build the appropriate src-dest file mappings then, so you
//                    // don't need to update the Gruntfile when files are added or removed.
//                    files: [
//                        {
//                            expand: true,     // Enable dynamic expansion.
//                            cwd: 'public/',      // Src matches are relative to this path.
//                            src: ['client/js/**/*.js'], // Actual pattern(s) to match.
//                            dest: 'build/',   // Destination path prefix.
//                            ext: '.min.js',   // Dest filepaths will have this extension.
//                            extDot: 'first'   // Extensions in filenames begin after the first dot
//                        }
//                    ]
//                }
//            }
//
//        }
//    });
//
//    // Load the plugin that provides the "uglify" task.
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//
//
//    // Default task(s).
//    grunt.registerTask('default', ['concat:mast', 'concat:client']);
//
//};

module.exports = function(grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options:  eval(grunt.file.read('./build.js'))
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task(s).
    grunt.registerTask('default', ['requirejs']);

};
