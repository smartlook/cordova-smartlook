var exec = require('cordova/exec');

// Plugin name
const SMARTLOOK_PLUGIN = "SmartlookPlugin"

// Plugin version
const SMARTLOOK_PLUGIN_VERSION = "1.4.0"

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
const SET_EVENT_TRACKING_MODE = "setEventTrackingMode";
const TRACK_NAVIGATION_EVENT = "trackNavigationEvent";
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
const REGISTER_LOG_LISTENER = "registerLogListener";
const UNREGISTER_LOG_LISTENER = "unregisterLogListener";
const SET_RENDERING_MODE = "setRenderingMode";

const SET_PLUGIN_VERISION = "setPluginVersion";


var emptyCallback = function() { return; };

////////////////////////////////////////////////////////////////////////////////
// SDK API constants

exports.ViewState = {
    START: "start",
    STOP: "stop"
};

exports.EventTrackingMode = {
    FULL_TRACKING: "full_tracking",
    IGNORE_USER_INTERACTION: "ignore_user_interaction",
    NO_TRACKING: "no_tracking"
}

exports.RenderingMode = {
    NO_RENDERING: "no_rendering",
    NATIVE: "native"
}

////////////////////////////////////////////////////////////////////////////////
// SDK API methods

/**
 * All methods have two callbacks @callback successCallback and @callback errorCallback. These can be
 * used to retrieve return value or detect if something went wrong.
 * 
 * @example
 * Smartlook.exampleCall(successCallback, errorCallback);
 *
 * function successCallback(value) {
 *     alert('Returned: ' + value);
 * }
 *
 * function errorCallback(message) {
 *     alert('Failed because: ' + message);
 * }
 */


// Setup and lifecycle

/**
 * @description Setup and start Smartlook SDK recording.
 *
 * @param options.smartlookAPIKey Unique 40 character key identifying your app. You can find in your
 *                                dashboard. If invalid key is set SDK will not work properly.
 * @param options.fps             (Optional) Desired FPS for the recording, that must be in range from 1 to 10.
 */
exports.setupAndStartRecording = function (options, successCallback, errorCallback) {

    setPluginVersion();

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

/**
 * @description Setup/initialize Smartlook SDK. This method DOESN'T start the recording (@see Smartlook.startRecording())
 *
 * @param options.smartlookAPIKey Unique 40 character key identifying your app. You can find in your
 *                                dashboard. If invalid key is set SDK will not work properly.
 * @param options.fps             (Optional) Desired FPS for the recording, that must be in range from 1 to 10.
 */
exports.setup = function (options, successCallback, errorCallback) {

    setPluginVersion();

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

/**
 * @description Start SDK recording.
 */
exports.startRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, START_RECORDING, []);
};

/**
 * @description Stop SDK recording.
 */
exports.stopRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, STOP_RECORDING, []);
};

/**
 * @description Check if SDK is currently recording.
 * 
 * @callback successCallback Callback value set to true if SDK is currently recording.
 * 
 * @example
 * Smartlook.isRecording(successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('Is smartlook recording: ' + value);
 * }
 */
exports.isRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, IS_RECORING, []);
};

// Fullscreen sensitive mode

/**
 * @description When you start sensitive mode SDK records blank videos (single color) but SDK still 
 *              sends Analytic events.
 */
exports.startFullscreenSensitiveMode = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, START_FULLSCREEN_SENSITIVE_MODE, []);
};

/**
 * @description Stop sensitive mode -> SDK records video.
 */
exports.stopFullscreenSensitiveMode = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, STOP_FULLSCREEN_SENSITIVE_MODE, []);
};

/**
 * @description Check if SDK is running in fullscreen sensitive mode.
 * 
 * @callback successCallback Callback value set to true if SDK is currently in fullscreen sensitive mode.
 * 
 * @example
 * Smartlook.isFullscreenSensitiveModeActive(successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('Is smartlook in fullscreen sensitive mode: ' + value);
 * }
 */
exports.isFullscreenSensitiveModeActive = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE, []);
};


// User identification

