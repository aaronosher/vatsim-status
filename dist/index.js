"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var statusFile_1 = require("./statusFile");
/**
 *
 */
var VatsimStatus = /** @class */function () {
    function VatsimStatus() {}
    return VatsimStatus;
}();
var statusFile = new statusFile_1.StatusFile(function (file) {
    console.log(file);
});