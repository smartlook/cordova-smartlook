"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRenderingModeChangedListener = exports.registerSessionUrlChangedListener = exports.registerUserUrlChangedListener = exports.setRenderingMode = exports.getStateFrameRate = exports.getRecordingStatus = exports.getRenderingMode = exports.setWebViewSensitivity = exports.restoreDefault = exports.setEventTrackingInteractionRageClickStatus = exports.setEventTrackingInteractionUserStatus = exports.getProjectKey = exports.isRecording = exports.setProjectKey = exports.eventTrackingDisableAll = exports.eventTrackingEnableAll = exports.getAdaptiveFrameRateEnabled = exports.setAdaptiveFrameRateEnabled = exports.setJobUploadEnabled = exports.getFrameRate = exports.setFrameRate = exports.setRelayProxyHost = exports.getSessionUrlWithTimestamp = exports.getSessionUrl = exports.getUserUrl = exports.openNewSession = exports.openNewUser = exports.removeUserProperty = exports.getUserProperty = exports.setUserProperty = exports.setUserEmail = exports.setUserName = exports.setUserIdentifier = exports.clearGlobalEventProperties = exports.removeGlobalEventProperty = exports.getGlobalEventProperty = exports.putGlobalEventProperty = exports.setReferrer = exports.trackNavigationExit = exports.trackNavigationEnter = exports.trackSelector = exports.trackEvent = exports.reset = exports.stop = exports.start = exports.RecordingStatus = exports.RenderingMode = exports.Command = exports.SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = exports.SMARTLOOK_FRAMEWORK_VERSION = void 0;
exports.enableLogs = exports.setRecordingMask = exports.removeRecordingStatusChangedListener = exports.removeRenderingModeChangedListener = exports.removeSessionUrlChangedListener = exports.removeUserUrlChangedListener = exports.registerRecordingStatusChangedListener = void 0;
// Plugin name
var SMARTLOOK_PLUGIN = 'SmartlookPlugin';
// Smartlook framework info
exports.SMARTLOOK_FRAMEWORK_VERSION = '-';
exports.SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = '2.0.4';
// API methods names
var Command;
(function (Command) {
    Command["START"] = "start";
    Command["STOP"] = "stop";
    Command["RESET"] = "reset";
    Command["SET_PROJECT_KEY"] = "setProjectKey";
    Command["TRACK_EVENT"] = "trackEvent";
    Command["TRACK_SELECTOR"] = "trackSelector";
    Command["TRACK_NAVIGATION_ENTER"] = "trackNavigationEnter";
    Command["TRACK_NAVIGATION_EXIT"] = "trackNavigationExit";
    Command["SET_REFERRER"] = "setReferrer";
    Command["PUT_STRING_EVENT_PROPERTY"] = "putStringEventProperty";
    Command["GET_STRING_EVENT_PROPERTY"] = "getStringEventProperty";
    Command["REMOVE_STRING_EVENT_PROPERTY"] = "removeStringEventProperty";
    Command["CLEAR_EVENT_PROPERTIES"] = "clearEventProperties";
    Command["SET_USER_IDENTIFIER"] = "setUserIdentifier";
    Command["SET_USER_NAME"] = "setUserName";
    Command["SET_USER_EMAIL"] = "setUserEmail";
    Command["SET_USER_PROPERTY"] = "setUserProperty";
    Command["GET_USER_PROPERTY"] = "getUserProperty";
    Command["REMOVE_USER_PROPERTY"] = "removeUserProperty";
    Command["OPEN_NEW_USER"] = "openNewUser";
    Command["OPEN_NEW_SESSION"] = "openNewSession";
    Command["GET_USER_URL"] = "getUserUrl";
    Command["GET_SESSION_URL"] = "getSessionUrl";
    Command["GET_SESSION_URL_WITH_TIMESTAMP"] = "getSessionUrlWithTimestamp";
    Command["SET_RELAY_PROXY_HOST"] = "setRelayProxyHost";
    Command["GET_FRAMERATE"] = "getFrameRate";
    Command["SET_FRAMERATE"] = "setFrameRate";
    Command["SET_JOB_UPLOAD_ENABLED"] = "setJobUploadEnabled";
    Command["SET_ADAPTIVE_FRAMERATE_ENABLED"] = "setAdaptiveFrameRateEnabled";
    Command["GET_ADAPTIVE_FRAMERATE_ENABLED"] = "getAdaptiveFrameRateEnabled";
    Command["EVENT_TRACKING_ENABLE_ALL"] = "eventTrackingEnableAll";
    Command["EVENT_TRACKING_DISABLE_ALL"] = "eventTrackingDisableAll";
    Command["IS_RECORDING"] = "isRecording";
    Command["GET_PROJECT_KEY"] = "getProjectKey";
    Command["SET_EVENT_TRACKING_INTERACTION_USER_STATUS"] = "setEventTrackingInteractionUserStatus";
    Command["SET_EVENT_TRACKING_INTERACTION_RAGE_CLICK_STATUS"] = "setEventTrackingInteractionRageClickStatus";
    Command["RESTORE_DEFAULT"] = "restoreDefault";
    Command["SET_WEB_VIEW_SENSITIVITY"] = "setWebViewSensitivity";
    Command["GET_RENDERING_MODE"] = "getRenderingMode";
    Command["GET_RECORDING_STATUS"] = "getRecordingStatus";
    Command["GET_STATE_FRAME_RATE"] = "getStateFrameRate";
    Command["SET_RENDERING_MODE"] = "setRenderingMode";
    Command["REGISTER_USER_URL_CHANGED_LISTENER"] = "registerUserUrlChangedListener";
    Command["REGISTER_SESSION_URL_CHANGED_LISTENER"] = "registerSessionUrlChangedListener";
    Command["REGISTER_RENDERING_MODE_CHANGED_LISTENER"] = "registerRenderingModeChangedListener";
    Command["REGISTER_RECORDING_STATUS_CHANGED_LISTENER"] = "registerRecordingStatusChangedListener";
    Command["REMOVE_USER_URL_CHANGED_LISTENER"] = "removeUserUrlChangedListener";
    Command["REMOVE_SESSION_URL_CHANGED_LISTENER"] = "removeSessionUrlChangedListener";
    Command["REMOVE_RENDERING_MODE_CHANGED_LISTENER"] = "removeRenderingModeChangedListener";
    Command["REMOVE_RECORDING_STATUS_CHANGED_LISTENER"] = "removeRecordingStatusChangedListener";
    Command["SET_RECORDING_MASK"] = "setRecordingMask";
    Command["ENABLE_LOGS"] = "enableLogs";
})(Command = exports.Command || (exports.Command = {}));
// Internal logic
var SET_PLUGIN_VERSION = 'setPluginVersion';
var emptyCallback = function () {
    return;
};
var RenderingMode;
(function (RenderingMode) {
    RenderingMode[RenderingMode["NO_RENDERING"] = 0] = "NO_RENDERING";
    RenderingMode[RenderingMode["NATIVE"] = 1] = "NATIVE";
    RenderingMode[RenderingMode["WIREFRAME"] = 2] = "WIREFRAME";
})(RenderingMode = exports.RenderingMode || (exports.RenderingMode = {}));
var RecordingStatus;
(function (RecordingStatus) {
    RecordingStatus[RecordingStatus["Recording"] = 0] = "Recording";
    RecordingStatus[RecordingStatus["NotStarted"] = 1] = "NotStarted";
    RecordingStatus[RecordingStatus["Stopped"] = 2] = "Stopped";
    RecordingStatus[RecordingStatus["BellowMinSdkVersion"] = 3] = "BellowMinSdkVersion";
    RecordingStatus[RecordingStatus["ProjectLimitReached"] = 4] = "ProjectLimitReached";
    RecordingStatus[RecordingStatus["StorageLimitReached"] = 5] = "StorageLimitReached";
    RecordingStatus[RecordingStatus["InternalError"] = 6] = "InternalError";
    RecordingStatus[RecordingStatus["NotRunningInSwiftUIContext"] = 7] = "NotRunningInSwiftUIContext";
    RecordingStatus[RecordingStatus["UnsupportedPlatform"] = 8] = "UnsupportedPlatform";
})(RecordingStatus = exports.RecordingStatus || (exports.RecordingStatus = {}));
/**
 * @description Starts the recording, even when no project key is set.
 * See the docs for more infromation.
 */
