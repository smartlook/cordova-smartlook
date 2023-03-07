export declare const SMARTLOOK_FRAMEWORK_VERSION = "-";
export declare const SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = "2.0.0";
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
/**
 * @description Creates an overlay that masks a specified screen part to protect it from unwanted recording.
 * @param maskType - Represents the type of a mask element.
 * @param maskRect - Defines an area of the recording mask.
 */
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
    /**
     * @description Starts the recording, even when no project key is set.
     * See the docs for more infromation.
     */
    start(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Stops the recording.
     */
    stop(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Resets the SDK to a default state.
     */
    reset(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Logs a new event in the application.
     * @param options.eventName - Application event name
     * @param options.props - optional event properties object
     */
    trackEvent(options: {
        eventName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Logs a new selector event in the application.
     * @param options.eventName - Application event name
     * @param options.props - optional event properties object
     * @kind **iOS only**
     */
    trackSelector(options: {
        selectorName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * Logs a new navigation sreen-entering event in the application.
     * @param options.eventName - Application event name
     * @param options.props - optional event properties object
     */
    trackNavigationEnter(options: {
        eventName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * Logs a new navigation sreen-exiting event in the application.
     * @param options.eventName - Application event name
     * @param options.props - optional event properties object
     */
    trackNavigationExit(options: {
        eventName: string;
        props?: Record<string, string>;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * Sets a new SDK referrer.
     * @param options.referrer - Application referrer name
     * @param options.source - Referrer source name
     *
     * @kind **Android only**
     */
    setReferrer(options: {
        referrer: string;
        source: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets a user-passed global event property.
     * @param options.eventName - Global event name
     * @param options.props - optional event properties object
     */
    putGlobalEventProperty(options: {
        propertyName: string;
        value: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves a user-passed event property.
     * @param options.eventName - Global event name to retrieve
     */
    getGlobalEventProperty(options: {
        propertyName: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Removes a user-passed event property.
     * @param options.eventName - Global event name to remove
     */
    removeGlobalEventProperty(options: {
        propertyName: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Clears all user-passed event properties.
     */
    clearGlobalEventProperties(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets new identification for the recorded user.
     * @param options.identifier - User identifier
     */
    setUserIdentifier(options: {
        identifier: string;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets user’s full name.
     * @param options.name - User's full name
     */
    setUserName(options: {
        name: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets user’s email address.
     * @param options.email - User's email address
     */
    setUserEmail(options: {
        email: string;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets or adds a new value to the user properties.
     * @param options.propertyName - User property name
     * @param options.value - User property value
     */
    setUserProperty(options: {
        propertyName: string;
        value: string;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves a user property value with a given property name (a key).
     * @param options.propertyName - User property name
     * @param options.successCallback - Callback to be invoked with the user property value
     */
    getUserProperty(options: {
        propertyName: string;
    }, successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Removes a user property given a property name (a key).
     */
    removeUserProperty(options: {
        propertyName: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Initializes a new user for recording.
     */
    openNewUser(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Opens a new recording session.
     */
    openNewSession(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves the unique URL of the currently recorded user.
     * @param options.successCallback - Callback to be invoked with the user URL
     */
    getUserUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves the unique URL of this recording session.
     * @param options.successCallback - Callback to be invoked with the session URL
     */
    getSessionUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves the unique session URL with the exact location on the timeline.
     * @param options.successCallback - Callback to be invoked with the session URL
     */
    getSessionUrlWithTimestamp(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets a proxy host name for data transfer.
     * @param options.relayProxyHost - Proxy host name
     *
     * @kind **Android only**
     */
    setRelayProxyHost(options: {
        relaxyProxyHost: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets video capturing framerate.
     * @param options.frameRate - Framerate to be set. Must be between `2` and `10` frames per second.
     */
    setFrameRate(options: {
        frameRate: number;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * Retrieves the video capturing framerate.
     * @param options.successCallback - Callback to be invoked with the current framerate
     */
    getFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets whether or not Android's `Jobs` are used for uploading.
     *
     * @kind **Android only**
     */
    setJobUploadEnabled(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets whether or not the SDK should use the adaptive framerate feature to capture video.
   *
   * @kind **iOS only**
     */
    setAdaptiveFrameRateEnabled(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description A boolean that determines whether the SDK uses the adaptive framerate functionality for video capture.
   *
   * @kind **iOS only**
     */
    getAdaptiveFrameRateEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Enables the tracking of all events.
     */
    eventTrackingEnableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Disabled the tracking of all events.
     */
    eventTrackingDisableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets a unique project key.
     * @param options.key - Project key
     */
    setProjectKey(options: {
        key: string;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Determines whether or not the SDK is recording.
     * @param options.successCallback - Callback to be invoked with the current value
     */
    isRecording(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves a string containing the current project key.
     * @param options.successCallback - Callback to be invoked with the current project key
     */
    getProjectKey(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Enables the tracking of all user's interaction events.
     *
     * @kind **Android only**
     * @param options.isEnabled - A boolean that determines whether or not the tracking of all user's interaction events is enabled.
     */
    setEventTrackingInteractionUserStatus(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets whether or not "rage" clicks are automatically tracked.
     * @param options.isEnabled - A boolean that determines whether or not "rage" clicks are automatically tracked.
     */
    setEventTrackingInteractionRageClickStatus(options: {
        isEnabled: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets tracking properties to default values.
     */
    restoreDefault(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets whether or not a WebView class should be considered sensitive.
     * @default True by default in the SDK.
     * @param options.isSensitive - A boolean that determines whether or not the WebView class should be considered sensitive.
     */
    setWebViewSensitivity(options: {
        isSensitive: boolean;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves the current SDK's rendering mode.
     * @param options.successCallback - Callback to be invoked with the current rendering mode
     */
    getRenderingMode(successCallback: SuccessCallback<RenderingMode>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves the current recording status. The default SDK value is `NotStarted`.
     * @param options.successCallback - Callback to be invoked with the current recording status
     */
    getRecordingStatus(successCallback: SuccessCallback<RecordingStatus>, errorCallback?: ErrorCallback): void;
    /**
     * @description Retrieves a number representing the current framerate.
     * @param options.successCallback - Callback to be invoked with the current framerate
     */
    getStateFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
    /**
     * @description Sets SDK's video rendering mode for captured data.
     * @param options.renderingMode - Rendering mode to be set. @see RenderingMode
     */
    setRenderingMode(options: {
        renderingMode: RenderingMode;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Registers a listener that gets triggered when the User URL changes.
     *
     * @param options.userUrlChangedCallback - Callback to be invoked when the User URL changes
     */
    registerUserUrlChangedListener(options: {
        userUrlChangedCallback: NativeListenerCallbackShape;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Registers a listener that gets triggered when the Session URL changes.
     *
     * @param options.sessionUrlChangedCallback - Callback to be invoked when the Session URL changes
     */
    registerSessionUrlChangedListener(options: {
        sessionUrlChangedCallback: NativeListenerCallbackShape;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Registers a listener that gets triggered when the native SDK's Rendering mode changes.
     *
     * @param options.renderingModeChangedCallback - Callback to be invoked when the native SDK's Rendering mode changes
     * @kind **iOS only**
     */
    registerRenderingModeChangedListener(options: {
        renderingModeChangedCallback: NativeListenerCallbackShape;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Registers a listener that gets triggered when the native SDK's Recording status changes.
     *
     * @param options.recordingStatusChangedCallback - Callback to be invoked when the native SDK's Recording status changes
     * @kind **iOS only**
     */
    registerRecordingStatusChangedListener(options: {
        recordingStatusChangedCallback: NativeListenerCallbackShape;
    }, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
    /**
     * @description Removes the user URL change listener.
     */
    removeUserUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Removes the session URL change listener.
     */
    removeSessionUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Removes the rendering mode change listener.
     */
    removeRenderingModeChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Removes the recording status change listener.
     */
    removeRecordingStatusChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Creates a new @see RecordingMask .
     *
     * @param options.recordingMaskList - an array of recording mask elements containing their bounding rectangles and mask types.
     * @see RecordingMaskRect , @see RecordingMaskType
     */
    setRecordingMask(options: {
        recordingMaskList: RecordingMaskList;
    }, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
    /**
     * @description Enables advanced SDK logging capabilities.
     *
     * @kind **Android only**
     */
    enableLogs(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
}
/**
 * @description Starts the recording, even when no project key is set.
 * See the docs for more infromation.
 */
export declare function start(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Stops the recording.
 */
export declare function stop(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Resets the SDK to a default state.
 */
export declare function reset(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Logs a new event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 */
export declare function trackEvent(options: {
    eventName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Logs a new selector event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 * @kind **iOS only**
 */
export declare function trackSelector(options: {
    selectorName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * Logs a new navigation sreen-entering event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 */
export declare function trackNavigationEnter(options: {
    eventName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * Logs a new navigation sreen-exiting event in the application.
 * @param options.eventName - Application event name
 * @param options.props - optional event properties object
 */
export declare function trackNavigationExit(options: {
    eventName: string;
    props?: Record<string, string>;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * Sets a new SDK referrer.
 * @param options.referrer - Application referrer name
 * @param options.source - Referrer source name
 *
 * @kind **Android only**
 */
export declare function setReferrer(options: {
    referrer: string;
    source: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets a user-passed global event property.
 * @param options.eventName - Global event name
 * @param options.props - optional event properties object
 */
export declare function putGlobalEventProperty(options: {
    propertyName: string;
    value: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves a user-passed event property.
 * @param options.eventName - Global event name to retrieve
 */
export declare function getGlobalEventProperty(options: {
    propertyName: string;
}, successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Removes a user-passed event property.
 * @param options.eventName - Global event name to remove
 */
export declare function removeGlobalEventProperty(options: {
    propertyName: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Clears all user-passed event properties.
 */
export declare function clearGlobalEventProperties(successCallback: SuccessCallback<boolean>, errorCallback: ErrorCallback): void;
/**
 * @description Sets new identification for the recorded user.
 * @param options.identifier - User identifier
 */
export declare function setUserIdentifier(options: {
    identifier: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets user’s full name.
 * @param options.name - User's full name
 */
export declare function setUserName(options: {
    name: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets user’s email address.
 * @param options.email - User's email address
 */
export declare function setUserEmail(options: {
    email: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets or adds a new value to the user properties.
 * @param options.propertyName - User property name
 * @param options.value - User property value
 */
export declare function setUserProperty(options: {
    propertyName: string;
    value: string;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves a user property value with a given property name (a key).
 * @param options.propertyName - User property name
 * @param options.successCallback - Callback to be invoked with the user property value
 */
export declare function getUserProperty(options: {
    propertyName: string;
}, successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Removes a user property given a property name (a key).
 */
export declare function removeUserProperty(options: {
    propertyName: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Initializes a new user for recording.
 */
export declare function openNewUser(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Opens a new recording session.
 */
export declare function openNewSession(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves the unique URL of the currently recorded user.
 * @param options.successCallback - Callback to be invoked with the user URL
 */
export declare function getUserUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves the unique URL of this recording session.
 * @param options.successCallback - Callback to be invoked with the session URL
 */
export declare function getSessionUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves the unique session URL with the exact location on the timeline.
 * @param options.successCallback - Callback to be invoked with the session URL
 */
export declare function getSessionUrlWithTimestamp(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets a proxy host name for data transfer.
 * @param options.relayProxyHost - Proxy host name
 *
 * @kind **Android only**
 */
export declare function setRelayProxyHost(options: {
    relayProxyHost: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets video capturing framerate.
 * @param options.frameRate - Framerate to be set. Must be between `2` and `10` frames per second.
 */
export declare function setFrameRate(options: {
    frameRate: number;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * Retrieves the video capturing framerate.
 * @param options.successCallback - Callback to be invoked with the current framerate
 */
export declare function getFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets whether or not Android's `Jobs` are used for uploading.
 *
 * @kind **Android only**
 */
export declare function setJobUploadEnabled(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets whether or not the SDK should use the adaptive framerate feature to capture video.
 */
export declare function setAdaptiveFrameRateEnabled(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description A boolean that determines whether the SDK uses the adaptive framerate functionality for video capture.
 */
export declare function getAdaptiveFrameRateEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Enables the tracking of all events.
 */
export declare function eventTrackingEnableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Disabled the tracking of all events.
 */
export declare function eventTrackingDisableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets a unique project key.
 * @param options.key - Project key
 */
export declare function setProjectKey(options: {
    key: string;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Determines whether or not the SDK is recording.
 * @param options.successCallback - Callback to be invoked with the current value
 */
export declare function isRecording(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves a string containing the current project key.
 * @param options.successCallback - Callback to be invoked with the current project key
 */
export declare function getProjectKey(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Enables the tracking of all user's interaction events.
 *
 * @kind **Android only**
 * @param options.isEnabled - A boolean that determines whether or not the tracking of all user's interaction events is enabled.
 */
export declare function setEventTrackingInteractionUserStatus(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets whether or not "rage" clicks are automatically tracked.
 * @param options.isEnabled - A boolean that determines whether or not "rage" clicks are automatically tracked.
 */
export declare function setEventTrackingInteractionRageClickStatus(options: {
    isEnabled: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets tracking properties to default values.
 */
export declare function restoreDefault(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets whether or not a WebView class should be considered sensitive.
 * @default True by default in the SDK.
 * @param options.isSensitive - A boolean that determines whether or not the WebView class should be considered sensitive.
 */
export declare function setWebViewSensitivity(options: {
    isSensitive: boolean;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves the current SDK's rendering mode.
 * @param options.successCallback - Callback to be invoked with the current rendering mode
 */
export declare function getRenderingMode(successCallback: SuccessCallback<RenderingMode>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves the current recording status. The default SDK value is `NotStarted`.
 * @param options.successCallback - Callback to be invoked with the current recording status
 */
export declare function getRecordingStatus(successCallback: SuccessCallback<RecordingStatus>, errorCallback?: ErrorCallback): void;
/**
 * @description Retrieves a number representing the current framerate.
 * @param options.successCallback - Callback to be invoked with the current framerate
 */
export declare function getStateFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
/**
 * @description Sets SDK's video rendering mode for captured data.
 * @param options.renderingMode - Rendering mode to be set. @see RenderingMode
 */
export declare function setRenderingMode(options: {
    renderingMode: RenderingMode;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Registers a listener that gets triggered when the User URL changes.
 *
 * @param options.userUrlChangedCallback - Callback to be invoked when the User URL changes
 */
export declare function registerUserUrlChangedListener(options: {
    userUrlChangedCallback: (userUrl: string) => void;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Registers a listener that gets triggered when the Session URL changes.
 *
 * @param options.sessionUrlChangedCallback - Callback to be invoked when the Session URL changes
 */
export declare function registerSessionUrlChangedListener(options: {
    sessionUrlChangedCallback: (sessionUrl: string) => void;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Registers a listener that gets triggered when the native SDK's Rendering mode changes.
 *
 * @param options.renderingModeChangedCallback - Callback to be invoked when the native SDK's Rendering mode changes
 * @kind **iOS only**
 */
export declare function registerRenderingModeChangedListener(options: {
    renderingModeChangedCallback: (renderingMode: RenderingMode) => void;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Registers a listener that gets triggered when the native SDK's Recording status changes.
 *
 * @param options.recordingStatusChangedCallback - Callback to be invoked when the native SDK's Recording status changes
 * @kind **iOS only**
 */
export declare function registerRecordingStatusChangedListener(options: {
    recordingStatusChangedCallback: NativeListenerCallbackShape;
}, successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
/**
 * @description Removes the user URL change listener.
 */
export declare function removeUserUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Removes the session URL change listener.
 */
export declare function removeSessionUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Removes the rendering mode change listener.
 */
export declare function removeRenderingModeChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Removes the recording status change listener.
 */
export declare function removeRecordingStatusChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Creates a new @see RecordingMask .
 *
 * @param options.recordingMaskList - an array of recording mask elements containing their bounding rectangles and mask types.
 * @see RecordingMaskRect , @see RecordingMaskType
 */
export declare function setRecordingMask(options: {
    recordingMaskList: RecordingMaskList;
}, successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
/**
 * @description Enables advanced SDK logging capabilities.
 *
 * @kind **Android only**
 */
export declare function enableLogs(successCallback: SuccessCallback<boolean>, errorCallback: ErrorCallback): void;
