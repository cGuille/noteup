module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        nodewebkit: {
            options: {
                app_name: 'NoteUp',
                build_dir: './builds',
                mac: true,
                win: true,
                linux32: true,
                linux64: true,
                force_download: false,
                keep_nw: false
            },
            src: [ 'src/**/*', 'node_modules/**/*' ]
        },
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
};
