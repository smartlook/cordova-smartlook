var exec = require('cordova/exec');

// Plugin name
const SMARTLOOK_PLUGIN = "SmartlookPlugin"

// Smartlook framework info
const SMARTLOOK_FRAMEWORK = "CORDOVA";
const SMARTLOOK_FRAMEWORK_VERSION = "-";
const SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = "1.7.3"

// API methods names

// Setup and lifecycle
const SETUP_AND_START_RECORDING = "setupAndStartRecording";
const SETUP = "setup";
const START_RECORDING = "startRecording";
const STOP_RECORDING = "stopRecording";
const IS_RECORING = "isRecording";
const RESET_SESSION = "resetSession";

// User identifier
const SET_USER_IDENTIFIER = "setUserIdentifier";

//Tracking
const SET_EVENT_TRACKING_MODE = "setEventTrackingMode";
const SET_EVENT_TRACKING_MODES = "setEventTrackingModes";
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
const SET_REFERRER = "setReferrer";
const GET_DASHBOARD_SESSION_URL = "getDashboardSessionUrl";
const GET_DASHBOARD_VISITOR_URL = "getDashboardVisitorUrl";
const REGISTER_LOG_LISTENER = "registerLogListener";
const UNREGISTER_LOG_LISTENER = "unregisterLogListener";
const SET_RENDERING_MODE = "setRenderingMode";

//Integrations
const REGISTER_INTEGRATION_LISTENER = "registerIntegrationListener";
const UNREGISTER_INTEGRATION_LISTENER = "unregisterIntegrationListener";

// Callbacks
const SESSION_READY_CALLBACK = "onSessionReady";
const VISITOR_READY_CALLBACK = "onVisitorReady";

// Internal logic
const SET_PLUGIN_VERISION = "setPluginVersion";

// Undefined
const UNDEFINED_FPS = -1;
const UNDEFINED_RENDERING_MODE = "";

var emptyCallback = function() { return; };

/**
 * @deprecated Variable used only for support of deprecated methods. Should be removed on next release.
 */
var fullscreenModeActive = false;

////////////////////////////////////////////////////////////////////////////////
// SDK API constants

exports.ViewState = {
    START: "start",
    STOP: "stop"
};

exports.EventTrackingMode = {
    FULL_TRACKING: "full_tracking",
    IGNORE_USER_INTERACTION: "ignore_user_interaction",
    IGNORE_NAVIGATION_INTERACTION: "ignore_navigation_interaction",
    IGNORE_RAGE_CLICKS: "ignore_rage_clicks",
    NO_TRACKING: "no_tracking"
};

exports.RenderingMode = {
    NO_RENDERING: "no_rendering",
    NATIVE: "native"
};

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
 * @param options.smartlookAPIKey        Unique 40 character key identifying your app. You can find in your
 *                                       dashboard. If invalid key is set SDK will not work properly.
 * @param options.fps                    (Optional) Desired FPS for the recording, that must be in range from 1 to 10.
 * @param options.renderingMode          (Optional) Mode defining the video output of recording.
 * @param options.startNewSession        (Optional) If true new session is going to be created.
 * @param options.startNewSessionAndUser (Optional) If true new session and visitor is going to be created.
 * @param options.eventTrackignModes     (Optional) Array of EventTrackingModes that should be applied to recording. 
 * 
 * @SL_COMPATIBILITY_NAME("name=setup;type=func;params=smartlookAPIKey{string}")
 * @SL_COMPATIBILITY_NAME("name=setup;type=func;params=setupOptions{SetupOptions}")
 * @SL_COMPATIBILITY_NAME("name=SetupOptions;type=builder;members=smartlookAPIKey,fps,renderingMode,startNewSession,startNewSessionAndUser,eventTrackingModes")
 */
