jQuery(function () {
    'use strict';

    var HANDLERS_ATTR = 'data-file-dialog-handler';

    var $file_dialog_handlers = $('[' + HANDLERS_ATTR + ']');

    $file_dialog_handlers.on('click', function (event) {
        var $file_dialog_handler = $(event.currentTarget);
        var input_file_name = $file_dialog_handler.attr(HANDLERS_ATTR);
        var $input_file = $('input[type=file][name=' + input_file_name + ']');
        $input_file.click();
    });
});
