'use strict';
//var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};


module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            scripts: {
                files: ['app/**/*.{js,css,png,jpg,jpeg,webp}'],
                tasks: ['copy:debug']
            },
            compass: {
                files: ['app/**/*.scss'],
                tasks: ['compass:debug']
            },
            jade: {
                files: ['app/**/*.jade'],
                tasks: ['jade:debug']
            },
            html: {
                files: ['app/**/*.html'],
                tasks: ['copy:debug']
            }
        },
        connect: {
            options: {
                port: '9876',
                hostname: '0.0.0.0'
            },
            aliyun: {
              appendProxies: false,
                proxies: [
                    {
                        context: '/api',
                        host: 'www.aliyun.test/promotion/newproductajax',
                        changeOrigin: false
                    }
                ]
            },
            debug: {
                options: {
                    middleware: function(connect) {
                        return [
                        proxySnippet,
                        mountFolder(connect, '.tmp')];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                        mountFolder(connect, 'dist')];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            debug: '.tmp',
            dist: ['dist/*'],
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'app/scripts/{,*/}*.js']
        },
        compass: {
            debug: {
                options: {
                    cssDir: '.tmp',
                    sassDir: 'app',
                    imagesDir: 'app/images',
                    relativeAssets : true,
					httpGeneratedImagesPath : '/images',
					generatedImagesDir : '.tmp/images'
                }
            },
            dist: {
                options: {
                    sassDir: 'app',
                    cssDir: 'dist',
                    imagesDir: 'app/images',
                    environment: 'production',
                    //outputStyle:'expanded',
                }
            }
        },
        jade: {
            debug: {
                options: {
                    data: {
                        debug: true
                    },
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**/*.jade'],
                    dest: '.tmp/',
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    data: {
                        debug: true
                    },
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**/*.jade'],
                    dest: 'dist/',
                    ext: '.html'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/scripts/main.js': [
                        'app/scripts/{,*/}*.js'],
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'dist/images'
                }]
            }
        },
        copy: {
            debug: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['**/*.{css,js,png,jpg,jpeg,html}'],
                    dest: '.tmp'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['**/*.{css,js,png,jpg,jpeg,svg,eot,ttf,woff}'],
                    dest: 'dist'
                }]
            }
        }
    });

	grunt.loadNpmTasks('grunt-devtools');

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:debug',
            'compass:debug',
            'jade:debug',
            'connect:debug',
            'configureProxies:aliyun',
            'copy:debug',
            'open',
            'watch']);
    });

    grunt.registerTask('test', [

    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'jade:dist',
        'imagemin',
        'uglify',
        'copy:dist']);

    grunt.registerTask('default', [
        'server','jshint']);
};