exports.setupAndStartRecording = function (options, successCallback, errorCallback) {

    setPluginVersion();

    var arguments = [];
    var renderingModeAllowedValues = [
        exports.RenderingMode.NO_RENDERING,
        exports.RenderingMode.NATIVE];
    
    if (checkStringOption("setupAndStartRecording", "smartlookAPIKey", options, errorCallback, true)) {
        arguments.push(options["smartlookAPIKey"]);
    } else {
        return;
    }

    if (checkFpsOption("setupAndStartRecording", options, errorCallback, false)) {
        arguments.push(options["fps"]);
    } else {
        arguments.push(UNDEFINED_FPS)
    }

    if (checkStringArrayOption("setupAndStartRecording", options["renderingMode"], "renderingMode", renderingModeAllowedValues, errorCallback, false)) {
        arguments.push(options["renderingMode"])
    } else {
        arguments.push(UNDEFINED_RENDERING_MODE)
    }

    if (checkBooleanOption("setupAndStartRecording", "startNewSession", options, errorCallback, false)) {
        arguments.push(options["startNewSession"])
    } else {
        arguments.push(false)
    }

    if (checkBooleanOption("setupAndStartRecording", "startNewSessionAndUser", options, errorCallback, false)) {
        arguments.push(options["startNewSessionAndUser"])
    } else {
        arguments.push(false)
    }

    if (checkEventTrackingModeArray("setupAndStartRecording", options, errorCallback, false)) {
        arguments.push(options["eventTrackingModes"])
    } else {
        arguments.push([])
    }

    execWithCallbacks(successCallback, errorCallback, SETUP_AND_START_RECORDING, arguments);
};

/**
 * @description Setup/initialize Smartlook SDK. This method DOESN'T start the recording (@see Smartlook.startRecording())
 *
 * @param options.smartlookAPIKey        Unique 40 character key identifying your app. You can find in your
 *                                       dashboard. If invalid key is set SDK will not work properly.
 * @param options.fps                    (Optional) Desired FPS for the recording, that must be in range from 1 to 10.
 * @param options.renderingMode          (Optional) Mode defining the video output of recording.
 * @param options.startNewSession        (Optional) If true new session is going to be created.
 * @param options.startNewSessionAndUser (Optional) If true new session and visitor is going to be created. 
 * @param options.eventTrackignModes     (Optional) Array of EventTrackingModes that should be applied to recording.
 * 
 * @SL_COMPATIBILITY_NAME("name=setup;type=func;params=smartlookAPIKey{string}")
 * @SL_COMPATIBILITY_NAME("name=setup;type=func;params=setupOptions{SetupOptions}")
 */
exports.setup = function (options, successCallback, errorCallback) {

    setPluginVersion();

    var arguments = [];
    var renderingModeAllowedValues = [
        exports.RenderingMode.NO_RENDERING,
        exports.RenderingMode.NATIVE];
    
    if (checkStringOption("setup", "smartlookAPIKey", options, errorCallback, true)) {
        arguments.push(options["smartlookAPIKey"]);
    } else {
        return;
    }

    if (checkFpsOption("setup", options, errorCallback, false)) {
        arguments.push(options["fps"]);
    } else {
        arguments.push(UNDEFINED_FPS);
    }

    if (checkStringArrayOption("setupAndStartRecording", options["renderingMode"], "renderingMode", renderingModeAllowedValues, errorCallback, false)) {
        arguments.push(options["renderingMode"]);
    } else {
        arguments.push(UNDEFINED_RENDERING_MODE);
    }

    if (checkBooleanOption("setupAndStartRecording", "startNewSession", options, errorCallback, false)) {
        arguments.push(options["startNewSession"]);
    } else {
        arguments.push(false);
    }

    if (checkBooleanOption("setupAndStartRecording", "startNewSessionAndUser", options, errorCallback, false)) {
        arguments.push(options["startNewSessionAndUser"]);
    } else {
        arguments.push(false);
    }

    if (checkEventTrackingModeArray("setupAndStartRecording", options, errorCallback, false)) {
        arguments.push(options["eventTrackingModes"]);
    } else {
        arguments.push([]);
    }

    execWithCallbacks(successCallback, errorCallback, SETUP, arguments);
};

/**
 * @description Start SDK recording.
 * 
 * @SL_COMPATIBILITY_NAME("name=startRecording;type=func")
 */
exports.startRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, START_RECORDING, []);
};

/**
 * @description Stop SDK recording.
 * 
 * @SL_COMPATIBILITY_NAME("name=stopRecording;type=func")
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
 * 
 * @SL_COMPATIBILITY_NAME("name=isRecording;type=func;returns=boolean")
 */
exports.isRecording = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, IS_RECORING, []);
};

/**
 * @description Resets current session and new session in dashboard is created.
 * 
 * @param options.resetUser (Optional) If set to TRUE new visitor is created in the dashboard.
 * 
 * @SL_COMPATIBILITY_NAME("name=resetSession;type=func;params=resetUser{boolean}")
 */