function start(successCallback, errorCallback) {
    setupAndRegisterBridgeInterface();
    execWithCallbacks(Command.START, successCallback, errorCallback);
}
exports.start = start;
/**
 * @description Stops the recording.
 */
function stop(successCallback, errorCallback) {
    execWithCallbacks(Command.STOP, successCallback, errorCallback);
}
exports.stop = stop;
/**
 * @description Resets the SDK to a default state.
 */
function reset(successCallback, errorCallback) {
    execWithCallbacks(Command.RESET, successCallback, errorCallback);
}
exports.reset = reset;
/**
 * @description Logs a new event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 */
function trackEvent(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('eventName', options, true, errorCallback)) {
        return;
    }
    args.push(options['eventName']);
    args.push(options['props']);
    execWithCallbacks(Command.TRACK_EVENT, successCallback, errorCallback, args);
}
exports.trackEvent = trackEvent;
/**
 * @description Logs a new selector event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 * @kind **iOS only**
 */
function trackSelector(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('selectorName', options, true, errorCallback)) {
        return;
    }
    args.push(options['selectorName']);
    args.push(options['props']);
    execWithCallbacks(Command.TRACK_SELECTOR, successCallback, errorCallback, args);
}
exports.trackSelector = trackSelector;
/**
 * Logs a new navigation sreen-entering event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 */
