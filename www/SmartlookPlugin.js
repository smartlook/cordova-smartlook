var exec = require('cordova/exec');

// Plugin name
const SMARTLOOK_PLUGIN = "SmartlookPlugin"

// API methods names

// Setup and lifecycle
const SETUP_AND_START_RECORDING = "setupAndStartRecording";
const SETUP = "setup";
const START_RECORDING = "startRecording";
const STOP_RECORDING = "stopRecording";
const IS_RECORING = "isRecording";

// Fullscreen sensitive mode
const START_FULLSCREEN_SENSITIVE_MODE = "startFullscreenSensitiveMode";
const STOP_FULLSCREEN_SENSITIVE_MODE = "stopFullscreenSensitiveMode";
const IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE = "isFullscreenSensitiveModeActive";

// User identifier
const SET_USER_IDENTIFIER = "setUserIdentifier";

//Tracking
const TRACK_NAVIGATION_EVENT = "trackNavigationEvent"
const START_TIMED_CUSTOM_EVENT = "startTimedCustomEvent";
const STOP_TIMED_CUSTOM_EVENT = "stopTimedCustomEvent";
const CANCEL_TIMED_CUSTOM_EVENT = "cancelTimedCustomEvent";
const TRACK_CUSTOM_EVENT = "trackCustomEvent";

// Event properties
const SET_GLOBAL_EVENT_PROPERTIES = "setGlobalEventProperties";
const SET_GLOBAL_EVENT_PROPERTY = "setGlobalEventProperty";
const REMOVE_GLOBAL_EVENT_PROPERTY = "removeGlobalEventProperty";
const REMOVE_ALL_GLOBAL_EVENT_PROPERTIES = "removeAllGlobalEventProperties";

// Utilities
const SET_REFERRER = "setReferrer"
const GET_DASHBOARD_SESSION_URL = "getDashboardSessionUrl";


var emptyCallback = function() { return; };


// Setup and lifecycle

// setupAndStart(smartlookAPIKey)
// setupAndStart(smartlookAPIKey, fps)
exports.setupAndStartRecording = function (params) {
    if (params["smartlookAPIKey"] != undefined) {
        if (params["fps"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP_AND_START_RECORDING, [params["smartlookAPIKey"], params["fps"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP_AND_START_RECORDING, [params["smartlookAPIKey"]]);
        }
    }
};

// setup(smartlookAPIKey)
// setup(smartlookAPIKey, fps)
exports.setup = function (params) {
    if (params["smartlookAPIKey"] != undefined) {
        if (params["fps"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP, [params["smartlookAPIKey"], params["fps"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SETUP, [params["smartlookAPIKey"]]);
        }
    }
};

// startRecording()
exports.startRecording = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, START_RECORDING, []);
};

// stopRecording()
exports.stopRecording = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, STOP_RECORDING, []);
};

// isRecording()
exports.isRecording = function (result) {
    exec(result, emptyCallback, SMARTLOOK_PLUGIN, IS_RECORING, []);
};


// Fullscreen sensitive mode

// startFullScreenSenstiveMode()
// startFullScreenSenstiveMode(color)
exports.startFullscreenSensitiveMode = function (params) {
    if (params["color"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, START_FULLSCREEN_SENSITIVE_MODE, [params["color"]]);
    } else {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, START_FULLSCREEN_SENSITIVE_MODE, []);
    }
};

// stopFullScreenSenstiveMode()
exports.stopFullscreenSensitiveMode = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, STOP_FULLSCREEN_SENSITIVE_MODE, []);
};

// isFullscreenModeActive(result)
exports.isFullscreenSensitiveModeActive = function (result) {
    exec(result, emptyCallback, SMARTLOOK_PLUGIN, IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE, []);
};


// User identification