exports.resetSession = function (options, successCallback, errorCallback) {
    var arguments = [];

    if (checkBooleanOption("resetSession", "resetUser", options, errorCallback, true)) {
        arguments.push(options["resetUser"]);
    } else {
        return;
    }

    execWithCallbacks(successCallback, errorCallback, RESET_SESSION, arguments);
};

// @deprecated Should be removed in next release Fullscreen sensitive mode

/**
 * @deprecated This method is deprecated and should not be further used. Please use:
 * Smartlook.setRenderingMode({renderingMode: Smartlook.RenderingMode.NO_RENDERING})
 * 
 * @description When you start sensitive mode SDK records blank videos (single color) but SDK still 
 *              sends Analytic events.
 * 
 * @SL_COMPATIBILITY_NAME("name=startFullscreenSensitiveMode;type=func;deprecated=yes")
 */
exports.startFullscreenSensitiveMode = function (successCallback, errorCallback) {
    console.warn("Calling deprecated function!");
    fullscreenModeActive = true;
    exports.setRenderingMode({renderingMode: exports.RenderingMode.NO_RENDERING}, successCallback, errorCallback);
};

/**
 * @deprecated This method is deprecated and should not be further used. Please use:
 * Smartlook.setRenderingMode({renderingMode: Smartlook.RenderingMode.NO_RENDERING})
 * 
 * @description Stop sensitive mode -> SDK records video.
 * 
 * @SL_COMPATIBILITY_NAME("name=stopFullscreenSensitiveMode;type=func;deprecated=yes")
 */
exports.stopFullscreenSensitiveMode = function (successCallback, errorCallback) {
    console.warn("Calling deprecated function!");
    fullscreenModeActive = false;
    exports.setRenderingMode({renderingMode: exports.RenderingMode.NATIVE}, successCallback, errorCallback);
};

/**
 * @deprecated This method is deprecated and should not be further used.
 * 
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
 * 
 * @SL_COMPATIBILITY_NAME("name=isFullscreenSensitiveModeActive;type=func;returns=boolean;deprecated=yes")
 */
exports.isFullscreenSensitiveModeActive = function (successCallback, errorCallback) {
    console.warn("Calling deprecated function!");
    successCallback(fullscreenModeActive);
};


// User identification

/**
 * @description Identify user with identifier and optional properties.
 * 
 * @param options.identifier        String Id that can be used to identify user and his records. You will see this
 *                                  Id in Smartlook dashboard so you can pair records with concrete user.
 * @param options.sessionProperties (Optional) Additional properties object that will be paired with every session and can
 *                                  be viewed in Smartlook dashboard.
 * 
 * @SL_COMPATIBILITY_NAME("name=setUserIdentifier;type=func;params=identifier{string}")
 * @SL_COMPATIBILITY_NAME("name=setUserProperties;type=func;params=sessionProperties{JSONObject},immutable{boolean}")
 * @SL_COMPATIBILITY_NAME("name=setUserProperties;type=func;params=sessionProperties{Bundle},immutable{boolean}")
 * @SL_COMPATIBILITY_NAME("name=setUserProperties;type=func;params=sessionProperties{string},immutable{boolean}")
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
 *                                  - EventTrackingMode.IGNORE_USER_INTERACTION ... will not track touches
 *                                    focus, keyboard, selector events
 *                                  - EventTrackingMode.IGNORE_NAVIGATION_INTERACTION ... will not track screen names
 *                                  - EventTrackingMode.IGNORE_RAGE_CLICKS ... will not track rage clicks
 *                                  - EventTrackingMode.NO_TRACKING ... not gonna track any events
 */
exports.setEventTrackingMode = function (options, successCallback, errorCallback) {
    var arguments = [];
    var allowedValues = [
        exports.EventTrackingMode.FULL_TRACKING,
        exports.EventTrackingMode.IGNORE_USER_INTERACTION,
        exports.EventTrackingMode.IGNORE_NAVIGATION_INTERACTION,
        exports.EventTrackingMode.IGNORE_RAGE_CLICKS,
        exports.EventTrackingMode.NO_TRACKING];

    if (checkStringArrayOption("setEventTrackingMode", options["eventTrackingMode"], "eventTrackingMode", allowedValues, errorCallback, true)) {
        arguments.push(options["eventTrackingMode"]);
    } else {
        return;
    }

    execWithCallbacks(successCallback, errorCallback, SET_EVENT_TRACKING_MODE, arguments);
}

