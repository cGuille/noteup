(function () {
    'use strict';

    var FileManager = require('./js/file-manager');

    var keys = {
        escape: 27
    };
    var WORKING_FILE_NAME = 'working-file';

    var file_manager = new FileManager();

    var editor = new EpicEditor({
        basePath: 'lib/EpicEditor-v0.2.2/',
        focusOnLoad: true,
        button: false,
        autogrow: true,
        file: {
            name: WORKING_FILE_NAME,
            autoSave: 3000,
        }
    });

    editor.load(function () {
        window.editor = editor;//DEBUG
    });

    jQuery(function () {
        $('input[type=file][name=file-to-open]').on('change', handleFile(function (file_path) {
            file_manager.openFile(file_path, function (error, file_content) {
                if (error) {
                    throw error;
                }
                editor.importFile(WORKING_FILE_NAME, file_content.toString());
            });
        }));

        $('input[type=file][name=file-to-save]').on('change', handleFile(function (file_path) {
            var content = editor.exportFile(WORKING_FILE_NAME);
            file_manager.saveFile(file_path, content, function (error) {
                if (error) {
                    throw error;
                }
            });
        }));

        $('input[type=file][name=file-to-export]').on('change', handleFile(function (file_path) {
            var content = editor.exportFile(WORKING_FILE_NAME, 'html');
            file_manager.saveFile(file_path, content, function (error) {
                if (error) {
                    throw error;
                }
            });
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
}());