function trackNavigationEnter(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('eventName', options, true, errorCallback)) {
        return;
    }
    args.push(options['eventName']);
    args.push(options['props']);
    execWithCallbacks(Command.TRACK_NAVIGATION_ENTER, successCallback, errorCallback, args);
}
exports.trackNavigationEnter = trackNavigationEnter;
/**
 * Logs a new navigation sreen-exiting event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 */
function trackNavigationExit(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('eventName', options, true, errorCallback)) {
        return;
    }
    args.push(options['eventName']);
    args.push(options['props']);
    execWithCallbacks(Command.TRACK_NAVIGATION_EXIT, successCallback, errorCallback, args);
}
exports.trackNavigationExit = trackNavigationExit;
/**
 * Sets a new SDK referrer.
 * @param options.referrer - Application referrer name
 * @param options.source - Referrer source name
 *
 * @kind **Android only**
 */
function setReferrer(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('referrer', options, true, errorCallback) ||
        !checkStringOption('source', options, true, errorCallback)) {
        return;
    }
    args.push(options['referrer']);
    args.push(options['source']);
    execWithCallbacks(Command.SET_REFERRER, successCallback, errorCallback, args);
}
exports.setReferrer = setReferrer;
/**
 * @description Sets a user-passed global event property.
 * @param options.eventName - Global event name
 * @param options.props - optional event properties object
 */
function putGlobalEventProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback) ||
        !checkStringOption('value', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    args.push(options['value']);
    execWithCallbacks(Command.PUT_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}
exports.putGlobalEventProperty = putGlobalEventProperty;
/**
 * @description Retrieves a user-passed event property.
 * @param options.eventName - Global event name to retrieve
 */
function getGlobalEventProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.GET_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}
exports.getGlobalEventProperty = getGlobalEventProperty;
/**
 * @description Removes a user-passed event property.
 * @param options.eventName - Global event name to remove
 */
function removeGlobalEventProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.REMOVE_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}
exports.removeGlobalEventProperty = removeGlobalEventProperty;
/**
 * @description Clears all user-passed event properties.
 */
function clearGlobalEventProperties(successCallback, errorCallback) {
    execWithCallbacks(Command.CLEAR_EVENT_PROPERTIES, successCallback, errorCallback);
}
exports.clearGlobalEventProperties = clearGlobalEventProperties;
/**
 * @description Sets new identification for the recorded user.
 * @param options.identifier - User identifier
 */
function setUserIdentifier(options, successCallback, errorCallback) {
    var args = [];
    args.push(options['identifier']);
    execWithCallbacks(Command.SET_USER_IDENTIFIER, successCallback, errorCallback, args);
}
exports.setUserIdentifier = setUserIdentifier;
/**
 * @description Sets user’s full name.
 * @param options.name - User's full name
 */
function setUserName(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('name', options, true, errorCallback)) {
        return;
    }
    args.push(options['name']);
    execWithCallbacks(Command.SET_USER_NAME, successCallback, errorCallback, args);
}
exports.setUserName = setUserName;
/**
 * @description Sets user’s email address.
 * @param options.email - User's email address
 */
function setUserEmail(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('email', options, true, errorCallback)) {
        return;
    }
    args.push(options['email']);
    execWithCallbacks(Command.SET_USER_EMAIL, successCallback, errorCallback, args);
}
exports.setUserEmail = setUserEmail;
/**
 * @description Sets or adds a new value to the user properties.
 * @param options.propertyName - User property name
 * @param options.value - User property value
 */
function setUserProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback) ||
        !checkStringOption('value', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    args.push(options['value']);
    execWithCallbacks(Command.SET_USER_PROPERTY, successCallback, errorCallback, args);
}
exports.setUserProperty = setUserProperty;
/**
 * @description Retrieves a user property value with a given property name (a key).
 * @param options.propertyName - User property name
 * @param options.successCallback - Callback to be invoked with the user property value
 */
function getUserProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.GET_USER_PROPERTY, successCallback, errorCallback, args);
}
exports.getUserProperty = getUserProperty;
/**
 * @description Removes a user property given a property name (a key).
 */
function removeUserProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.REMOVE_USER_PROPERTY, successCallback, errorCallback, args);
}
exports.removeUserProperty = removeUserProperty;
/**
 * @description Initializes a new user for recording.
 */
function openNewUser(successCallback, errorCallback) {
    execWithCallbacks(Command.OPEN_NEW_USER, successCallback, errorCallback);
}
exports.openNewUser = openNewUser;
/**
 * @description Opens a new recording session.
 */
function openNewSession(successCallback, errorCallback) {
    execWithCallbacks(Command.OPEN_NEW_SESSION, successCallback, errorCallback);
}
exports.openNewSession = openNewSession;
/**
 * @description Retrieves the unique URL of the currently recorded user.
 * @param options.successCallback - Callback to be invoked with the user URL
 */
function getUserUrl(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_USER_URL, successCallback, errorCallback);
}
exports.getUserUrl = getUserUrl;
/**
 * @description Retrieves the unique URL of this recording session.
 * @param options.successCallback - Callback to be invoked with the session URL
 */
function getSessionUrl(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_SESSION_URL, successCallback, errorCallback);
}
exports.getSessionUrl = getSessionUrl;
/**
 * @description Retrieves the unique session URL with the exact location on the timeline.
 * @param options.successCallback - Callback to be invoked with the session URL
 */
function getSessionUrlWithTimestamp(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_SESSION_URL_WITH_TIMESTAMP, successCallback, errorCallback);
}
exports.getSessionUrlWithTimestamp = getSessionUrlWithTimestamp;
/**
 * @description Sets a proxy host name for data transfer.
 * @param options.relayProxyHost - Proxy host name
 *
 * @kind **Android only**
 */
