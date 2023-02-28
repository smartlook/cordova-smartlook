export declare const SMARTLOOK_FRAMEWORK_VERSION = "-";
export declare const SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = "1.9.5";
export declare enum Command {
    START = "start",
    STOP = "stop",
    RESET = "reset",
    SET_PROJECT_KEY = "setProjectKey",
    TRACK_EVENT = "trackEvent",
    TRACK_SELECTOR = "trackSelector",
    TRACK_NAVIGATION_ENTER = "trackNavigationEnter",
    TRACK_NAVIGATION_EXIT = "trackNavigationExit",
    SET_REFERRER = "setReferrer",
    PUT_STRING_EVENT_PROPERTY = "putStringEventProperty",
    GET_STRING_EVENT_PROPERTY = "getStringEventProperty",
    REMOVE_STRING_EVENT_PROPERTY = "removeStringEventProperty",
    CLEAR_EVENT_PROPERTIES = "clearEventProperties",
    SET_USER_IDENTIFIER = "setUserIdentifier",
    SET_USER_NAME = "setUserName",
    SET_USER_EMAIL = "setUserEmail",
    SET_USER_PROPERTY = "setUserProperty",
    GET_USER_PROPERTY = "getUserProperty",
    REMOVE_USER_PROPERTY = "removeUserProperty",
    OPEN_NEW_USER = "openNewUser",
    OPEN_NEW_SESSION = "openNewSession",
    GET_USER_URL = "getUserUrl",
    GET_SESSION_URL = "getSessionUrl",
    GET_SESSION_URL_WITH_TIMESTAMP = "getSessionUrlWithTimestamp",
    SET_RELAY_PROXY_HOST = "setRelayProxyHost",
    GET_FRAMERATE = "getFrameRate",
    SET_FRAMERATE = "setFrameRate",
    SET_JOB_UPLOAD_ENABLED = "setJobUploadEnabled",
    SET_ADAPTIVE_FRAMERATE_ENABLED = "setAdaptiveFrameRateEnabled",
    GET_ADAPTIVE_FRAMERATE_ENABLED = "getAdaptiveFrameRateEnabled",
    SET_SURFACE_CAPTURE_ENABLED = "setSurfaceCaptureEnabled",
    GET_SURFACE_CAPTURE_ENABLED = "getSurfaceCaptureEnabled",
    EVENT_TRACKING_ENABLE_ALL = "eventTrackingEnableAll",
    EVENT_TRACKING_DISABLE_ALL = "eventTrackingDisableAll",
    IS_RECORDING = "isRecording",
    GET_PROJECT_KEY = "getProjectKey",
    SET_EVENT_TRACKING_INTERACTION_USER_STATUS = "setEventTrackingInteractionUserStatus",
    SET_EVENT_TRACKING_INTERACTION_RAGE_CLICK_STATUS = "setEventTrackingInteractionRageClickStatus",
    RESTORE_DEFAULT = "restoreDefault",
    SET_WEB_VIEW_SENSITIVITY = "setWebViewSensitivity",
    GET_RENDERING_MODE = "getRenderingMode",
    GET_RECORDING_STATUS = "getRecordingStatus",
    GET_STATE_FRAME_RATE = "getStateFrameRate",
    SET_RENDERING_MODE = "setRenderingMode",
    REGISTER_USER_URL_CHANGED_LISTENER = "registerUserUrlChangedListener",
    REGISTER_SESSION_URL_CHANGED_LISTENER = "registerSessionUrlChangedListener",
    REGISTER_RENDERING_MODE_CHANGED_LISTENER = "registerRenderingModeChangedListener",
    REGISTER_RECORDING_STATUS_CHANGED_LISTENER = "registerRecordingStatusChangedListener",
    REMOVE_USER_URL_CHANGED_LISTENER = "removeUserUrlChangedListener",
    REMOVE_SESSION_URL_CHANGED_LISTENER = "removeSessionUrlChangedListener",
    REMOVE_RENDERING_MODE_CHANGED_LISTENER = "removeRenderingModeChangedListener",
    REMOVE_RECORDING_STATUS_CHANGED_LISTENER = "removeRecordingStatusChangedListener",
    SET_RECORDING_MASK = "setRecordingMask",
    ENABLE_LOGS = "enableLogs"
}
export type SuccessCallback<TValue> = (value: TValue) => void;
export type ErrorCallback = (message: string) => void;
export type RecordingMaskType = 'COVERING' | 'ERASING';
export type RecordingMaskRect = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export interface RecordingMask {
    maskType: RecordingMaskType;
    maskRect: RecordingMaskRect;
}
export type RecordingMaskList = RecordingMask[];
export declare enum RenderingMode {
    NO_RENDERING = 0,
    NATIVE = 1,
    WIREFRAME = 2
}
export declare enum RecordingStatus {
    Recording = 0,
    NotStarted = 1,
    Stopped = 2,
    BellowMinSdkVersion = 3,
    ProjectLimitReached = 4,
    StorageLimitReached = 5,
    InternalError = 6,
    NotRunningInSwiftUIContext = 7,
    UnsupportedPlatform = 8
}
export type NativeListenerCallbackShape = (url: string | RenderingMode | RecordingStatus) => void;
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
export interface Smartlook {
    start(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    stop(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    reset(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    trackEvent(options: {
        eventName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    trackSelector(options: {
        selectorName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    trackNavigationEnter(options: {
        eventName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    trackNavigationExit(options: {
        eventName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setReferrer(options: {
        referrer: string;
        source: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    putGlobalEventProperty(options: {
        propertyName: string;
        value: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getGlobalEventProperty(options: {
        propertyName: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    removeGlobalEventProperty(options: {
        propertyName: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    clearGlobalEventProperties(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setUserIdentifier(options: {
        identifier: string;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    setUserName(options: {
        name: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setUserEmail(options: {
        email: string;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    setUserProperty(options: {
        propertyName: string;
        value: string;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    getUserProperty(options: {
        propertyName: string;
    }, successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    removeUserProperty(options: {
        propertyName: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    openNewUser(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    openNewSession(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getUserUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getSessionUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getSessionUrlWithTimestamp(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setRelayProxyHost(options: {
        relaxyProxyHost: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setFrameRate(options: {
        frameRate: number;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
    setJobUploadEnabled(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setAdaptiveFrameRateEnabled(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getAdaptiveFrameRateEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    setSurfaceCaptureEnabled(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getSurfaceCaptureEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    eventTrackingEnableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    eventTrackingDisableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setProjectKey(options: {
        key: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    isRecording(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    getProjectKey(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setEventTrackingInteractionUserStatus(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setEventTrackingInteractionRageClickStatus(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    restoreDefault(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    setWebViewSensitivity(options: {
        isSensitive: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    getRenderingMode(successCallback: SuccessCallback<RenderingMode>, errorCallback?: ErrorCallback): void;
    getRecordingStatus(successCallback: SuccessCallback<RecordingStatus>, errorCallback?: ErrorCallback): void;
    getStateFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
    setRenderingMode(options: {
        renderingMode: RenderingMode;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    registerUserUrlChangedListener(options: {
        userUrlChangedCallback: (userUrl: string) => void;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    registerSessionUrlChangedListener(options: {
        sessionUrlChangedCallback: (sessionUrl: string) => void;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    registerRenderingModeChangedListener(options: {
        renderingModeChangedCallback: (renderingMode: RenderingMode) => void;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    registerRecordingStatusChangedListener(options: {
        recordingStatusChangedCallback: (recordingStatus: RecordingStatus) => void;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    removeUserUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    removeSessionUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    removeRenderingModeChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    removeRecordingStatusChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    setRecordingMask(options: {
        recordingMaskList: Array<{
            maskType: RecordingMaskType;
            maskRect: {
                left: number;
                top: number;
                width: number;
                height: number;
            };
        }>;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    enableLogs(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
}
export declare function start(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function stop(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function reset(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function trackEvent(options: {
    eventName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function trackSelector(options: {
    selectorName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function trackNavigationEnter(options: {
    eventName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function trackNavigationExit(options: {
    eventName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setReferrer(options: {
    referrer: string;
    source: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function putGlobalEventProperty(options: {
    propertyName: string;
    value: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getGlobalEventProperty(options: {
    propertyName: string;
}, successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function removeGlobalEventProperty(options: {
    propertyName: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function clearGlobalEventProperties(successCallback: SuccessCallback<boolean>, errorCallback: ErrorCallback): void;
export declare function setUserIdentifier(options: {
    identifier: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function setUserName(options: {
    name: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function setUserEmail(options: {
    email: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function setUserProperty(options: {
    propertyName: string;
    value: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function getUserProperty(options: {
    propertyName: string;
}, successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function removeUserProperty(options: {
    propertyName: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function openNewUser(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function openNewSession(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getUserUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getSessionUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getSessionUrlWithTimestamp(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setRelayProxyHost(options: {
    relayProxyHost: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setFrameRate(options: {
    frameRate: number;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
export declare function setJobUploadEnabled(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setAdaptiveFrameRateEnabled(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getAdaptiveFrameRateEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function setSurfaceCaptureEnabled(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getSurfaceCaptureEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function eventTrackingEnableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function eventTrackingDisableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setProjectKey(options: {
    key: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function isRecording(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function getProjectKey(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setEventTrackingInteractionUserStatus(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setEventTrackingInteractionRageClickStatus(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function restoreDefault(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function setWebViewSensitivity(options: {
    isSensitive: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function getRenderingMode(successCallback: SuccessCallback<RenderingMode>, errorCallback?: ErrorCallback): void;
export declare function getRecordingStatus(successCallback: SuccessCallback<RecordingStatus>, errorCallback?: ErrorCallback): void;
export declare function getStateFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
export declare function setRenderingMode(options: {
    renderingMode: RenderingMode;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function registerUserUrlChangedListener(options: {
    userUrlChangedCallback: (userUrl: string) => void;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function registerSessionUrlChangedListener(options: {
    sessionUrlChangedCallback: (sessionUrl: string) => void;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function registerRenderingModeChangedListener(options: {
    renderingModeChangedCallback: (renderingMode: RenderingMode) => void;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function registerRecordingStatusChangedListener(options: {
    recordingStatusChangedCallback: NativeListenerCallbackShape;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
export declare function removeUserUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function removeSessionUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function removeRenderingModeChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function removeRecordingStatusChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function setRecordingMask(options: {
    recordingMaskList: RecordingMaskList;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
export declare function enableLogs(successCallback: SuccessCallback<boolean>, errorCallback: ErrorCallback): void;
