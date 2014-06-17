/**
 * @author Nate Johnson
 */
module.exports = function(grunt) {
    var globalConfig = {
        src : 'src',
        dest : 'dist',
        spec : 'test'
    };

    if (grunt.file.exists('conf/jsHint.json')) {
        var jsHintOptions = grunt.file.readJSON('conf/jsHint.json');
    }

    grunt.initConfig({
        globalConfig : globalConfig,
        pkg : grunt.file.readJSON('package.json'),
        stylus : {
            buildall : {
                options : {
                    urlfunc: 'embedurl',
                },
                files : [{
                    expand : true,
                    cwd : '<%= globalConfig.src %>/',
                    src : ['**/*.styl'],
                    dest : '<%= globalConfig.dest %>/',
                    ext : '.css'
                }]
            }
        },
        watch : {
            options : {
                dateFormat : function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            scripts : {
                // files : ['**/*.styl'],
                // tasks : ['stylus'],
                files : ['**/*.styl', '**/*.js'],
                tasks : ['build'],
                options : {
                    spawn : false,
                }
            }
        },
        jshint : {
            options : jsHintOptions,
            all : ['<%= globalConfig.src %>/js/validator.js']
        },
        jasmine : {
            yourTask : {
                src : '<%= globalConfig.src %>/js/**/*.js',
                options : {
                    specs : '<%= globalConfig.spec %>/**/*.js',
                    keepRunner: true
                }
            }
        },
        uglify : {
            options : {
                mangle : false,
                banner : '/**\n * <%= pkg.name %> - <%= pkg.description %>\n * \n * @version <%= pkg.version %>\n * @author <%= pkg.author %>\n * @license MIT\n */\n\n'
            },
            my_target : {
                files : {
                    // '<%= globalConfig.dest %>/js/<%= pkg.name %>-<%= pkg.version %>.min.js' : '<%= globalConfig.src %>/js/**/*.js'
                    '<%= globalConfig.dest %>/js/<%= pkg.name %>-<%= pkg.version %>.min.js' : '<%= globalConfig.src %>/js/validator.js'
                }
            }
        },
        copy : { 
            main : { 
                files :[
                    {
                        expand : true, 
                        flatten : true,
                        src : ['<%= globalConfig.dest %>/js/<%= pkg.name %>-<%= pkg.version %>.min.js'],
                        dest : './',
                        filter : 'isFile'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['jshint', 'jasmine', 'stylus', 'uglify', 'copy']);
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['build']);
};
