"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserUrlChangedListener = exports.setRenderingMode = exports.getStateFrameRate = exports.getRecordingStatus = exports.getRenderingMode = exports.setWebViewSensitivity = exports.restoreDefault = exports.setEventTrackingInteractionRageClickStatus = exports.setEventTrackingInteractionUserStatus = exports.getProjectKey = exports.isRecording = exports.setProjectKey = exports.eventTrackingDisableAll = exports.eventTrackingEnableAll = exports.getSurfaceCaptureEnabled = exports.setSurfaceCaptureEnabled = exports.getAdaptiveFrameRateEnabled = exports.setAdaptiveFrameRateEnabled = exports.setJobUploadEnabled = exports.getFrameRate = exports.setFrameRate = exports.setRelayProxyHost = exports.getSessionUrlWithTimestamp = exports.getSessionUrl = exports.getUserUrl = exports.openNewSession = exports.openNewUser = exports.removeUserProperty = exports.getUserProperty = exports.setUserProperty = exports.setUserEmail = exports.setUserName = exports.setUserIdentifier = exports.clearGlobalEventProperties = exports.removeGlobalEventProperty = exports.getGlobalEventProperty = exports.putGlobalEventProperty = exports.setReferrer = exports.trackNavigationExit = exports.trackNavigationEnter = exports.trackSelector = exports.trackEvent = exports.reset = exports.stop = exports.start = exports.RecordingStatus = exports.RenderingMode = exports.Command = exports.SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = exports.SMARTLOOK_FRAMEWORK_VERSION = void 0;
exports.enableLogs = exports.setRecordingMask = exports.removeRecordingStatusChangedListener = exports.removeRenderingModeChangedListener = exports.removeSessionUrlChangedListener = exports.removeUserUrlChangedListener = exports.registerRecordingStatusChangedListener = exports.registerRenderingModeChangedListener = exports.registerSessionUrlChangedListener = void 0;
// Plugin name
var SMARTLOOK_PLUGIN = 'SmartlookPlugin';
// Smartlook framework info
exports.SMARTLOOK_FRAMEWORK_VERSION = '-';
exports.SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = '1.9.5';
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
    Command["SET_SURFACE_CAPTURE_ENABLED"] = "setSurfaceCaptureEnabled";
    Command["GET_SURFACE_CAPTURE_ENABLED"] = "getSurfaceCaptureEnabled";
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
// Internal setup logic
function setupAndRegisterBridgeInterface() {
    var args = [];
    args.push(exports.SMARTLOOK_FRAMEWORK_PLUGIN_VERSION);
    args.push(exports.SMARTLOOK_FRAMEWORK_VERSION);
    execWithCallbacks(SET_PLUGIN_VERSION, emptyCallback, emptyCallback, args);
}
function start(successCallback, errorCallback) {
    setupAndRegisterBridgeInterface();
    execWithCallbacks(Command.START, successCallback, errorCallback);
}
exports.start = start;
function stop(successCallback, errorCallback) {
    execWithCallbacks(Command.STOP, successCallback, errorCallback);
}
exports.stop = stop;
function reset(successCallback, errorCallback) {
    execWithCallbacks(Command.RESET, successCallback, errorCallback);
}
exports.reset = reset;
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
function getGlobalEventProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.GET_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}
exports.getGlobalEventProperty = getGlobalEventProperty;
function removeGlobalEventProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.REMOVE_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}
exports.removeGlobalEventProperty = removeGlobalEventProperty;
function clearGlobalEventProperties(successCallback, errorCallback) {
    execWithCallbacks(Command.CLEAR_EVENT_PROPERTIES, successCallback, errorCallback);
}
exports.clearGlobalEventProperties = clearGlobalEventProperties;
function setUserIdentifier(options, successCallback, errorCallback) {
    var args = [];
    args.push(options['identifier']);
    execWithCallbacks(Command.SET_USER_IDENTIFIER, successCallback, errorCallback, args);
}
exports.setUserIdentifier = setUserIdentifier;
function setUserName(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('name', options, true, errorCallback)) {
        return;
    }
    args.push(options['name']);
    execWithCallbacks(Command.SET_USER_NAME, successCallback, errorCallback, args);
}
exports.setUserName = setUserName;
function setUserEmail(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('email', options, true, errorCallback)) {
        return;
    }
    args.push(options['email']);
    execWithCallbacks(Command.SET_USER_EMAIL, successCallback, errorCallback, args);
}
exports.setUserEmail = setUserEmail;
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
function getUserProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.GET_USER_PROPERTY, successCallback, errorCallback, args);
}
exports.getUserProperty = getUserProperty;
function removeUserProperty(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('propertyName', options, true, errorCallback)) {
        return;
    }
    args.push(options['propertyName']);
    execWithCallbacks(Command.REMOVE_USER_PROPERTY, successCallback, errorCallback, args);
}
exports.removeUserProperty = removeUserProperty;
function openNewUser(successCallback, errorCallback) {
    execWithCallbacks(Command.OPEN_NEW_USER, successCallback, errorCallback);
}
exports.openNewUser = openNewUser;
function openNewSession(successCallback, errorCallback) {
    execWithCallbacks(Command.OPEN_NEW_SESSION, successCallback, errorCallback);
}
exports.openNewSession = openNewSession;
function getUserUrl(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_USER_URL, successCallback, errorCallback);
}
exports.getUserUrl = getUserUrl;
function getSessionUrl(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_SESSION_URL, successCallback, errorCallback);
}
exports.getSessionUrl = getSessionUrl;
function getSessionUrlWithTimestamp(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_SESSION_URL_WITH_TIMESTAMP, successCallback, errorCallback);
}
exports.getSessionUrlWithTimestamp = getSessionUrlWithTimestamp;
function setRelayProxyHost(options, successCallback, errorCallback) {
    var args = [];
    if (!checkStringOption('relayProxyHost', options, true, errorCallback)) {
        return;
    }
    args.push(options['relayProxyHost']);
    execWithCallbacks(Command.SET_RELAY_PROXY_HOST, successCallback, errorCallback, args);
}
exports.setRelayProxyHost = setRelayProxyHost;
function setFrameRate(options, successCallback, errorCallback) {
    var args = [];
    if (!checkFpsOption(options, true, errorCallback)) {
        return;
    }
    args.push(options['frameRate']);
    execWithCallbacks(Command.SET_FRAMERATE, successCallback, errorCallback, args);
}
exports.setFrameRate = setFrameRate;
function getFrameRate(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_FRAMERATE, successCallback, errorCallback);
}
exports.getFrameRate = getFrameRate;
function setJobUploadEnabled(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_RELAY_PROXY_HOST, successCallback, errorCallback, args);
}
exports.setJobUploadEnabled = setJobUploadEnabled;
function setAdaptiveFrameRateEnabled(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_ADAPTIVE_FRAMERATE_ENABLED, successCallback, errorCallback, args);
}
exports.setAdaptiveFrameRateEnabled = setAdaptiveFrameRateEnabled;
function getAdaptiveFrameRateEnabled(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_ADAPTIVE_FRAMERATE_ENABLED, successCallback, errorCallback);
}
exports.getAdaptiveFrameRateEnabled = getAdaptiveFrameRateEnabled;
function setSurfaceCaptureEnabled(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_SURFACE_CAPTURE_ENABLED, successCallback, errorCallback, args);
}
exports.setSurfaceCaptureEnabled = setSurfaceCaptureEnabled;
function getSurfaceCaptureEnabled(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_SURFACE_CAPTURE_ENABLED, successCallback, errorCallback);
}
exports.getSurfaceCaptureEnabled = getSurfaceCaptureEnabled;
function eventTrackingEnableAll(successCallback, errorCallback) {
    execWithCallbacks(Command.EVENT_TRACKING_ENABLE_ALL, successCallback, errorCallback);
}
exports.eventTrackingEnableAll = eventTrackingEnableAll;
function eventTrackingDisableAll(successCallback, errorCallback) {
    execWithCallbacks(Command.EVENT_TRACKING_ENABLE_ALL, successCallback, errorCallback);
}
exports.eventTrackingDisableAll = eventTrackingDisableAll;
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
function isRecording(successCallback, errorCallback) {
    execWithCallbacks(Command.IS_RECORDING, successCallback, errorCallback);
}
exports.isRecording = isRecording;
function getProjectKey(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_PROJECT_KEY, successCallback, errorCallback);
}
exports.getProjectKey = getProjectKey;
function setEventTrackingInteractionUserStatus(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_EVENT_TRACKING_INTERACTION_USER_STATUS, successCallback, errorCallback, args);
}
exports.setEventTrackingInteractionUserStatus = setEventTrackingInteractionUserStatus;
function setEventTrackingInteractionRageClickStatus(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
        return;
    }
    args.push(options['isEnabled']);
    execWithCallbacks(Command.SET_EVENT_TRACKING_INTERACTION_RAGE_CLICK_STATUS, successCallback, errorCallback, args);
}
exports.setEventTrackingInteractionRageClickStatus = setEventTrackingInteractionRageClickStatus;
function restoreDefault(successCallback, errorCallback) {
    execWithCallbacks(Command.RESTORE_DEFAULT, successCallback, errorCallback);
}
exports.restoreDefault = restoreDefault;
function setWebViewSensitivity(options, successCallback, errorCallback) {
    var args = [];
    if (!checkBooleanOption('isSensitive', options, true, errorCallback)) {
        return;
    }
    args.push(options['isSensitive']);
    execWithCallbacks(Command.SET_WEB_VIEW_SENSITIVITY, successCallback, errorCallback, args);
}
exports.setWebViewSensitivity = setWebViewSensitivity;
function getRenderingMode(successCallback, errorCallback) {
    var renderingModeCallback = function (renderingMode) {
        var renderingModeTyped = renderingModeFromNumber(renderingMode);
        successCallback(renderingModeTyped);
    };
    execWithCallbacks(Command.GET_RENDERING_MODE, renderingModeCallback, errorCallback);
}
exports.getRenderingMode = getRenderingMode;
function getRecordingStatus(successCallback, errorCallback) {
    var recordingStatusCallback = function (recordingStatus) {
        var renderingModeTyped = recordingStatusFromNumber(recordingStatus);
        successCallback(renderingModeTyped);
    };
    execWithCallbacks(Command.GET_RECORDING_STATUS, recordingStatusCallback, errorCallback);
}
exports.getRecordingStatus = getRecordingStatus;
function getStateFrameRate(successCallback, errorCallback) {
    execWithCallbacks(Command.GET_STATE_FRAME_RATE, successCallback, errorCallback);
}
exports.getStateFrameRate = getStateFrameRate;
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
function removeUserUrlChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_USER_URL_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeUserUrlChangedListener = removeUserUrlChangedListener;
function removeSessionUrlChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_SESSION_URL_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeSessionUrlChangedListener = removeSessionUrlChangedListener;
function removeRenderingModeChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_RENDERING_MODE_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeRenderingModeChangedListener = removeRenderingModeChangedListener;
function removeRecordingStatusChangedListener(successCallback, errorCallback) {
    execWithCallbacks(Command.REMOVE_RECORDING_STATUS_CHANGED_LISTENER, successCallback, errorCallback);
}
exports.removeRecordingStatusChangedListener = removeRecordingStatusChangedListener;
function setRecordingMask(options, successCallback, errorCallback) {
    var args = options['recordingMaskList'];
    if (args === undefined || args === null) {
        logError('Recording mask list cannot be null or undefined!', errorCallback);
    }
    execWithCallbacks(Command.SET_RECORDING_MASK, successCallback, errorCallback, args);
}
exports.setRecordingMask = setRecordingMask;
function enableLogs(successCallback, errorCallback) {
    execWithCallbacks(Command.ENABLE_LOGS, successCallback, errorCallback);
}
exports.enableLogs = enableLogs;
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