function setRelayProxyHost(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('relayProxyHost', options, true, errorCallback)) {
        return;
    }
    args.push(options['relayProxyHost']);
    execWithCallbacks(Command.SET_RELAY_PROXY_HOST, successCallback, errorCallback, args);
}
exports.setRelayProxyHost = setRelayProxyHost;
/**
 * @description Sets video capturing framerate.
 * @param options.frameRate - Framerate to be set. Must be between `2` and `10` frames per second.
 */
function setFrameRate(options, successCallback, errorCallback) {
    var args = [];
    if (!checkFpsOption(options, true, errorCallback)) {
        return;
    }
    args.push(options['frameRate']);
    execWithCallbacks(Command.SET_FRAMERATE, successCallback, errorCallback, args);
}
exports.setFrameRate = setFrameRate;
/**
 * Retrieves the video capturing framerate.
 * @param options.successCallback - Callback to be invoked with the current framerate
 */
function getFrameRate(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_FRAMERATE, successCallback, errorCallback);
}
exports.getFrameRate = getFrameRate;
/**
 * @description Sets whether or not Android's `Jobs` are used for uploading.
 *
 * @kind **Android only**
 */
function setJobUploadEnabled(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_RELAY_PROXY_HOST, successCallback, errorCallback, args);
}
exports.setJobUploadEnabled = setJobUploadEnabled;
/**
 * @description Sets whether or not the SDK should use the adaptive framerate feature to capture video.
 */
function setAdaptiveFrameRateEnabled(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_ADAPTIVE_FRAMERATE_ENABLED, successCallback, errorCallback, args);
}
exports.setAdaptiveFrameRateEnabled = setAdaptiveFrameRateEnabled;
/**
 * @description A boolean that determines whether the SDK uses the adaptive framerate functionality for video capture.
 */
function getAdaptiveFrameRateEnabled(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_ADAPTIVE_FRAMERATE_ENABLED, successCallback, errorCallback);
}
exports.getAdaptiveFrameRateEnabled = getAdaptiveFrameRateEnabled;
/**
 * @description Enables the tracking of all events.
 */
function eventTrackingEnableAll(successCallback, errorCallback) {
    execWithCallbacks(Command.EVENT_TRACKING_ENABLE_ALL, successCallback, errorCallback);
}
exports.eventTrackingEnableAll = eventTrackingEnableAll;
/**
 * @description Disabled the tracking of all events.
 */
function eventTrackingDisableAll(successCallback, errorCallback) {
    execWithCallbacks(Command.EVENT_TRACKING_ENABLE_ALL, successCallback, errorCallback);
}
exports.eventTrackingDisableAll = eventTrackingDisableAll;
/**
 * @description Sets a unique project key.
 * @param options.key - Project key
 */
function setProjectKey(options, successCallback, errorCallback) {
    // TODO log how many times this happens not to bottleneck
    setupAndRegisterBridgeInterface();
    var args = [];
    if (!checkStringOption('key', options, true, errorCallback)) {
        return;
    }
    args.push(options['key']);
    execWithCallbacks(Command.SET_PROJECT_KEY, successCallback, errorCallback, args);
}
exports.setProjectKey = setProjectKey;
/**
 * @description Determines whether or not the SDK is recording.
 * @param options.successCallback - Callback to be invoked with the current value
 */
function isRecording(successCallback, errorCallback) {
    execWithCallbacks(Command.IS_RECORDING, successCallback, errorCallback);
}
exports.isRecording = isRecording;
/**
 * @description Retrieves a string containing the current project key.
 * @param options.successCallback - Callback to be invoked with the current project key
 */
function getProjectKey(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_PROJECT_KEY, successCallback, errorCallback);
}
exports.getProjectKey = getProjectKey;
/**
 * @description Enables the tracking of all user's interaction events.
 *
 * @kind **Android only**
 * @param options.isEnabled - A boolean that determines whether or not the tracking of all user's interaction events is enabled.
 */
