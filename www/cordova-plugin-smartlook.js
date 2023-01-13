"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSdk = exports.Command = void 0;
var cordova = window.cordova;
// Plugin name
var SMARTLOOK_PLUGIN = 'SmartlookPlugin';
// Smartlook framework info
var SMARTLOOK_FRAMEWORK = 'CORDOVA';
var SMARTLOOK_FRAMEWORK_VERSION = '-';
var SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = '1.9.5';
// API methods names
var Command;
(function (Command) {
    Command["TEST_SDK"] = "testSdk";
})(Command = exports.Command || (exports.Command = {}));
// Internal logic
var SET_PLUGIN_VERSION = 'setPluginVersion';
// Undefined
var UNDEFINED_FPS = -1;
var UNDEFINED_RENDERING_MODE = '';
var emptyCallback = function () {
    return;
};
function testSdk(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.TEST_SDK, []);
}
exports.testSdk = testSdk;
function execWithCallbacks(successCallback, errorCallback, method, args) {
    if (successCallback === void 0) { successCallback = emptyCallback; }
    if (errorCallback === void 0) { errorCallback = emptyCallback; }
    cordova.exec(successCallback, errorCallback, SMARTLOOK_PLUGIN, method, args);
}
