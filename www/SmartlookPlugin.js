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

exports.setupAndStartRecording = function (params, success, error) {
    if (params["smartlookAPIKey"] != undefined) {
        if (params["fps"] != undefined) {
            exec(success, error, SMARTLOOK_PLUGIN, SETUP_AND_START_RECORDING, [params["smartlookAPIKey"], params["fps"]]);
        } else {
            exec(success, error, SMARTLOOK_PLUGIN, SETUP_AND_START_RECORDING, [params["smartlookAPIKey"]]);
        }
    } else {
        error("You need to provide smartlookAPIKey")
    }
};

exports.setup = function (params, success, error) {
    if (params["smartlookAPIKey"] != undefined) {
        if (params["fps"] != undefined) {
            exec(success, error, SMARTLOOK_PLUGIN, SETUP, [params["smartlookAPIKey"], params["fps"]]);
        } else {
            exec(success, error, SMARTLOOK_PLUGIN, SETUP, [params["smartlookAPIKey"]]);
        }
    } else {
        error("You need to provide smartlookAPIKey")
    }
};

exports.startRecording = function (success, error) {
    exec(success, error, SMARTLOOK_PLUGIN, START_RECORDING, []);
};

exports.stopRecording = function (success, error) {
    exec(success, error, SMARTLOOK_PLUGIN, STOP_RECORDING, []);
};

exports.isRecording = function (success, error) {
    exec(success, error, SMARTLOOK_PLUGIN, IS_RECORING, []);
};

exports.startFullscreenSensitiveMode = function (success, error) {
    exec(success, error, SMARTLOOK_PLUGIN, START_FULLSCREEN_SENSITIVE_MODE, []);
};

exports.stopFullscreenSensitiveMode = function (success, error) {
    exec(success, error, SMARTLOOK_PLUGIN, STOP_FULLSCREEN_SENSITIVE_MODE, []);
};

exports.isFullscreenSensitiveModeActive = function (success, error) {
    exec(success, error, SMARTLOOK_PLUGIN, IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE, []);
};

exports.setUserIdentifier = function (params, success, error) {
    if (params["identifier"] != undefined) {
        if (params["sessionProperties"] != undefined) {
            exec(success, error, SMARTLOOK_PLUGIN, SET_USER_IDENTIFIER, [params["identifier"], params["sessionProperties"]]);
        } else {
            exec(success, error, SMARTLOOK_PLUGIN, SET_USER_IDENTIFIER, [params["identifier"]]);
        }
    } else {
        error("You need to provide identifier")
    }
};

exports.startTimedCustomEvent = function (params, success, error) {
    if (params["name"] != undefined) {
        if (params["eventProperties"] != undefined) {
            exec(success, error, SMARTLOOK_PLUGIN, START_TIMED_CUSTOM_EVENT, [params["name"], params["eventProperties"]]);
        } else {
            exec(success, error, SMARTLOOK_PLUGIN, START_TIMED_CUSTOM_EVENT, [params["name"]]);
        }
    } else {
        error("You need to provide event name")
    }
};

exports.trackCustomEvent = function (params, success, error) {
    if (params["name"] != undefined) {
        if (params["eventProperties"] != undefined) {
            exec(success, error, SMARTLOOK_PLUGIN, TRACK_CUSTOM_EVENT, [params["name"], params["eventProperties"]]);
        } else {
            exec(success, error, SMARTLOOK_PLUGIN, TRACK_CUSTOM_EVENT, [params["name"]]);
        }
    } else {
        error("You need to provide event name")
    }
};

exports.setGlobalEventProperties = function (params, success, error) {
    if (params["globalEventProperties"] != undefined && params["immutable"] != undefined) {
        exec(success, error, SMARTLOOK_PLUGIN, SET_GLOBAL_EVENT_PROPERTIES, [params["globalEventProperties"], params["immutable"]]);
    } else {
        error("You need to provide globalEventProperties and immutable flag")
    }
};

exports.setGlobalEventProperty = function (params, success, error) {
    if (params["key"] != undefined && params["value"] != undefined && params["immutable"] != undefined) {
        exec(success, error, SMARTLOOK_PLUGIN, SET_GLOBAL_EVENT_PROPERTY, [params["key"], params["value"], params["immutable"]]);
    } else {
        error("You need to provide key, value and immutable flag")
    }
};

exports.removeGlobalEventProperty = function (params, success, error) {
    if (params["key"] != undefined) {
        exec(success, error, SMARTLOOK_PLUGIN, REMOVE_GLOBAL_EVENT_PROPERTY, [params["key"]]);
    } else {
        error("You need to provide key")
    }
};

exports.removeAllGlobalEventProperties = function (success, error) {
    exec(success, error, SMARTLOOK_PLUGIN, REMOVE_ALL_GLOBAL_EVENT_PROPERTIES, []);
};