// setUserIdentifier(identifier)
// setUserIdentifier(identifier, sessionProperties)
exports.setUserIdentifier = function (params) {
    if (params["identifier"] != undefined) {
        if (params["sessionProperties"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_USER_IDENTIFIER, [params["identifier"], params["sessionProperties"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_USER_IDENTIFIER, [params["identifier"]]);
        }
    }
};


// Tracking

// todo viewstate constant 
// trackNavigationEvent(name, viewState)
exports.trackNavigationEvent = function (params) {
    if (params["name"] != undefined && params["viewState"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, TRACK_NAVIGATION_EVENT, [params["name"], params["viewState"]]);
    }
};

// startTimedCustomEvent(name): String
// startTimedCustomEvent(name, eventProperties): String
exports.startTimedCustomEvent = function (result, params) {
    if (params["name"] != undefined) {
        if (params["eventProperties"] != undefined) {
            exec(result, emptyCallback, SMARTLOOK_PLUGIN, START_TIMED_CUSTOM_EVENT, [params["name"], params["eventProperties"]]);
        } else {
            exec(result, emptyCallback, SMARTLOOK_PLUGIN, START_TIMED_CUSTOM_EVENT, [params["name"]]);
        }
    }
};

// stopTimedCustomEvent(eventId)
// stopTimedCustomEvent(eventId, eventProperties)
exports.stopTimedCustomEvent = function (result, params) {
    if (params["eventId"] != undefined) {
        if (params["eventProperties"] != undefined) {
            exec(result, emptyCallback, SMARTLOOK_PLUGIN, STOP_TIMED_CUSTOM_EVENT, [params["eventId"], params["eventProperties"]]);
        } else {
            exec(result, emptyCallback, SMARTLOOK_PLUGIN, STOP_TIMED_CUSTOM_EVENT, [params["eventId"]]);
        }
    }
};

// cancelTimedCustomEvent(eventId, reason)
// cancelTimedCustomEvent(eventId, reason, eventProperties)
exports.cancelTimedCustomEvent = function (result, params) {
    if (params["name"] != undefined && params["reason"]) {
        if (params["eventProperties"] != undefined) {
            exec(result, emptyCallback, SMARTLOOK_PLUGIN, CANCEL_TIMED_CUSTOM_EVENT, [params["name"], params["reason"], params["eventProperties"]]);
        } else {
            exec(result, emptyCallback, SMARTLOOK_PLUGIN, CANCEL_TIMED_CUSTOM_EVENT, [params["name"], params["reason"]]);
        }
    }
};

// trackCustomEvent(name)
// trackCustomEvent(name, eventProperties)
// trackCustomEvent(name, key, value)
exports.trackCustomEvent = function (params) {
    if (params["name"] != undefined) {
        if (params["eventProperties"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, TRACK_CUSTOM_EVENT, [params["name"], params["eventProperties"]]);
        } else if (params["key"] != undefined && params["value"] != undefined) {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, TRACK_CUSTOM_EVENT, [params["name"], params["key"], params["value"]]);
        } else {
            exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, TRACK_CUSTOM_EVENT, [params["name"]]);
        }
    }
};

// Event properties

// setGlobalEventProperties(globalEventProperties, immutable)
exports.setGlobalEventProperties = function (params) {
    if (params["globalEventProperties"] != undefined && params["immutable"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_GLOBAL_EVENT_PROPERTIES, [params["globalEventProperties"], params["immutable"]]);
    }
};

// setGlobalEventProperty(key, value, immutable)
exports.setGlobalEventProperty = function (params) {
    if (params["key"] != undefined && params["value"] != undefined && params["immutable"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_GLOBAL_EVENT_PROPERTY, [params["key"], params["value"], params["immutable"]]);
    }
};

// removeGlobalEventProperty(key)
exports.removeGlobalEventProperty = function (params) {
    if (params["key"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, REMOVE_GLOBAL_EVENT_PROPERTY, [params["key"]]);
    }
};

// removeAllGlobalEventProperties()
exports.removeAllGlobalEventProperties = function () {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, REMOVE_ALL_GLOBAL_EVENT_PROPERTIES, []);
};

// Utilities

// setReferrer(referrer, source)
exports.setReferrer = function (params) {
    if (params["referrer"] != undefined && params["source"] != undefined) {
        exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_REFERRER, [params["referrer"], params["source"]]);
    }
}

// getDashboardSessionUrl(): String
exports.getDashboardSessionUrl = function (result) {
    exec(result, emptyCallback, SMARTLOOK_PLUGIN, GET_DASHBOARD_SESSION_URL, []);
};