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

// Check functions

function checkStringOption(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option]

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with" + option + " option!");
        }

        return false;
    }

    if (typeof toCheck !== 'string' || toCheck.length < 1) {
        logError(errorCallback, method + "(): " + option + "must be non-empty string!");
        return false
    }

    return true;
}

function checkBooleanOption(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option]

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with" + option + " option!");
        }

        return false;
    }

    if (typeof toCheck !== 'boolean') {
        logError(errorCallback, method + "(): " + option + "must be boolean!");
        return false
    }

    return true;
}

function checkProperties(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option]

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");     
        }

        return false;
    }

    if (toCheck === Object(toCheck)) {
        logError(errorCallback, method + "(): " + option + "must be a object!");
        return false
    }

    return true;
}

function checkKeyValueOptions(method, options, errorCallback, isMandatory) {
    var key = options["key"];
    var value = options["value"];

    if (key == undefined || key == null || value == undefined || value == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with key value options!");     
        }
        
        return false
    }

    if (typeof key !== 'string' || key.length < 1 || typeof value !== 'string') {
        logError(errorCallback, method + "(): key must be non-empty string and value be strings!");
        return false;
    }

    return true;
}

function checkFpsOption(method, options, errorCallback, isMandatory) {
    var fps = options["fps"];

    if (fps == undefined || fps == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with fps option!");     
        }

        return false;
    }

    if (typeof fps !== 'number') {
        logError(errorCallback, method + "(): fps not set, must be a number!"); 
        return false;  
    }

    if (fps < 1 || fps > 10) {
        logError(errorCallback, method + "(): fps not set, must be between 1 and 10 fps!");
        return false;
    }

    return true;
}

function checkColorOption(method, options, errorCallback, isMandatory) {
    var color = options["color"];

    if (color == undefined || color == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with color option!");     
        }

        return false;
    }

    if (typeof color !== 'string' || !isHexColor(color)) {
        logError(errorCallback, method + "(): color must be hex color string!");
        return false;
    }

    return true;
}

function checkViewStateOption(method, options, errorCallback, isMandatory) {
    var viewState = options["viewState"];

    if (viewState == undefined || viewState == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with viewState option!");
        }

        return false;
    }

    if (typeof viewState !== 'string' || viewState !== "start" && viewState !== "stop") {
        logError(errorCallback, method + "(): viewState must be one of \"start\", \"stop\"!");
        return false;
    }

    return true;
}

// Utility methods

function execWithCallbacks(successCallback, errorCallback, method, arguments) {
    var implementedSucessCallback = successCallback;
    var implementedErrorCallback = errorCallback;

    if (successCallback == undefined) {
        implementedSucessCallback = emptyCallback;
    }

    if (errorCallback == undefined) {
        implementedErrorCallback = emptyCallback;
    }

    exec(implementedSucessCallback, implementedErrorCallback, SMARTLOOK_PLUGIN, method, arguments);
}

function logError(errorCallback, message) {
    if (errorCallback != undefined) {
        errorCallback.call(message); 
    }
}

function isHexColor(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color)
}

// Setup and lifecycle

// setupAndStart(smartlookAPIKey)
// setupAndStart(smartlookAPIKey, fps)
exports.setupAndStartRecording = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("setupAndStartRecording", "smartlookAPIKey", options, errorCallback, true)) {
        arguments.push(options["smartlookAPIKey"]);
    } else {
        return;
    }

    if (checkFpsOption("setupAndStartRecording", options, errorCallback, false)) {
        arguments.push(options["fps"]);
    }

    execWithCallbacks(successCallback, errorCallback, SETUP_AND_START_RECORDING, arguments);
};

// setup(smartlookAPIKey)
// setup(smartlookAPIKey, fps)
exports.setup = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("setup", "smartlookAPIKey", options, errorCallback, true)) {
        arguments.push(options["smartlookAPIKey"]);
    } else {
        return;
    }

    if (checkFpsOption("setup", options, errorCallback, false)) {
        arguments.push(options["fps"]);
    }

    execWithCallbacks(successCallback, errorCallback, SETUP, arguments);
};

// startRecording()
exports.startRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, START_RECORDING, []);
};

// stopRecording()
exports.stopRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, STOP_RECORDING, []);
};

// isRecording()
exports.isRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, IS_RECORING, []);
};

// Fullscreen sensitive mode

// startFullScreenSenstiveMode()
// startFullScreenSenstiveMode(color)
exports.startFullscreenSensitiveMode = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkColorOption("startFullscreenSensitiveMode", options, errorCallback, false)) {
        arguments.push(options["color"]);
    }

    execWithCallbacks(successCallback, errorCallback, START_FULLSCREEN_SENSITIVE_MODE, arguments);
};

// stopFullScreenSenstiveMode()
exports.stopFullscreenSensitiveMode = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, STOP_FULLSCREEN_SENSITIVE_MODE, []);
};

// isFullscreenModeActive(result)
exports.isFullscreenSensitiveModeActive = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE, []);
};


// User identification

// setUserIdentifier(identifier)
// setUserIdentifier(identifier, sessionProperties)
exports.setUserIdentifier = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("setUserIdentifier", "identifier", options, errorCallback, true)) {
        arguments.push(options["identifier"]);
    } else {
        return;
    }

    if (checkProperties("setUserIdentifier", "sessionProperties", options, errorCallback, false)) {
        arguments.push(options["sessionProperties"]);
    }

    execWithCallbacks(successCallback, errorCallback, SET_USER_IDENTIFIER, arguments);
};


