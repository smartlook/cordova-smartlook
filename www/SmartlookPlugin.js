var exec = require('cordova/exec');

// Plugin name
const SMARTLOOK_PLUGIN = "SmartlookPlugin"

// API methods names
const SETUP_AND_START_RECORDING = "setupAndStartRecording";
const SETUP = "setup";
const START_RECORDING = "startRecording";
const STOP_RECORDING = "stopRecording";
const IS_RECORING = "isRecording";
const START_FULLSCREEN_SENSITIVE_MODE = "startFullscreenSensitiveMode";
const STOP_FULLSCREEN_SENSITIVE_MODE = "stopFullscreenSensitiveMode";
const IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE = "isFullscreenSensitiveModeActive";
const SET_USER_IDENTIFIER = "setUserIdentifier";
const START_TIMED_CUSTOM_EVENT = "startTimedCustomEvent";
const TRACK_CUSTOM_EVENT = "trackCustomEvent";
const SET_GLOBAL_EVENT_PROPERTIES = "setGlobalEventProperties";
const SET_GLOBAL_EVENT_PROPERTY = "setGlobalEventProperty";
const REMOVE_GLOBAL_EVENT_PROPERTY = "removeGlobalEventProperty";
const REMOVE_ALL_GLOBAL_EVENT_PROPERTIES = "removeAllGlobalEventProperties";

var emptyCallback = function() { return; };

exports.setupAndStartRecording = function (params) {
    if (params["smartlookAPIKey"] != undefined) {
        if (params["fps"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP_AND_START_RECORDING, [params["smartlookAPIKey"], params["fps"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP_AND_START_RECORDING, [params["smartlookAPIKey"]]);
        }
    }
};

exports.setup = function (params) {
    if (params["smartlookAPIKey"] != undefined) {
        if (params["fps"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP, [params["smartlookAPIKey"], params["fps"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP, [params["smartlookAPIKey"]]);
        }
    }
};

exports.startRecording = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, START_RECORDING, []);
};

exports.stopRecording = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, STOP_RECORDING, []);
};

exports.isRecording = function (result) {
    exec(result, emptyCallback, SMARTLOOK_PLUGIN, IS_RECORING, []);
};

exports.startFullscreenSensitiveMode = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, START_FULLSCREEN_SENSITIVE_MODE, []);
};

exports.stopFullscreenSensitiveMode = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, STOP_FULLSCREEN_SENSITIVE_MODE, []);
};

exports.isFullscreenSensitiveModeActive = function (result) {
    exec(result, emptyCallback, SMARTLOOK_PLUGIN, IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE, []);
};

exports.setUserIdentifier = function (params) {
    if (params["identifier"] != undefined) {
        if (params["sessionProperties"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_USER_IDENTIFIER, [params["identifier"], params["sessionProperties"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_USER_IDENTIFIER, [params["identifier"]]);
        }
    }
};

exports.startTimedCustomEvent = function (params) {
    if (params["name"] != undefined) {
        if (params["eventProperties"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, START_TIMED_CUSTOM_EVENT, [params["name"], params["eventProperties"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, START_TIMED_CUSTOM_EVENT, [params["name"]]);
        }
    }
};

exports.trackCustomEvent = function (params) {
    if (params["name"] != undefined) {
        if (params["eventProperties"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, TRACK_CUSTOM_EVENT, [params["name"], params["eventProperties"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, TRACK_CUSTOM_EVENT, [params["name"]]);
        }
    }
};

exports.setGlobalEventProperties = function (params) {
    if (params["globalEventProperties"] != undefined && params["immutable"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_GLOBAL_EVENT_PROPERTIES, [params["globalEventProperties"], params["immutable"]]);
    }
};

exports.setGlobalEventProperty = function (params) {
    if (params["key"] != undefined && params["value"] != undefined && params["immutable"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_GLOBAL_EVENT_PROPERTY, [params["key"], params["value"], params["immutable"]]);
    }
};

exports.removeGlobalEventProperty = function (params) {
    if (params["key"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, REMOVE_GLOBAL_EVENT_PROPERTY, [params["key"]]);
    }
};

exports.removeAllGlobalEventProperties = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, REMOVE_ALL_GLOBAL_EVENT_PROPERTIES, []);
};