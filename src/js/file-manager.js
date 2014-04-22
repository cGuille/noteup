(function () {
    'use strict';

    module.exports = FileManager;

    var fs = require('fs');
    var EventEmitter = require('events').EventEmitter;
    var inherits = require('util').inherits;

    var EVENT_ANY = 'event';
    var EVENT_ACTION = 'action';
    var EVENT_RESULT = 'result';
    var EVENT_ERROR = 'error';
    var EVENT_OPEN = 'open';
    var EVENT_OPENED = 'opened';
    var EVENT_SAVE = 'save';
    var EVENT_SAVED = 'saved';
    var EVENT_EXPORT = 'export';
    var EVENT_EXPORTED = 'exported';

    /**
     * A file manager for the epic editor.
     * @param {EpicEditor} editor
     */
    function FileManager(editor) {
        this.editor = editor;
        this.on('error', function (error) {
            console.error(error);
        });
    }
    inherits(FileManager, EventEmitter);

    /**
     * Open the specified file in epic editor
     * @param  {string} file_path
     * @event open opened error
     */
    FileManager.prototype.openFile = function (file_path) {
        var self = this;
        var editor = this.editor;

        emitOpen(this, file_path);

        fs.readFile(file_path, function (error, file_content) {
            if (error) {
                emitError(self, error);
                return;
            }
            file_content = file_content.toString();
            editor.importFile(editor.settings.file.name, file_content);
            emitOpened(self, file_content, file_path);
        });
    };

    /**
     * Save the currently edited file into the specified location
     * @param  {string} file_path
     * @event save saved error
     */
    FileManager.prototype.saveFile = function (file_path) {
        var self = this;
        var content = this.editor.exportFile(this.editor.settings.file.name);

        emitSave(this, content, file_path);

        fs.writeFile(file_path, content, function (error) {
            if (error) {
                emitError(self, error);
                return;
            }
            emitSaved(self, content, file_path);
        });
    };

    /**
     * Export the currently edited file to the specified location, in the specified format
     * @param  {string} file_path
     * @param  {string} format an epic editor supported file format
     * @event save saved error
     */
    FileManager.prototype.exportFile = function (file_path, format) {
        var self = this;
        var content = this.editor.exportFile(this.editor.settings.file.name, format);

        emitExport(this, content, file_path, format);

        fs.writeFile(file_path, content, function (error) {
            if (error) {
                emitError(self, error);
                return;
            }
            emitExported(self, content, file_path, format);
        });
    };


    /* End of public API, here start the private routines */

    /* Error event */
    /**
     * @param  {EventEmitter} emitter
     * @param  {any} error
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitError(emitter, error) {
        var event = {
            type: EVENT_ERROR,
            error: error
        };

        emitter.emit(EVENT_ANY, event);
        return emitter.emit(EVENT_ERROR, event);
    }

    /* Action events */
    /**
     * @param  {EventEmitter} emitter
     * @param  {any} event
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitAction(emitter, event) {
        emitter.emit(EVENT_ANY, event);
        return emitter.emit(EVENT_ACTION, event);
    }

    /**
     * @param  {EventEmitter} emitter
     * @param  {string} file_path
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitOpen(emitter, file_path) {
        var event = {
            type: EVENT_OPEN,
            file_path: file_path
        };

        emitAction(emitter, event);
        return emitter.emit(EVENT_OPEN, event);
    }

    /**
     * @param  {EventEmitter} emitter
     * @param  {string} data
     * @param  {string} file_path
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitSave(emitter, data, file_path) {
        var event = {
            type: EVENT_SAVE,
            data: data,
            file_path: file_path
        };

        emitAction(emitter, event)
        return emitter.emit(EVENT_SAVE, event);
    }

    /**
     * @param  {EventEmitter} emitter
     * @param  {string} data
     * @param  {string} file_path
     * @param  {string} format
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitExport(emitter, data, file_path, format) {
        var event = {
            type: EVENT_EXPORT,
            data: data,
            file_path: file_path,
            format: format
        };

        emitAction(emitter, event)
        return emitter.emit(EVENT_EXPORT, event);
    }

    /* Result events */
    /**
     * @param  {EventEmitter} emitter
     * @param  {any} event
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitResult(emitter, event) {
        emitter.emit(EVENT_ANY, event);
        return emitter.emit(EVENT_RESULT, event);
    }

    /**
     * @param  {EventEmitter} emitter
     * @param  {string} data
     * @param  {string} file_path
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitOpened(emitter, data, file_path) {
        var event = {
            type: EVENT_OPENED,
            data: data,
            file_path: file_path
        };

        emitResult(emitter, event);
        return emitter.emit(EVENT_OPENED, event);
    }

    /**
     * @param  {EventEmitter} emitter
     * @param  {string} data
     * @param  {string} file_path
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitSaved(emitter, data, file_path) {
        var event = {
            type: EVENT_SAVED,
            data: data,
            file_path: file_path
        };

        emitResult(emitter, event);
        return emitter.emit(EVENT_SAVED, event);
    }

    /**
     * @param  {EventEmitter} emitter
     * @param  {string} data
     * @param  {string} file_path
     * @param  {string} format
     * @return {boolean} Returns true if event had listeners, false otherwise.
     */
    function emitExported(emitter, data, file_path, format) {
        var event = {
            type: EVENT_EXPORTED,
            data: data,
            file_path: file_path,
            format: format
        };

        emitResult(emitter, event);
        return emitter.emit(EVENT_EXPORTED, event);
    }
}());
