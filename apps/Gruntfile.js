module.exports = function(grunt) {
    'use strict';

    var pkg = require('../package.json');

    grunt.initConfig({
        // bgShell: {
        //     runNode:{
        //         cmd: 'node -v',
        //         bg: true
        //     }
        // },

        less: {
            production: {
                options: {
                    modifyVars: { 'base-url': '".."' }
                    //paths: [""],
                    //cleancss: true
                },
                files: {"temp/style/style.css":"www_src/style/less/style.less"}
            }
        },

        clean: {
            options:{ force: true },
            pre: { src: ['temp'] },
            pos: { src: ['temp', 'www/style/less'] }
        },

        copy: {
            main: {
                files: [
                    {cwd: 'www_src/', src: ['**'], dest: 'www/', expand:true},
                    {cwd: 'temp/', src: ['**'],dest: 'www/', expand:true}
                ]
            }
        },

        dom_munger: {
            upd: {
                options: {
                    remove: ['[munger-remove]']
                },
                src: 'www_src/index.html',
                dest:'temp/index.html'
            }
        },

        exec: {
            run: {
                cmd: function(command) {
                    return command;
                },
                stdout:true,
                stderror:true
            },
        },

        watch: {}
        
    });

    grunt.event.on('watch', function(action, filepath) {
        
    });

    var cwd = process.cwd();
    process.chdir(__dirname + '/..');
    require('load-grunt-tasks')(grunt);
    process.chdir(cwd);

    //General Commands
    grunt.registerTask('rga', //Run Google Android: Compiles www_src and runs in device
        [ 'compile', 'exec:run:cordova run android' ]);

    grunt.registerTask('pga', //Prepare Google Android: Compiles www_src and prepares the platform
        [ 'compile', 'exec:run:cordova prepare android' ]);

    grunt.registerTask('rai', //Run Apple iOS: Compiles www_src and runs in device
        [ 'compile', 'exec:run:cordova run ios' ]);

    grunt.registerTask('pai', //Prepare Apple iOS: Compiles www_src and prepares the platform
        [ 'compile', 'exec:run:cordova prepare ios' ]);

    //Specific Commands
    grunt.registerTask('compile', [
        'clean:pre','less', 'dom_munger:upd','copy', 'clean:pos'
    ]);

    //grunt.registerTask('server', ['bgShell:runNode', 'compile', 'watch']);  
};
