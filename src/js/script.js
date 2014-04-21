(function () {
    'use strict';

    var VERBOSE = true;
    var argv = require('nw.gui').App.argv;
    var FileManager = require('./js/file-manager');

    var $window = $(window);
    var keys = {
        escape: 27
    };
    var WORKING_FILE_NAME = 'working-file';

    var editor = new EpicEditor({
        basePath: 'lib/EpicEditor-v0.2.2/',
        focusOnLoad: true,
        button: false,
        autogrow: false,
        file: {
            name: WORKING_FILE_NAME,
            autoSave: 3000,
        }
    });

    var file_manager = new FileManager(editor);
    if (VERBOSE) {
        file_manager.on('event', function (event) {
            if (event.type !== 'error') {
                console.log(event.type, event);
            }
        });
    }

    editor.load(function () {
        // editor.reflow();
        if (argv.length) {
            file_manager.openFile(argv.join(' '));
        }

        jQuery(function () {
            var $toolbar = $('#toolbar');
            $window.on('scroll', function () {
                $toolbar.toggleClass('sticky', $window.scrollTop() > 0);
            });

            var $editor = $(editor.element);
            $editor.removeAttr('style');

            $('input[type=file][name=file-to-open]').on('change', handleFile(function (file_path) {
                file_manager.openFile(file_path);
            }));

            $('input[type=file][name=file-to-save]').on('change', handleFile(function (file_path) {
                file_manager.saveFile(file_path);
            }));

            $('input[type=file][name=file-to-export]').on('change', handleFile(function (file_path) {
                file_manager.exportFile(file_path, 'html');
            }));

            function handleFile(processor) {
                return function (event) {
                    var $input_file = $(event.currentTarget);
                    var file_path = $input_file.val();

                    if (!file_path) {
                        return;
                    }
                    $input_file.val('');
                    processor(file_path);
                };
            }

            $('button#fullscreen').on('click', function () {
                editor.enterFullscreen();
            });

            $(window).on('keyup', function (event) {
                if (editor.is('fullscreen') && event.keyCode === keys.escape) {
                    editor.exitFullscreen();
                }
            });

            $('input[type=radio][name=mode-choice]').on('change', function (event) {
                var $selected = event.currentTarget;
                try {
                    editor[$selected.value]();
                } catch (error) {
                    throw new Error('unknown mode `' + $selected.value + '`');
                }
            });
        });
    });
}());
