"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterIntegrationListener = exports.registerIntegrationListener = exports.setRenderingMode = exports.unregisterLogListener = exports.registerLogListener = exports.getDashboardVisitorUrl = exports.getDashboardSessionUrl = exports.setReferrer = exports.removeAllGlobalEventProperties = exports.removeGlobalEventProperty = exports.setGlobalEventProperty = exports.setGlobalEventProperties = exports.trackCustomEvent = exports.cancelTimedCustomEvent = exports.stopTimedCustomEvent = exports.startTimedCustomEvent = exports.trackNavigationEvent = exports.setEventTrackingModes = exports.setEventTrackingMode = exports.setUserIdentifier = exports.resetSession = exports.isRecording = exports.stopRecording = exports.startRecording = exports.setup = exports.setupAndStartRecording = exports.RenderingMode = exports.EventTrackingMode = exports.ViewState = exports.Command = void 0;
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
    // Setup and lifecycle
    Command["SETUP_AND_START_RECORDING"] = "setupAndStartRecording";
    Command["SETUP"] = "setup";
    Command["START_RECORDING"] = "startRecording";
    Command["STOP_RECORDING"] = "stopRecording";
    Command["IS_RECORDING"] = "isRecording";
    Command["RESET_SESSION"] = "resetSession";
    // User identifier
    Command["SET_USER_IDENTIFIER"] = "setUserIdentifier";
    //Tracking
    Command["SET_EVENT_TRACKING_MODE"] = "setEventTrackingMode";
    Command["SET_EVENT_TRACKING_MODES"] = "setEventTrackingModes";
    Command["TRACK_NAVIGATION_EVENT"] = "trackNavigationEvent";
    Command["START_TIMED_CUSTOM_EVENT"] = "startTimedCustomEvent";
    Command["STOP_TIMED_CUSTOM_EVENT"] = "stopTimedCustomEvent";
    Command["CANCEL_TIMED_CUSTOM_EVENT"] = "cancelTimedCustomEvent";
    Command["TRACK_CUSTOM_EVENT"] = "trackCustomEvent";
    // Event properties
    Command["SET_GLOBAL_EVENT_PROPERTIES"] = "setGlobalEventProperties";
    Command["SET_GLOBAL_EVENT_PROPERTY"] = "setGlobalEventProperty";
    Command["REMOVE_GLOBAL_EVENT_PROPERTY"] = "removeGlobalEventProperty";
    Command["REMOVE_ALL_GLOBAL_EVENT_PROPERTIES"] = "removeAllGlobalEventProperties";
    // Utilities
    Command["SET_REFERRER"] = "setReferrer";
    Command["GET_DASHBOARD_SESSION_URL"] = "getDashboardSessionUrl";
    Command["GET_DASHBOARD_VISITOR_URL"] = "getDashboardVisitorUrl";
    Command["REGISTER_LOG_LISTENER"] = "registerLogListener";
    Command["UNREGISTER_LOG_LISTENER"] = "unregisterLogListener";
    Command["SET_RENDERING_MODE"] = "setRenderingMode";
    //Integrations
    Command["REGISTER_INTEGRATION_LISTENER"] = "registerIntegrationListener";
    Command["UNREGISTER_INTEGRATION_LISTENER"] = "unregisterIntegrationListener";
    // Callbacks
    Command["SESSION_READY_CALLBACK"] = "onSessionReady";
    Command["VISITOR_READY_CALLBACK"] = "onVisitorReady";
})(Command = exports.Command || (exports.Command = {}));
// Internal logic
var SET_PLUGIN_VERSION = 'setPluginVersion';
// Undefined
var UNDEFINED_FPS = -1;
var UNDEFINED_RENDERING_MODE = '';
var emptyCallback = function () {
    return;
};
////////////////////////////////////////////////////////////////////////////////
// SDK API constants
var ViewState;
(function (ViewState) {
    ViewState["START"] = "start";
    ViewState["STOP"] = "stop";
})(ViewState = exports.ViewState || (exports.ViewState = {}));
var EventTrackingMode;
(function (EventTrackingMode) {
    EventTrackingMode["FULL_TRACKING"] = "full_tracking";
    EventTrackingMode["IGNORE_USER_INTERACTION"] = "ignore_user_interaction";
    EventTrackingMode["IGNORE_NAVIGATION_INTERACTION"] = "ignore_navigation_interaction";
    EventTrackingMode["IGNORE_RAGE_CLICKS"] = "ignore_rage_clicks";
    EventTrackingMode["NO_TRACKING"] = "no_tracking";
})(EventTrackingMode = exports.EventTrackingMode || (exports.EventTrackingMode = {}));
var RenderingMode;
(function (RenderingMode) {
    RenderingMode["NO_RENDERING"] = "no_rendering";
    RenderingMode["NATIVE"] = "native";
})(RenderingMode = exports.RenderingMode || (exports.RenderingMode = {}));
// Setup and lifecycle
/**
 * @deprecated Variable used only for support of deprecated methods. Should be removed on next release.
 */