function setEventTrackingInteractionUserStatus(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_EVENT_TRACKING_INTERACTION_USER_STATUS, successCallback, errorCallback, args);
}
exports.setEventTrackingInteractionUserStatus = setEventTrackingInteractionUserStatus;
/**
 * @description Sets whether or not "rage" clicks are automatically tracked.
 * @param options.isEnabled - A boolean that determines whether or not "rage" clicks are automatically tracked.
 */
function setEventTrackingInteractionRageClickStatus(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_EVENT_TRACKING_INTERACTION_RAGE_CLICK_STATUS, successCallback, errorCallback, args);
}
exports.setEventTrackingInteractionRageClickStatus = setEventTrackingInteractionRageClickStatus;
/**
 * @description Sets tracking properties to default values.
 */
function restoreDefault(successCallback, errorCallback) {
    execWithCallbacks(Command.RESTORE_DEFAULT, successCallback, errorCallback);
}
exports.restoreDefault = restoreDefault;
/**
 * @description Sets whether or not a WebView class should be considered sensitive.
 * @default True by default in the SDK.
 * @param options.isSensitive - A boolean that determines whether or not the WebView class should be considered sensitive.
 */
function setWebViewSensitivity(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isSensitive', options, true, errorCallback)) {
        return;
    }
    args.push(options['isSensitive']);
    execWithCallbacks(Command.SET_WEB_VIEW_SENSITIVITY, successCallback, errorCallback, args);
}
exports.setWebViewSensitivity = setWebViewSensitivity;
/**
 * @description Retrieves the current SDK's rendering mode.
 * @param options.successCallback - Callback to be invoked with the current rendering mode
 */
function getRenderingMode(successCallback, errorCallback) {
    var renderingModeCallback = function (renderingMode) {
        var renderingModeTyped = renderingModeFromNumber(renderingMode);
        successCallback(renderingModeTyped);
    };
    execWithCallbacks(Command.GET_RENDERING_MODE, renderingModeCallback, errorCallback);
}
exports.getRenderingMode = getRenderingMode;
/**
 * @description Retrieves the current recording status. The default SDK value is `NotStarted`.
 * @param options.successCallback - Callback to be invoked with the current recording status
 */
function getRecordingStatus(successCallback, errorCallback) {
    var recordingStatusCallback = function (recordingStatus) {
        var renderingModeTyped = recordingStatusFromNumber(recordingStatus);
        successCallback(renderingModeTyped);
    };
    execWithCallbacks(Command.GET_RECORDING_STATUS, recordingStatusCallback, errorCallback);
}
exports.getRecordingStatus = getRecordingStatus;
/**
 * @description Retrieves a number representing the current framerate.
 * @param options.successCallback - Callback to be invoked with the current framerate
 */
function getStateFrameRate(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_STATE_FRAME_RATE, successCallback, errorCallback);
}
exports.getStateFrameRate = getStateFrameRate;
/**
 * @description Sets SDK's video rendering mode for captured data.
 * @param options.renderingMode - Rendering mode to be set. @see RenderingMode
 */
function setRenderingMode(options, successCallback, errorCallback) {
    var args = [];
    if (!(options['renderingMode'] in RenderingMode)) {
        logError("Invalid rendering mode ".concat(options['renderingMode'], " set!"), errorCallback);
        return;
    }
    args.push(options['renderingMode']);
    execWithCallbacks(Command.SET_RENDERING_MODE, successCallback, errorCallback, args);
}
exports.setRenderingMode = setRenderingMode;
/**
 * @description Registers a listener that gets triggered when the User URL changes.
 *
 * @param options.userUrlChangedCallback - Callback to be invoked when the User URL changes
 */
