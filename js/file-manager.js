(function () {
    'use strict';

    module.exports = FileManager;

    var fs = require('fs');
    // var EventEmitter = require('events').EventEmitter;
    // var inherits = require('inherits');

    function FileManager() {
    }
    // inherits(FileManager, EventEmitter);

    FileManager.prototype.openFile = fs.readFile;
    FileManager.prototype.saveFile = fs.writeFile;
}());