var fullscreenModeActive = false;
/**
 * @description Setup and start Smartlook SDK recording.
 *
 * @param options.smartlookAPIKey        Unique 40 character key identifying your app. You can find in your
 *                                       dashboard. If invalid key is set SDK will not work properly.
 * @param options.fps                    (Optional) Desired FPS for the recording, that must be in range from 1 to 10.
 * @param options.renderingMode          (Optional) Mode defining the video output of recording.
 * @param options.startNewSession        (Optional) If true new session is going to be created.
 * @param options.startNewSessionAndUser (Optional) If true new session and visitor is going to be created.
 * @param options.eventTrackingModes     (Optional) Array of EventTrackingModes that should be applied to recording.
 */
function setupAndStartRecording(options, successCallback, errorCallback) {
    setPluginVersion();
    var args = [];
    var renderingModeAllowedValues = [RenderingMode.NO_RENDERING, RenderingMode.NATIVE];
    if (checkStringOption('smartlookAPIKey', options, errorCallback, true)) {
        args.push(options['smartlookAPIKey']);
    }
    else {
        return;
    }
    if (checkFpsOption(options, errorCallback, false)) {
        args.push(options['fps']);
    }
    else {
        args.push(UNDEFINED_FPS);
    }
    if (checkStringArrayOption(options['renderingMode'], 'renderingMode', renderingModeAllowedValues, errorCallback, false)) {
        args.push(options['renderingMode']);
    }
    else {
        args.push(UNDEFINED_RENDERING_MODE);
    }
    if (checkBooleanOption('startNewSession', options, errorCallback, false)) {
        args.push(options['startNewSession']);
    }
    else {
        args.push(false);
    }
    if (checkBooleanOption('startNewSessionAndUser', options, errorCallback, false)) {
        args.push(options['startNewSessionAndUser']);
    }
    else {
        args.push(false);
    }
    if (checkEventTrackingModeArray(options, errorCallback, false)) {
        args.push(options['eventTrackingModes']);
    }
    else {
        args.push([]);
    }
    execWithCallbacks(successCallback, errorCallback, Command.SETUP_AND_START_RECORDING, args);
}
exports.setupAndStartRecording = setupAndStartRecording;
/**
 * @description Setup/initialize Smartlook SDK. This method DOESN'T start the recording (@see Smartlook.startRecording())
 *
 * @param options.smartlookAPIKey        Unique 40 character key identifying your app. You can find in your
 *                                       dashboard. If invalid key is set SDK will not work properly.
 * @param options.fps                    (Optional) Desired FPS for the recording, that must be in range from 1 to 10.
 * @param options.renderingMode          (Optional) Mode defining the video output of recording.
 * @param options.startNewSession        (Optional) If true new session is going to be created.
 * @param options.startNewSessionAndUser (Optional) If true new session and visitor is going to be created.
 * @param options.eventTrackingModes     (Optional) Array of EventTrackingModes that should be applied to recording.
 */