function registerUserUrlChangedListener(options, successCallback, errorCallback) {
    var integrationCallback = function (url) {
        var userUrlChangedCallback = options['userUrlChangedCallback'];
        if (url != undefined && url.length > 0) {
            userUrlChangedCallback(url);
        }
    };
    execWithCallbacks(Command.REGISTER_USER_URL_CHANGED_LISTENER, integrationCallback, errorCallback);
    successCallback === null || successCallback === void 0 ? void 0 : successCallback('');
}
exports.registerUserUrlChangedListener = registerUserUrlChangedListener;
/**
 * @description Registers a listener that gets triggered when the Session URL changes.
 *
 * @param options.sessionUrlChangedCallback - Callback to be invoked when the Session URL changes
 */
function registerSessionUrlChangedListener(options, successCallback, errorCallback) {
    var integrationCallback = function (url) {
        var sessionUrlChangedCallback = options['sessionUrlChangedCallback'];
        if (url != undefined && url.length > 0) {
            sessionUrlChangedCallback(url);
        }
    };
    execWithCallbacks(Command.REGISTER_SESSION_URL_CHANGED_LISTENER, integrationCallback, errorCallback);
    successCallback === null || successCallback === void 0 ? void 0 : successCallback('');
}
exports.registerSessionUrlChangedListener = registerSessionUrlChangedListener;
/**
 * @description Registers a listener that gets triggered when the native SDK's Rendering mode changes.
 *
 * @param options.renderingModeChangedCallback - Callback to be invoked when the native SDK's Rendering mode changes
 * @kind **iOS only**
 */
function registerRenderingModeChangedListener(options, successCallback, errorCallback) {
    var integrationCallback = function (renderingMode) {
        var renderingModeChangedCallback = options['renderingModeChangedCallback'];
        if (renderingMode != undefined) {
            renderingModeChangedCallback(renderingModeFromNumber(renderingMode));
        }
    };
    execWithCallbacks(Command.REGISTER_RENDERING_MODE_CHANGED_LISTENER, integrationCallback, errorCallback);
    successCallback === null || successCallback === void 0 ? void 0 : successCallback('');
}
exports.registerRenderingModeChangedListener = registerRenderingModeChangedListener;
/**
 * @description Registers a listener that gets triggered when the native SDK's Recording status changes.
 *
 * @param options.recordingStatusChangedCallback - Callback to be invoked when the native SDK's Recording status changes
 * @kind **iOS only**
 */
function registerRecordingStatusChangedListener(options, successCallback, errorCallback) {
    var integrationCallback = function (recordingStatus) {
        var renderingModeChangedCallback = options['recordingStatusChangedCallback'];
        if (recordingStatus != undefined) {
            renderingModeChangedCallback(recordingStatusFromNumber(recordingStatus));
        }
    };
    execWithCallbacks(Command.REGISTER_RECORDING_STATUS_CHANGED_LISTENER, integrationCallback, errorCallback);
    successCallback === null || successCallback === void 0 ? void 0 : successCallback('');
}
exports.registerRecordingStatusChangedListener = registerRecordingStatusChangedListener;
/**
 * @description Removes the user URL change listener.
 */
function removeUserUrlChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_USER_URL_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeUserUrlChangedListener = removeUserUrlChangedListener;
/**
 * @description Removes the session URL change listener.
 */
function removeSessionUrlChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_SESSION_URL_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeSessionUrlChangedListener = removeSessionUrlChangedListener;
/**
 * @description Removes the rendering mode change listener.
 */
function removeRenderingModeChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_RENDERING_MODE_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeRenderingModeChangedListener = removeRenderingModeChangedListener;
/**
 * @description Removes the recording status change listener.
 */
function removeRecordingStatusChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_RECORDING_STATUS_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeRecordingStatusChangedListener = removeRecordingStatusChangedListener;
/**
 * @description Creates a new @see RecordingMask .
 *
 * @param options.recordingMaskList - an array of recording mask elements containing their bounding rectangles and mask types.
 * @see RecordingMaskRect , @see RecordingMaskType
 */