// Tracking

// todo viewstate constant 
// trackNavigationEvent(name, viewState)
exports.trackNavigationEvent = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("trackNavigationEvent", "name", options, errorCallback, true)) {
        arguments.push(options["name"]);
    } else {
        return;
    }

    if (checkViewStateOption("trackNavigationEvent", options, errorCallback, true)) {
        arguments.push(options["viewState"]);
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, TRACK_NAVIGATION_EVENT, arguments);
};

// startTimedCustomEvent(name): String
// startTimedCustomEvent(name, eventProperties): String
exports.startTimedCustomEvent = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("startTimedCustomEvent", "name", options, errorCallback, true)) {
        arguments.push(options["name"]);
    } else {
        return;
    }

    if (checkProperties("startTimedCustomEvent", "eventProperties", options, errorCallback, false)) {
        arguments.push(options["eventProperties"]);
    }

    execWithCallbacks(successCallback, errorCallback, START_TIMED_CUSTOM_EVENT, arguments);
};

// stopTimedCustomEvent(eventId)
// stopTimedCustomEvent(eventId, eventProperties)
exports.stopTimedCustomEvent = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("stopTimedCustomEvent", "eventId", options, errorCallback, true)) {
        arguments.push(options["eventId"]);
    } else {
        return;
    }

    if (checkProperties("stopTimedCustomEvent", "eventProperties", options, errorCallback, false)) {
        arguments.push(options["eventProperties"]);
    }

    execWithCallbacks(successCallback, errorCallback, STOP_TIMED_CUSTOM_EVENT, arguments);
};

// cancelTimedCustomEvent(eventId, reason)
// cancelTimedCustomEvent(eventId, reason, eventProperties)
exports.cancelTimedCustomEvent = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("cancelTimedCustomEvent", "eventId", options, errorCallback, true)) {
        arguments.push(options["eventId"]);
    } else {
        return;
    }

    if (checkStringOption("cancelTimedCustomEvent", "reason", options, errorCallback, true)) {
        arguments.push(options["reason"]);
    } else {
        return;
    }

    if (checkProperties("cancelTimedCustomEvent", "eventProperties", options, errorCallback, false)) {
        arguments.push(options["eventProperties"]);
    }

    execWithCallbacks(successCallback, errorCallback, CANCEL_TIMED_CUSTOM_EVENT, arguments);
};

// trackCustomEvent(name)
// trackCustomEvent(name, eventProperties)
// trackCustomEvent(name, key, value)
exports.trackCustomEvent = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("trackCustomEvent", "name", options, errorCallback, true)) {
        arguments.push(options["name"]);
    } else {
        return;
    }

    if (checkProperties("trackCustomEvent", "eventProperties", options, errorCallback, false)) {
        arguments.push(options["eventProperties"]);
    } else if (checkKeyValueOptions("trackCustomEvent", options, errorCallback, false)) {
        arguments.push(options["key"]);
        arguments.push(options["value"]);
    }

    execWithCallbacks(successCallback, errorCallback, TRACK_CUSTOM_EVENT, arguments);
};

// Event properties

// setGlobalEventProperties(globalEventProperties, immutable)
exports.setGlobalEventProperties = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkProperties("setGlobalEventProperties", "globalEventProperties", options, errorCallback, true)) {
        arguments.push(options["globalEventProperties"]);
    } else {
        return;
    }

    if (checkBooleanOption("setGlobalEventProperties", "immutable", options, errorCallback, true)) {
        arguments.push(options["immutable"]);
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, SET_GLOBAL_EVENT_PROPERTIES, arguments);
};

// setGlobalEventProperty(key, value, immutable)
exports.setGlobalEventProperty = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkKeyValueOptions("setGlobalEventProperty", options, errorCallback, true)) {
        arguments.push(options["key"]);
        arguments.push(options["value"]);
    } else {
        return;
    }

    if (checkBooleanOption("setGlobalEventProperty", "immutable", options, errorCallback, true)) {
        arguments.push(options["immutable"]);
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, SET_GLOBAL_EVENT_PROPERTY, arguments);
};

// removeGlobalEventProperty(key)
exports.removeGlobalEventProperty = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("removeGlobalEventProperty", "key", options, errorCallback, true)) {
        arguments.push(options["key"]);
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, REMOVE_GLOBAL_EVENT_PROPERTY, arguments);
};

// removeAllGlobalEventProperties()
exports.removeAllGlobalEventProperties = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, REMOVE_ALL_GLOBAL_EVENT_PROPERTIES, []);
};


// Utilities

// setReferrer(referrer, source)
exports.setReferrer = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("setReferrer", "referrer", options, errorCallback, true)) {
        arguments.push(options["referrer"]);
    } else {
        return;
    }

    if (checkStringOption("setReferrer", "source", options, errorCallback, true)) {
        arguments.push(options["source"]);
    } else {
        return;
    }

    execWithCallbacks(successCallback, errorCallback, SET_REFERRER, arguments);
};

// getDashboardSessionUrl(): String
exports.getDashboardSessionUrl = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, GET_DASHBOARD_SESSION_URL, []);
};