function setup(options, successCallback, errorCallback) {
    setPluginVersion();
    var args = [];
    var renderingModeAllowedValues = [RenderingMode.NO_RENDERING, RenderingMode.NATIVE];
    if (checkStringOption('smartlookAPIKey', options, errorCallback, true)) {
        args.push(options['smartlookAPIKey']);
    }
    else {
        return;
    }
    if (checkFpsOption(options, errorCallback, false)) {
        args.push(options['fps']);
    }
    else {
        args.push(UNDEFINED_FPS);
    }
    if (checkStringArrayOption(options['renderingMode'], 'renderingMode', renderingModeAllowedValues, errorCallback, false)) {
        args.push(options['renderingMode']);
    }
    else {
        args.push(UNDEFINED_RENDERING_MODE);
    }
    if (checkBooleanOption('startNewSession', options, errorCallback, false)) {
        args.push(options['startNewSession']);
    }
    else {
        args.push(false);
    }
    if (checkBooleanOption('startNewSessionAndUser', options, errorCallback, false)) {
        args.push(options['startNewSessionAndUser']);
    }
    else {
        args.push(false);
    }
    if (checkEventTrackingModeArray(options, errorCallback, false)) {
        args.push(options['eventTrackingModes']);
    }
    else {
        args.push([]);
    }
    execWithCallbacks(successCallback, errorCallback, Command.SETUP, args);
}
exports.setup = setup;
/**
 * @description Start SDK recording.
 */
function startRecording(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.START_RECORDING, []);
}
exports.startRecording = startRecording;
/**
 * @description Stop SDK recording.
 */
function stopRecording(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.STOP_RECORDING, []);
}
exports.stopRecording = stopRecording;
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
function isRecording(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.IS_RECORDING, []);
}
exports.isRecording = isRecording;
/**
 * @description Resets current session and new session in dashboard is created.
 *
 * @param options.resetUser (Optional) If set to TRUE new visitor is created in the dashboard.
 */