/**
 * @description You can configure which events are being tracked by setting eventTrackingMode.
 * 
 * @param options.eventTrackingModes Array of EventTrackingMode tha can be one of:
 *                                  - EventTrackingMode.FULL_TRACKING ... track everything
 *                                  - EventTrackingMode.IGNORE_USER_INTERACTION ... will not track touches
 *                                    focus, keyboard, selector events
 *                                  - EventTrackingMode.IGNORE_NAVIGATION_INTERACTION ... will not track screen names
 *                                  - EventTrackingMode.IGNORE_RAGE_CLICKS ... will not track rage clicks
 *                                  - EventTrackingMode.NO_TRACKING ... not gonna track any events
 */
exports.setEventTrackingModes = function (options, successCallback, errorCallback) {
    var arguments = [];

    if (checkEventTrackingModeArray("setEventTrackingModes", options, errorCallback, true)) {
        arguments.push(options["eventTrackingModes"]);
    } else {
        return;
    }

    execWithCallbacks(successCallback, errorCallback, SET_EVENT_TRACKING_MODES, arguments);
}

/**
 * @description Track custom navigation event.
 * 
 * @param options.name      Controler/Activity/Page name.
 * @param options.viewState One of Smartlook.ViewState.START or Smartlook.ViewState.STOP.
 * 
 * @SL_COMPATIBILITY_NAME("name=trackNavigationEvent;type=func;params=name{string},viewState{string}")
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

    if (checkStringArrayOption("trackNavigationEvent", options["viewState"], "viewState", allowedValues, errorCallback, true)) {
        arguments.push(options["viewState"]);
    } else {
        return;
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
 * 
 * @SL_COMPATIBILITY_NAME("name=startTimedCustomEvent;type=func;params=eventName{string};returns=string")
 * @SL_COMPATIBILITY_NAME("name=startTimedCustomEvent;type=func;params=eventName{string},eventProperties{JSONObject};returns=string")
 * @SL_COMPATIBILITY_NAME("name=startTimedCustomEvent;type=func;params=eventName{string},bundle{Bundle};returns=string")
 * @SL_COMPATIBILITY_NAME("name=startTimedCustomEvent;type=func;params=eventName{string},eventProperties{string};returns=string")
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
 * 
 * @SL_COMPATIBILITY_NAME("name=stopTimedCustomEvent;type=func;params=eventId{string}")
 * @SL_COMPATIBILITY_NAME("name=stopTimedCustomEvent;type=func;params=eventId{string},eventProperties{JSONObject}")
 * @SL_COMPATIBILITY_NAME("name=stopTimedCustomEvent;type=func;params=eventId{string},bundle{Bundle}")
 * @SL_COMPATIBILITY_NAME("name=stopTimedCustomEvent;type=func;params=eventId{string},eventProperties{string}")
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
 * 
 * @SL_COMPATIBILITY_NAME("name=cancelTimedCustomEvent;type=func;params=eventId{string},reason{string}")
 * @SL_COMPATIBILITY_NAME("name=cancelTimedCustomEvent;type=func;params=eventId{string},reason{string},eventProperties{JSONObject}")
 * @SL_COMPATIBILITY_NAME("name=cancelTimedCustomEvent;type=func;params=eventId{string},reason{string},bundle{Bundle}")
 * @SL_COMPATIBILITY_NAME("name=cancelTimedCustomEvent;type=func;params=eventId{string},reason{string},eventProperties{string}")
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
 * 
 * @SL_COMPATIBILITY_NAME("name=trackCustomEvent;type=func;params=eventName{string}")
 * @SL_COMPATIBILITY_NAME("name=trackCustomEvent;type=func;params=eventName{string},eventProperties{JSONObject}")
 * @SL_COMPATIBILITY_NAME("name=trackCustomEvent;type=func;params=eventName{string},bundle{Bundle}")
 * @SL_COMPATIBILITY_NAME("name=trackCustomEvent;type=func;params=eventName{string},properties{string}")
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
 * 
 * @SL_COMPATIBILITY_NAME("name=setGlobalEventProperties;type=func;params=globalEventProperties{JSONObject},immutable{boolean}")
 * @SL_COMPATIBILITY_NAME("name=setGlobalEventProperties;type=func;params=globalEventProperties{Bundle},immutable{boolean}")
 * @SL_COMPATIBILITY_NAME("name=setGlobalEventProperties;type=func;params=globalEventProperties{string},immutable{boolean}")
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
        return;
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
 * 
 * @SL_COMPATIBILITY_NAME("name=setGlobalEventProperty;type=func;params=key{string},value{string},immutable{boolean}")
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
        return;
    }

    execWithCallbacks(successCallback, errorCallback, SET_GLOBAL_EVENT_PROPERTY, arguments);
};

/**
 * @description Remove property from global event properties.
 * 
 * @param options.key Key of global event property that needs to be removed.
 * 
 * @SL_COMPATIBILITY_NAME("name=removeGlobalEventProperty;type=func;params=key{string}")
 */