/**
 * @description Identify user with identifier and optional properties.
 * 
 * @param options.identifier        String Id that can be used to identify user and his records. You will see this
 *                                  Id in Smartlook dashboard so you can pair records with concrete user.
 * @param options.sessionProperties (Optional) Additional properties object that will be paired with every session and can
 *                                  be viewed in Smartlook dashboard.
 */
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

/**
 * @description You can configure which events are being tracked by setting eventTrackingMode.
 * 
 * @param options.eventTrackingMode Can be on of:
 *                                  - EventTrackingMode.FULL_TRACKING ... track everything
 *                                  - EventTrackingMode.IGNORE_USER_INTERACTION ... will not track touches, focus, keyboard, selector events
 *                                  - EventTrackingMode.NO_TRACKING ... not gonna track any events 
 */
exports.setEventTrackingMode = function (options, successCallback, errorCallback) {
    var arguments = [];
    var allowedValues = [
        exports.EventTrackingMode.FULL_TRACKING,
        exports.EventTrackingMode.IGNORE_USER_INTERACTION,
        exports.EventTrackingMode.NO_TRACKING];

    if (checkStringArrayOption("setEventTrackingMode", "eventTrackingMode", options, allowedValues, errorCallback, true)) {
        arguments.push(options["eventTrackingMode"])
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, SET_EVENT_TRACKING_MODE, arguments);
}

/**
 * @description Track custom navigation event.
 * 
 * @param options.name      Controler/Activity/Page name.
 * @param options.viewState One of Smartlook.ViewState.START or Smartlook.ViewState.STOP.
 */
exports.trackNavigationEvent = function (options, successCallback, errorCallback) {
    var arguments = [];
    var allowedValues = [
        exports.ViewState.START,
        exports.ViewState.STOP];
    
    if (checkStringOption("trackNavigationEvent", "name", options, errorCallback, true)) {
        arguments.push(options["name"]);
    } else {
        return;
    }

    if (checkStringArrayOption("trackNavigationEvent", "viewState", options, allowedValues, errorCallback, true)) {
        arguments.push(options["viewState"]);
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, TRACK_NAVIGATION_EVENT, arguments);
};

/**
 * @description Starts timed event. Timed event can be used to record duration (between the start and stop/cancel).
 * 
 * @param options.name            String used to identify event in dashboard.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in stop/cancel.
 * 
 * @callback successCallback Callback value set to eventId if event was started successfully.
 * 
 * @example
 * Smartlook.startTimedCustomEvent({identifier: "random_identifier"}, successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('Timed event eventId: ' + value);
 * }
 */
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

/**
 * @description Stops timed event. Duration from according start is calculated and send with the event.
 * 
 * @param options.eventId         Unique event id that is used to identify this event. 
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
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

/**
 * @description Cancels timed event. It calculates event duration and notes that this event has failed.
 * 
 * @param options.eventId         Unique event id that is used to identify this event. 
 * @param options.reason          Short string description explaining why the event was canceled.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
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

/**
 * @description Track custom event.
 * 
 * @param options.name            String used to identify event. 
 * @param options.eventProperties (Optional) Event data stored in object.
 */
exports.trackCustomEvent = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("trackCustomEvent", "name", options, errorCallback, true)) {
        arguments.push(options["name"]);
    } else {
        return;
    }

    if (checkProperties("trackCustomEvent", "eventProperties", options, errorCallback, false)) {
        arguments.push(options["eventProperties"]);
    }

    execWithCallbacks(successCallback, errorCallback, TRACK_CUSTOM_EVENT, arguments);
};

// Event properties

/**
 * @description Set global event properties that will be added to every tracked event.
 * 
 * @param options.globalEventProperties Global event properties stored in object. 
 * @param options.immutable             If set to TRUE these properties have higher priority than mutable ones
 *                                      and also they cannot be changed (only removed).
 */
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

/**
 * @description Set global event property that will be added to every tracked event.
 * 
 * @param options.key        Global event property key.
 * @param options.value      Global event property value.
 * @param options.immutable  If set to TRUE this property has higher priority than mutable ones and also it 
 *                           cannot be changed (only removed).
 */
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