function setRecordingMask(options, successCallback, errorCallback) {
    var args = options['recordingMaskList'];
    if (args === undefined || args === null) {
        logError('Recording mask list cannot be null or undefined!', errorCallback);
    }
    execWithCallbacks(Command.SET_RECORDING_MASK, successCallback, errorCallback, args);
}
exports.setRecordingMask = setRecordingMask;
/**
 * @description Enables advanced SDK logging capabilities.
 *
 * @kind **Android only**
 */
function enableLogs(successCallback, errorCallback) {
    execWithCallbacks(Command.ENABLE_LOGS, successCallback, errorCallback);
}
exports.enableLogs = enableLogs;
// Internal setup logic
function setupAndRegisterBridgeInterface() {
    var args = [];
    args.push(exports.SMARTLOOK_FRAMEWORK_PLUGIN_VERSION);
    args.push(exports.SMARTLOOK_FRAMEWORK_VERSION);
    execWithCallbacks(SET_PLUGIN_VERSION, emptyCallback, emptyCallback, args);
}
function execWithCallbacks(method, successCallback, errorCallback, args) {
    if (successCallback === void 0) { successCallback = emptyCallback; }
    if (errorCallback === void 0) { errorCallback = emptyCallback; }
    window.cordova.exec(successCallback, errorCallback, SMARTLOOK_PLUGIN, method, args);
}
function logError(message, errorCallback) {
    errorCallback === null || errorCallback === void 0 ? void 0 : errorCallback("".concat(new Error(message).message));
}
function checkStringOption(option, options, isMandatory, errorCallback) {
    var toCheck = options[option];
    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(option + ' option is mandatory!', errorCallback);
        }
        return false;
    }
    if (typeof toCheck !== 'string' || toCheck.length < 1) {
        logError(option + ' must be non-empty string!', errorCallback);
        return false;
    }
    return true;
}
function checkBooleanOption(option, options, isMandatory, errorCallback) {
    var toCheck = options[option];
    if (toCheck == undefined || toCheck == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError(option + ' option is mandatory!', errorCallback);
        }
        return false;
    }
    if (typeof toCheck !== 'boolean') {
        logError(option + ' must be boolean!', errorCallback);
        return false;
    }
    return true;
}
function checkFpsOption(options, isMandatory, errorCallback) {
    var fps = options['frameRate'];
    if (fps == undefined || fps == null) {
        if (isMandatory != undefined && isMandatory === true) {
            logError('fps option is mandatory!', errorCallback);
        }
        return false;
    }
    if (typeof fps !== 'number') {
        logError('fps not set, must be a number!', errorCallback);
        return false;
    }
    if (fps < 1 || fps > 10) {
        logError('fps not set, must be between 1 and 10 fps!', errorCallback);
        return false;
    }
    return true;
}
function renderingModeFromNumber(renderingMode) {
    switch (renderingMode) {
        case 0:
            return RenderingMode.NO_RENDERING;
        case 1:
            return RenderingMode.NATIVE;
        case 2:
            return RenderingMode.WIREFRAME;
        default:
            return RenderingMode.NATIVE;
    }
}
function recordingStatusFromNumber(recordingStatus) {
    switch (recordingStatus) {
        case 0:
            return RecordingStatus.Recording;
        case 1:
            return RecordingStatus.NotStarted;
        case 2:
            return RecordingStatus.Stopped;
        case 3:
            return RecordingStatus.BellowMinSdkVersion;
        case 4:
            return RecordingStatus.ProjectLimitReached;
        case 5:
            return RecordingStatus.StorageLimitReached;
        case 6:
            return RecordingStatus.InternalError;
        case 7:
            return RecordingStatus.NotRunningInSwiftUIContext;
        case 8:
            return RecordingStatus.UnsupportedPlatform;
        default:
            return RecordingStatus.NotStarted;
    }
}