exports.removeGlobalEventProperty = function (options, successCallback, errorCallback) {
    var arguments = [];
    
    if (checkStringOption("removeGlobalEventProperty", "key", options, errorCallback, true)) {
        arguments.push(options["key"]);
    } else {
        return;
    }

    execWithCallbacks(successCallback, errorCallback, REMOVE_GLOBAL_EVENT_PROPERTY, arguments);
};

/**
 * @description Remove all properties from global event properties.
 * 
 * @SL_COMPATIBILITY_NAME("name=removeAllGlobalEventProperties;type=func")
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
 * 
 * @SL_COMPATIBILITY_NAME("name=setReferrer;type=func;params=referrer{string},source{string}")
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
 * Smartlook.getDashboardSessionUrl({withCurrentTimestamp: true}, successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('Shareable dashboard session URL: ' + value);
 * }
 * 
 * @SL_COMPATIBILITY_NAME("name=getDashboardSessionUrl;type=func;params=withCurrentTimestamp{boolean};returns=string")
 */
exports.getDashboardSessionUrl = function (options, successCallback, errorCallback) {
    var arguments = [];

    if (checkBooleanOption("getDashboardSessionUrl", "withCurrentTimestamp", options, errorCallback, false)) {
        arguments.push(options["withCurrentTimestamp"]);
    }

    execWithCallbacks(successCallback, errorCallback, GET_DASHBOARD_SESSION_URL, arguments);
};

/**
 * @description Obtain sharable url to visitor page in our dashboard.
 * 
 * @callback successCallback Callback value set to dashboard visitorURL.
 * 
 * @example
 * Smartlook.getDashboardVisitorUrl(successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('Shareable dashboard visitor URL: ' + value);
 * }
 * 
 * @SL_COMPATIBILITY_NAME("name=getDashboardVisitorUrl;type=func;returns=string")
 */
exports.getDashboardVisitorUrl = function (successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, GET_DASHBOARD_VISITOR_URL, []);
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
    execWithCallbacks(successCallback, errorCallback, REGISTER_LOG_LISTENER, []);
}

/**
 * You can unregister allback to all public SDK logs if registered before.
 */
exports.unregisterLogListener = function(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, UNREGISTER_LOG_LISTENER, []);
}

/**
 * By changing rendering method you can adjust the way we render the application for recordings.
 * 
 * @param options.renderingMode       Mode defining the video output of recording. Curently only
 *                                    RenderingMode.NO_RENDERING and RenderingMode.NATIVE available.
 * @param options.renderingModeOption [NOT IMPLEMENTED]  
 * 
 * @SL_COMPATIBILITY_NAME("name=setRenderingMode;type=func;params=renderingMode{string}")
 */
exports.setRenderingMode = function(options, successCallback, errorCallback) {
    var arguments = [];
    
    var allowedValues = [
        exports.RenderingMode.NO_RENDERING,
        exports.RenderingMode.NATIVE];

    if (checkStringArrayOption("setRenderingMode", options["renderingMode"], "renderingMode", allowedValues, errorCallback, true)) {
        arguments.push(options["renderingMode"]);
    } else {
        return;
    }

    execWithCallbacks(successCallback, errorCallback, SET_RENDERING_MODE, arguments);    
}

// Integrations

/**
 * @description Integration listener can be used to obtain dashboard URL for current session and visitor.
 * These URLs can be propagated to various analytic tools/SDKs.
 * 
 * @callback options.onSessionReady Called when dashboard session URL is ready. Note that this URL can be accesed only by user
 * that has access to Smartlook dashboard (it is not public share link).
 * 
 * @callback options.onVisitorReady Called when dashboard visitor URL is ready. Note that this URL can be accesed only by user
 * that has access to Smartlook dashboard (it is not public share link).
 * 
 * @example
 * Smartlook.registerIntegrationListener({
 *      onSessionReady: function (dashboardSessionUrl) { alert("Session: " + dashboardSessionUrl); },
 *      onVisitorReady: function (dashboardVisitorUrl) { alert("Visitor: " + dashboardVisitorUrl); }
 *   });
 * }
 * 
 * @SL_COMPATIBILITY_NAME("name=registerIntegrationListener;type=func;params=integrationListener{IntegrationListener}")
 * @SL_COMPATIBILITY_NAME("name=IntegrationListener;type=callback;members=onSessionReady,onVisitorReady")
 */
