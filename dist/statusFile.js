"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Aaron Osher <aaron@aaronosher.io>
 */
var request_1 = require("request");
var config_1 = require("./config");
/**
 * Class for loading the VATSIM status file
 */
var StatusFile = /** @class */function () {
    /**
     * constructor loads file and then passes the file to the callback
     * @param {Function}
     */
    function StatusFile(callback) {
        var _this = this;
        this.loadOptions(function () {
            _this.selectOption();
            _this.loadFile(callback);
        });
    }
    /**
     * Gets the status file options from the status file url
     * @param {Function}
     */
    StatusFile.prototype.loadOptions = function (callback) {
        var _this = this;
        request_1.get(config_1.default.statusUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var bodyArray = void 0;
                bodyArray = body.split("\n");
                bodyArray.forEach(function (val, i) {
                    if (val.substr(0, config_1.default.statusFileStartIndex) === config_1.default.statusFileIdent) {
                        var url = val.substr(config_1.default.statusFileStartIndex);
                        url = url.split("\r")[0];
                        if (!_this.options) {
                            _this.options = [url];
                        } else {
                            _this.options.push(url);
                        }
                    }
                });
                callback();
            }
        });
    };
    /**
     * Randomly selects a file
     */
    StatusFile.prototype.selectOption = function () {
        this.url = this.options[Math.floor(Math.random() * this.options.length)];
    };
    /**
     * Retrieves status file and passess it to callback
     * @param {Function}
     */
    StatusFile.prototype.loadFile = function (callback) {
        var _this = this;
        request_1.get(this.url.toString(), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                _this.file = body;
                callback(_this.file);
            }
        });
    };
    return StatusFile;
}();
exports.StatusFile = StatusFile;