/**
 * @description Remove property from global event properties.
 * 
 * @param options.key Key of global event property that needs to be removed.
 */
exports.removeGlobalEventProperty = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("removeGlobalEventProperty", "key", options, errorCallback, true)) {
        arguments.push(options["key"]);
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, REMOVE_GLOBAL_EVENT_PROPERTY, arguments);
};

/**
 * @description Remove all properties from global event properties.
 */
exports.removeAllGlobalEventProperties = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, REMOVE_ALL_GLOBAL_EVENT_PROPERTIES, []);
};


// Utilities

/**
 * @description Possibility to manually set referrer and source of the installation visible in dashboard 
 *              and accessible via filters
 * 
 * @param referrer Desired referrer value
 * @param source   Desired source, i.e. com.android.vending or com.amazon.venezia
 */
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

/**
 * @description Obtain sharable url to user's session leading to our dashboard.
 * 
 * @callback successCallback Callback value set to dashboard sessionURL.
 * 
 * @example
 * Smartlook.getDashboardSessionUrl(successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('Shareable dashboard session URL: ' + value);
 * }
 */
exports.getDashboardSessionUrl = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, GET_DASHBOARD_SESSION_URL, []);
};

/**
 * You can register callback to all public SDK logs.
 * 
 * @callback successCallback Callback value contains log mesage in given format: `TAG[severity]: message`
 * 
 * @example
 * Smartlook.registerLogListener(successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('SDK logged: ' + value);
 * }
 */
exports.registerLogListener = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, REGISTER_LOG_LISTENER, [])
}

/**
 * You can unregister allback to all public SDK logs if registered before.
 */
exports.unregisterLogListener = function(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, UNREGISTER_LOG_LISTENER, [])
}

/**
 * By changing rendering method you can adjust the way we render the application for recordings.
 * 
 * @param options.renderingMode       Mode defining the video output of recording. Curently only
 *                                    RenderingMode.NO_RENDERING and RenderingMode.NATIVE available.
 * @param options.renderingModeOption [NOT IMPLEMENTED]  
 */
exports.setRenderingMode = function(options, successCallback, errorCallback) {
    var arguments = [];
    
    var allowedValues = [
        exports.RenderingMode.NO_RENDERING,
        exports.RenderingMode.NATIVE];

    if (checkStringArrayOption("setRenderingMode", "renderingMode", options, allowedValues, errorCallback, true)) {
        arguments.push(options["renderingMode"])
    } else {
        return
    }

    execWithCallbacks(successCallback, errorCallback, SET_RENDERING_MODE, arguments);    
}

////////////////////////////////////////////////////////////////////////////////
// Check and Utility methods

// Check functions

function checkStringOption(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option]

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");
        }

        return false;
    }

    if (typeof toCheck !== 'string' || toCheck.length < 1) {
        logError(errorCallback, method + "(): " + option + " must be non-empty string!");
        return false
    }

    return true;
}

function checkStringArrayOption(method, option, options, possibleValueArray, errorCallback, isMandatory) {
    var toCheck = options[option];

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");
        }

        return false;
    }

    if (eventTrackingMode !== 'string') {
        var found = false;
        var errorMessagePossibilities = "";
        for (var i = 0; i < possibleValueArray.length; i++) {
            if (possibleValueArray[i] === toCheck) {
                found = true;
                errorMessagePossibilities += possibleValueArray[i] + " "
            }
        }
        errorMessagePossibilities.trim()

        if (!found) {
            logError(errorCallback, method + "(): " + option + " must be one of: " + errorMessagePossibilities);
            return false;
        }
    }

    return true;
}

function checkBooleanOption(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option]

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");
        }

        return false;
    }

    if (typeof toCheck !== 'boolean') {
        logError(errorCallback, method + "(): " + option + " must be boolean!");
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
        logError(errorCallback, method + "(): " + option + " must be a object!");
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
        errorCallback(message);
    }
}


function setPluginVersion() {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_PLUGIN_VERISION, [SMARTLOOK_PLUGIN_VERSION]);
}