function resetSession(options, successCallback, errorCallback) {
    var args = [];
    if (checkBooleanOption('resetUser', options, errorCallback, true)) {
        args.push(options['resetUser']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.RESET_SESSION, args);
}
exports.resetSession = resetSession;
// User identification
/**
 * @description Identify user with identifier and optional properties.
 *
 * @param options.identifier        String Id that can be used to identify user and his records. You will see this
 *                                  Id in Smartlook dashboard so you can pair records with concrete user.
 * @param options.sessionProperties (Optional) Additional properties object that will be paired with every session and can
 *                                  be viewed in Smartlook dashboard.
 */
function setUserIdentifier(options, successCallback, errorCallback) {
    var args = [];
    if (checkStringOption('identifier', options, errorCallback, true)) {
        args.push(options['identifier']);
    }
    else {
        return;
    }
    if (checkProperties('sessionProperties', options, errorCallback, false)) {
        args.push(options['sessionProperties']);
    }
    execWithCallbacks(successCallback, errorCallback, Command.SET_USER_IDENTIFIER, args);
}
exports.setUserIdentifier = setUserIdentifier;
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
function setEventTrackingMode(options, successCallback, errorCallback) {
    var args = [];
    var allowedValues = [
        EventTrackingMode.FULL_TRACKING,
        EventTrackingMode.IGNORE_USER_INTERACTION,
        EventTrackingMode.IGNORE_NAVIGATION_INTERACTION,
        EventTrackingMode.IGNORE_RAGE_CLICKS,
        EventTrackingMode.NO_TRACKING,
    ];
    if (checkStringArrayOption(options['eventTrackingMode'], 'eventTrackingMode', allowedValues, errorCallback, true)) {
        args.push(options['eventTrackingMode']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.SET_EVENT_TRACKING_MODE, args);
}
exports.setEventTrackingMode = setEventTrackingMode;
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
function setEventTrackingModes(options, successCallback, errorCallback) {
    var args = [];
    if (checkEventTrackingModeArray(options, errorCallback, true)) {
        args.push(options['eventTrackingModes']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.SET_EVENT_TRACKING_MODES, args);
}
exports.setEventTrackingModes = setEventTrackingModes;
/**
 * @description Track custom navigation event.
 *
 * @param options.name      Controller/Activity/Page name.
 * @param options.viewState One of Smartlook.ViewState.START or Smartlook.ViewState.STOP.
 */
function trackNavigationEvent(options, successCallback, errorCallback) {
    var args = [];
    var allowedValues = [ViewState.START, ViewState.STOP];
    if (checkStringOption('name', options, errorCallback, true)) {
        args.push(options['name']);
    }
    else {
        return;
    }
    if (checkStringArrayOption(options['viewState'], 'viewState', allowedValues, errorCallback, true)) {
        args.push(options['viewState']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.TRACK_NAVIGATION_EVENT, args);
}
exports.trackNavigationEvent = trackNavigationEvent;
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
function startTimedCustomEvent(options, successCallback, errorCallback) {
    var args = [];
    if (checkStringOption('name', options, errorCallback, true)) {
        args.push(options['name']);
    }
    else {
        return;
    }
    if (checkProperties('eventProperties', options, errorCallback, false)) {
        args.push(options['eventProperties']);
    }
    execWithCallbacks(successCallback, errorCallback, Command.START_TIMED_CUSTOM_EVENT, args);
}
exports.startTimedCustomEvent = startTimedCustomEvent;
/**
 * @description Stops timed event. Duration from according start is calculated and send with the event.
 *
 * @param options.eventId         Unique event id that is used to identify this event.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
function stopTimedCustomEvent(options, successCallback, errorCallback) {
    var args = [];
    if (checkStringOption('eventId', options, errorCallback, true)) {
        args.push(options['eventId']);
    }
    else {
        return;
    }
    if (checkProperties('eventProperties', options, errorCallback, false)) {
        args.push(options['eventProperties']);
    }
    execWithCallbacks(successCallback, errorCallback, Command.STOP_TIMED_CUSTOM_EVENT, args);
}
exports.stopTimedCustomEvent = stopTimedCustomEvent;
/**
 * @description Cancels timed event. It calculates event duration and notes that this event has failed.
 *
 * @param options.eventId         Unique event id that is used to identify this event.
 * @param options.reason          Short string description explaining why the event was canceled.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
function cancelTimedCustomEvent(options, successCallback, errorCallback) {
    var args = [];
    if (checkStringOption('eventId', options, errorCallback, true)) {
        args.push(options['eventId']);
    }
    else {
        return;
    }
    if (checkStringOption('reason', options, errorCallback, true)) {
        args.push(options['reason']);
    }
    else {
        return;
    }
    if (checkProperties('eventProperties', options, errorCallback, false)) {
        args.push(options['eventProperties']);
    }
    execWithCallbacks(successCallback, errorCallback, Command.CANCEL_TIMED_CUSTOM_EVENT, args);
}
exports.cancelTimedCustomEvent = cancelTimedCustomEvent;
/**
 * @description Track custom event.
 *
 * @param options.name            String used to identify event.
 * @param options.eventProperties (Optional) Event data stored in object.
 */
function trackCustomEvent(options, successCallback, errorCallback) {
    var args = [];
    if (checkStringOption('name', options, errorCallback, true)) {
        args.push(options['name']);
    }
    else {
        return;
    }
    if (checkProperties('eventProperties', options, errorCallback, false)) {
        args.push(options['eventProperties']);
    }
    execWithCallbacks(successCallback, errorCallback, Command.TRACK_CUSTOM_EVENT, args);
}
exports.trackCustomEvent = trackCustomEvent;
// Event properties
/**
 * @description Set global event properties that will be added to every tracked event.
 *
 * @param options.globalEventProperties Global event properties stored in object.
 * @param options.immutable             If set to TRUE these properties have higher priority than mutable ones
 *                                      and also they cannot be changed (only removed).
 */
function setGlobalEventProperties(options, successCallback, errorCallback) {
    var args = [];
    if (checkProperties('globalEventProperties', options, errorCallback, true)) {
        args.push(options['globalEventProperties']);
    }
    else {
        return;
    }
    if (checkBooleanOption('immutable', options, errorCallback, true)) {
        args.push(options['immutable']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.SET_GLOBAL_EVENT_PROPERTIES, args);
}
exports.setGlobalEventProperties = setGlobalEventProperties;
/**
 * @description Set global event property that will be added to every tracked event.
 *
 * @param options.key        Global event property key.
 * @param options.value      Global event property value.
 * @param options.immutable  If set to TRUE this property has higher priority than mutable ones and also it
 *                           cannot be changed (only removed).
 */
function setGlobalEventProperty(options, successCallback, errorCallback) {
    var args = [];
    if (checkKeyValueOptions(options, errorCallback, true)) {
        args.push(options['key']);
        args.push(options['value']);
    }
    else {
        return;
    }
    if (checkBooleanOption('immutable', options, errorCallback, true)) {
        args.push(options['immutable']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.SET_GLOBAL_EVENT_PROPERTY, args);
}
exports.setGlobalEventProperty = setGlobalEventProperty;
/**
 * @description Remove property from global event properties.
 *
 * @param options.key Key of global event property that needs to be removed.
 */
function removeGlobalEventProperty(options, successCallback, errorCallback) {
    var args = [];
    if (checkStringOption('key', options, errorCallback, true)) {
        args.push(options['key']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.REMOVE_GLOBAL_EVENT_PROPERTY, args);
}
exports.removeGlobalEventProperty = removeGlobalEventProperty;
/**
 * @description Remove all properties from global event properties.
 */
function removeAllGlobalEventProperties(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.REMOVE_ALL_GLOBAL_EVENT_PROPERTIES, []);
}
exports.removeAllGlobalEventProperties = removeAllGlobalEventProperties;
// Utilities
/**
 * @description Possibility to manually set referrer and source of the installation visible in dashboard
 *              and accessible via filters
 *
 * @param referrer Desired referrer value
 * @param source   Desired source, i.e. com.android.vending or com.amazon.venezia
 */
function setReferrer(options, successCallback, errorCallback) {
    var args = [];
    if (checkStringOption('referrer', options, errorCallback, true)) {
        args.push(options['referrer']);
    }
    else {
        return;
    }
    if (checkStringOption('source', options, errorCallback, true)) {
        args.push(options['source']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.SET_REFERRER, args);
}
exports.setReferrer = setReferrer;
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
 */
function getDashboardSessionUrl(options, successCallback, errorCallback) {
    var args = [];
    if (checkBooleanOption('withCurrentTimestamp', options, errorCallback, false)) {
        args.push(options['withCurrentTimestamp']);
    }
    execWithCallbacks(successCallback, errorCallback, Command.GET_DASHBOARD_SESSION_URL, args);
}
exports.getDashboardSessionUrl = getDashboardSessionUrl;
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
 */
function getDashboardVisitorUrl(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.GET_DASHBOARD_VISITOR_URL, []);
}
exports.getDashboardVisitorUrl = getDashboardVisitorUrl;
/**
 * You can register callback to all public SDK logs.
 *
 * @callback successCallback Callback value contains log message in given format: `TAG[severity]: message`
 *
 * @example
 * Smartlook.registerLogListener(successCallback, ...);
 *
 * function successCallback(value) {
 *     alert('SDK logged: ' + value);
 * }
 */
function registerLogListener(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.REGISTER_LOG_LISTENER, []);
}
exports.registerLogListener = registerLogListener;
/**
 * You can unregister callback to all public SDK logs if registered before.
 */
function unregisterLogListener(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.UNREGISTER_LOG_LISTENER, []);
}
exports.unregisterLogListener = unregisterLogListener;
/**
 * By changing rendering method you can adjust the way we render the application for recordings.
 *
 * @param options.renderingMode       Mode defining the video output of recording. Currently only
 *                                    RenderingMode.NO_RENDERING and RenderingMode.NATIVE available.
 * @param options.renderingModeOption [NOT IMPLEMENTED]
 */
function setRenderingMode(options, successCallback, errorCallback) {
    var args = [];
    var allowedValues = [RenderingMode.NO_RENDERING, RenderingMode.NATIVE];
    if (checkStringArrayOption(options['renderingMode'], 'renderingMode', allowedValues, errorCallback, true)) {
        args.push(options['renderingMode']);
    }
    else {
        return;
    }
    execWithCallbacks(successCallback, errorCallback, Command.SET_RENDERING_MODE, args);
}
exports.setRenderingMode = setRenderingMode;
// Integrations
/**
 * @description Integration listener can be used to obtain dashboard URL for current session and visitor.
 * These URLs can be propagated to various analytic tools/SDKs.
 *
 * @callback options.onSessionReady Called when dashboard session URL is ready. Note that this URL can be accessed only by user
 * that has access to Smartlook dashboard (it is not public share link).
 *
 * @callback options.onVisitorReady Called when dashboard visitor URL is ready. Note that this URL can be accessed only by user
 * that has access to Smartlook dashboard (it is not public share link).
 *
 * @example
 * Smartlook.registerIntegrationListener({
 *      onSessionReady: function (dashboardSessionUrl) { alert("Session: " + dashboardSessionUrl); },
 *      onVisitorReady: function (dashboardVisitorUrl) { alert("Visitor: " + dashboardVisitorUrl); }
 *   });
 * }
 */
function registerIntegrationListener(options, successCallback, errorCallback) {
    var integrationCallback = function (callbackData) {
        if (callbackData != undefined && callbackData['url'] != undefined && callbackData['url'].length > 0) {
            if (callbackData['callback'] === Command.SESSION_READY_CALLBACK) {
                options['onSessionReady'](callbackData['url']);
            }
            else if (callbackData['callback'] === Command.VISITOR_READY_CALLBACK) {
                options['onVisitorReady'](callbackData['url']);
            }
        }
    };
    execWithCallbacks(integrationCallback, errorCallback, Command.REGISTER_INTEGRATION_LISTENER, []);
    successCallback('');
}
exports.registerIntegrationListener = registerIntegrationListener;
/**
 * @description Unregister Integration listener (@see registerIntegrationListener())
 */
function unregisterIntegrationListener(successCallback, errorCallback) {
    execWithCallbacks(successCallback, errorCallback, Command.UNREGISTER_INTEGRATION_LISTENER, []);
}
exports.unregisterIntegrationListener = unregisterIntegrationListener;
// Internal logic
function setPluginVersion() {
    cordova.exec(emptyCallback, emptyCallback, SMARTLOOK_PLUGIN, SET_PLUGIN_VERSION, [
        SMARTLOOK_FRAMEWORK,
        SMARTLOOK_FRAMEWORK_VERSION,
        SMARTLOOK_FRAMEWORK_PLUGIN_VERSION,
    ]);
}
////////////////////////////////////////////////////////////////////////////////
// Check and Utility methods
// Check functions
function checkStringOption(option, options, errorCallback, isMandatory) {
    var toCheck = options[option];
    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, option + ' option is mandatory!');
        }
        return false;
    }
    if (typeof toCheck !== 'string' || toCheck.length < 1) {
        logError(errorCallback, option + ' must be non-empty string!');
        return false;
    }
    return true;
}
function checkStringArrayOption(toCheck, option, possibleValueArray, errorCallback, isMandatory) {
    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, option + ' option! is mandatory');
        }
        return false;
    }
    if (typeof toCheck === 'string') {
        var found = false;
        var errorMessagePossibilities = '';
        for (var i = 0; i < possibleValueArray.length; i++) {
            if (possibleValueArray[i] === toCheck) {
                found = true;
            }
            errorMessagePossibilities += possibleValueArray[i] + ' ';
        }
        errorMessagePossibilities.trim();
        if (!found) {
            logError(errorCallback, option + ' must be one of: ' + errorMessagePossibilities);
            return false;
        }
    }
    else {
        logError(errorCallback, option + ' must be one of: ' + errorMessagePossibilities);
        return false;
    }
    return true;
}
function checkBooleanOption(option, options, errorCallback, isMandatory) {
    var toCheck = options[option];
    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, option + ' option is mandatory!');
        }
        return false;
    }
    if (typeof toCheck !== 'boolean') {
        logError(errorCallback, option + ' must be boolean!');
        return false;
    }
    return true;
}
function checkProperties(option, options, errorCallback, isMandatory) {
    var toCheck = options[option];
    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, option + ' option is mandatory!');
        }
        return false;
    }
    return true;
}
function checkKeyValueOptions(options, errorCallback, isMandatory) {
    var key = options['key'];
    var value = options['value'];
    if (key == undefined || key == null || value == undefined || value == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, 'key value options is mandatory!');
        }
        return false;
    }
    if (typeof key !== 'string' || key.length < 1 || typeof value !== 'string') {
        logError(errorCallback, 'key must be non-empty string and value be strings!');
        return false;
    }
    return true;
}
function checkFpsOption(options, errorCallback, isMandatory) {
    var fps = options['fps'];
    if (fps == undefined || fps == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, 'fps option is mandatory!');
        }
        return false;
    }
    if (typeof fps !== 'number') {
        logError(errorCallback, 'fps not set, must be a number!');
        return false;
    }
    if (fps < 1 || fps > 10) {
        logError(errorCallback, 'fps not set, must be between 1 and 10 fps!');
        return false;
    }
    return true;
}
function checkEventTrackingModeArray(options, errorCallback, isMandatory) {
    var allowedValues = [
        EventTrackingMode.FULL_TRACKING,
        EventTrackingMode.IGNORE_USER_INTERACTION,
        EventTrackingMode.IGNORE_NAVIGATION_INTERACTION,
        EventTrackingMode.IGNORE_RAGE_CLICKS,
        EventTrackingMode.NO_TRACKING,
    ];
    var eventTrackingModeArray = options['eventTrackingModes'];
    var noneFailed = true;
    if (eventTrackingModeArray == undefined || eventTrackingModeArray == null || !Array.isArray(eventTrackingModeArray)) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(errorCallback, 'eventTrackingModes array option is mandatory!');
        }
        return false;
    }
    for (var i = 0; i < eventTrackingModeArray.length; i++) {
        console.log('checkEventTrackingModeArray(): gonna check: ' + eventTrackingModeArray[i]);
        if (!checkStringArrayOption(eventTrackingModeArray[i], 'eventTrackingMode', allowedValues, errorCallback, isMandatory)) {
            noneFailed = false;
        }
    }
    return noneFailed;
}
// Utility methods
function execWithCallbacks(successCallback, errorCallback, method, args) {
    if (successCallback === void 0) { successCallback = emptyCallback; }
    if (errorCallback === void 0) { errorCallback = emptyCallback; }
    cordova.exec(successCallback, errorCallback, SMARTLOOK_PLUGIN, method, args);
}
function logError(errorCallback, message) {
    errorCallback === null || errorCallback === void 0 ? void 0 : errorCallback("".concat(new Error(message).stack));
}