exports.registerIntegrationListener = function(options, successCallback, errorCallback) {
    var integrationCallback = function(callbackData) { 
        if (callbackData != undefined && callbackData["url"] != undefined && callbackData["url"].length > 0) {
            if (callbackData["callback"] === SESSION_READY_CALLBACK) {
                options["onSessionReady"](callbackData["url"]);
            } else if (callbackData["callback"] === VISITOR_READY_CALLBACK) {
                options["onVisitorReady"](callbackData["url"]);
            }
        }
    };

    execWithCallbacks(integrationCallback, errorCallback, REGISTER_INTEGRATION_LISTENER, []);
    successCallback();
}

/**
 * @description Unregister Integration listener (@see registerIntegrationListener())
 * 
 * @SL_COMPATIBILITY_NAME("name=unregisterIntegrationListener;type=func")
 */
exports.unregisterIntegrationListener = function(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, UNREGISTER_INTEGRATION_LISTENER, []);
}

// Internal logic

function setPluginVersion() {
    exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_PLUGIN_VERISION, [SMARTLOOK_FRAMEWORK, SMARTLOOK_FRAMEWORK_VERSION, SMARTLOOK_FRAMEWORK_PLUGIN_VERSION]);
}

////////////////////////////////////////////////////////////////////////////////
// Check and Utility methods

// Check functions

function checkStringOption(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option];

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");
        }

        return false;
    }

    if (typeof toCheck !== 'string' || toCheck.length < 1) {
        logError(errorCallback, method + "(): " + option + " must be non-empty string!");
        return false;
    }

    return true;
}

function checkStringArrayOption(method, toCheck, option, possibleValueArray, errorCallback, isMandatory) {

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");
        }

        return false;
    }

    if (typeof toCheck === 'string') {
        var found = false;
        var errorMessagePossibilities = "";
        for (var i = 0; i < possibleValueArray.length; i++) {
            if (possibleValueArray[i] === toCheck) {
                found = true;
            }

            errorMessagePossibilities += possibleValueArray[i] + " ";
        }
        
        errorMessagePossibilities.trim();

        if (!found) {
            logError(errorCallback, method + "(): " + option + " must be one of: " + errorMessagePossibilities);
            return false;
        }
    } else {
        logError(errorCallback, method + "(): " + option + " must be one of: " + errorMessagePossibilities);
        return false;
    }

    return true;
}

function checkBooleanOption(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option];

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");
        }

        return false;
    }

    if (typeof toCheck !== 'boolean') {
        logError(errorCallback, method + "(): " + option + " must be boolean!");
        return false;
    }

    return true;
}

function checkProperties(method, option, options, errorCallback, isMandatory) {
    var toCheck = options[option];

    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with " + option + " option!");     
        }

        return false;
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
        
        return false;
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

function checkEventTrackingModeArray(method, options, errorCallback, isMandatory) {
    var allowedValues = [
        exports.EventTrackingMode.FULL_TRACKING,
        exports.EventTrackingMode.IGNORE_USER_INTERACTION,
        exports.EventTrackingMode.IGNORE_NAVIGATION_INTERACTION,
        exports.EventTrackingMode.IGNORE_RAGE_CLICKS,
        exports.EventTrackingMode.NO_TRACKING];

    var eventTrackingModeArray = options["eventTrackingModes"];
    var noneFailed = true;    

    if (eventTrackingModeArray == undefined || eventTrackingModeArray == null || !Array.isArray(eventTrackingModeArray)) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, method + "(): must be called with eventTrackingModes array option!");     
        }

        return false;
    } 

    for (var i = 0; i < eventTrackingModeArray.length; i++) {
        console.log("checkEventTrackingModeArray(): gonna check: " + eventTrackingModeArray[i]);
        if (!checkStringArrayOption(method, eventTrackingModeArray[i], "eventTrackingMode", allowedValues, errorCallback, isMandatory)) {
            noneFailed = false;
        }
    }

    return noneFailed;
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
