export declare enum Command {
    SETUP_AND_START_RECORDING = "setupAndStartRecording",
    SETUP = "setup",
    START_RECORDING = "startRecording",
    STOP_RECORDING = "stopRecording",
    IS_RECORDING = "isRecording",
    RESET_SESSION = "resetSession",
    SET_USER_IDENTIFIER = "setUserIdentifier",
    SET_EVENT_TRACKING_MODE = "setEventTrackingMode",
    SET_EVENT_TRACKING_MODES = "setEventTrackingModes",
    TRACK_NAVIGATION_EVENT = "trackNavigationEvent",
    START_TIMED_CUSTOM_EVENT = "startTimedCustomEvent",
    STOP_TIMED_CUSTOM_EVENT = "stopTimedCustomEvent",
    CANCEL_TIMED_CUSTOM_EVENT = "cancelTimedCustomEvent",
    TRACK_CUSTOM_EVENT = "trackCustomEvent",
    SET_GLOBAL_EVENT_PROPERTIES = "setGlobalEventProperties",
    SET_GLOBAL_EVENT_PROPERTY = "setGlobalEventProperty",
    REMOVE_GLOBAL_EVENT_PROPERTY = "removeGlobalEventProperty",
    REMOVE_ALL_GLOBAL_EVENT_PROPERTIES = "removeAllGlobalEventProperties",
    SET_REFERRER = "setReferrer",
    GET_DASHBOARD_SESSION_URL = "getDashboardSessionUrl",
    GET_DASHBOARD_VISITOR_URL = "getDashboardVisitorUrl",
    REGISTER_LOG_LISTENER = "registerLogListener",
    UNREGISTER_LOG_LISTENER = "unregisterLogListener",
    SET_RENDERING_MODE = "setRenderingMode",
    REGISTER_INTEGRATION_LISTENER = "registerIntegrationListener",
    UNREGISTER_INTEGRATION_LISTENER = "unregisterIntegrationListener",
    SESSION_READY_CALLBACK = "onSessionReady",
    VISITOR_READY_CALLBACK = "onVisitorReady"
}
export interface Dictionary<T> {
    [key: string]: T;
}
export declare enum ViewState {
    START = "start",
    STOP = "stop"
}
export declare enum EventTrackingMode {
    FULL_TRACKING = "full_tracking",
    IGNORE_USER_INTERACTION = "ignore_user_interaction",
    IGNORE_NAVIGATION_INTERACTION = "ignore_navigation_interaction",
    IGNORE_RAGE_CLICKS = "ignore_rage_clicks",
    NO_TRACKING = "no_tracking"
}
export declare enum RenderingMode {
    NO_RENDERING = "no_rendering",
    NATIVE = "native"
}
export declare type SuccessCallback = (value: any) => void;
export declare type ErrorCallback = (message: string) => void;
export declare type SetupOptions = {
    smartlookAPIKey: string;
    fps?: number;
    renderingMode?: RenderingMode;
    startNewSession?: boolean;
    startNewSessionAndUser?: boolean;
    eventTrackingModes?: EventTrackingMode[];
};
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
    ViewState: {
        [P in keyof typeof ViewState]: ViewState;
    };
    EventTrackingMode: {
        [P in keyof typeof EventTrackingMode]: EventTrackingMode;
    };
    RenderingMode: {
        [P in keyof typeof RenderingMode]: RenderingMode;
    };
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
    setupAndStartRecording(options: SetupOptions, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    setup(options: SetupOptions, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Start SDK recording.
     */
    startRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Stop SDK recording.
     */
    stopRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    isRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Resets current session and new session in dashboard is created.
     *
     * @param options.resetUser (Optional) If set to TRUE new visitor is created in the dashboard.
     */
    resetSession(options: {
        resetUser: boolean;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @deprecated This method is deprecated and should not be further used. Please use:
     * Smartlook.setRenderingMode({renderingMode: Smartlook.RenderingMode.NO_RENDERING})
     *
     * @description When you start sensitive mode SDK records blank videos (single color) but SDK still
     *              sends Analytic events.
     */
    setUserIdentifier(options: {
        identifier: string;
        sessionProperties: Dictionary<any>;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description You can configure which events are being tracked by setting eventTrackingMode.
     *
     * @param options.eventTrackingMode Can be one of:
     *                                  - EventTrackingMode.FULL_TRACKING ... track everything
     *                                  - EventTrackingMode.IGNORE_USER_INTERACTION ... will not track touches
     *                                    focus, keyboard, selector events
     *                                  - EventTrackingMode.IGNORE_NAVIGATION_INTERACTION ... will not track screen names
     *                                  - EventTrackingMode.IGNORE_RAGE_CLICKS ... will not track rage clicks
     *                                  - EventTrackingMode.NO_TRACKING ... not gonna track any events
     */
    setEventTrackingMode(options: {
        eventTrackingMode: EventTrackingMode;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    setEventTrackingModes(options: {
        eventTrackingMode: EventTrackingMode[];
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Track custom navigation event.
     *
     * @param options.name      Controller/Activity/Page name.
     * @param options.viewState One of Smartlook.ViewState.START or Smartlook.ViewState.STOP.
     */
    trackNavigationEvent(options: {
        name: string;
        viewState: ViewState;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    startTimedCustomEvent(options: {
        name: string;
        eventProperties?: Dictionary<string>;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Stops timed event. Duration from according start is calculated and send with the event.
     *
     * @param options.eventId         Unique event id that is used to identify this event.
     * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
     *                                data passed in start.
     */
    stopTimedCustomEvent(options: {
        eventId: string;
        eventProperties?: Dictionary<string>;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Cancels timed event. It calculates event duration and notes that this event has failed.
     *
     * @param options.eventId         Unique event id that is used to identify this event.
     * @param options.reason          Short string description explaining why the event was canceled.
     * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
     *                                data passed in start.
     */
    cancelTimedCustomEvent(options: {
        eventId: string;
        reason: string;
        eventProperties?: Dictionary<string>;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Track custom event.
     *
     * @param options.name            String used to identify event.
     * @param options.eventProperties (Optional) Event data stored in object.
     */
    trackCustomEvent(options: {
        name: string;
        eventProperties: Dictionary<any>;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Set global event properties that will be added to every tracked event.
     *
     * @param options.globalEventProperties Global event properties stored in object.
     * @param options.immutable             If set to TRUE these properties have higher priority than mutable ones
     *                                      and also they cannot be changed (only removed).
     */
    setGlobalEventProperties(options: {
        globalEventProperties: Dictionary<string>;
        immutable?: boolean;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Set global event property that will be added to every tracked event.
     *
     * @param options.key        Global event property key.
     * @param options.value      Global event property value.
     * @param options.immutable  If set to TRUE this property has higher priority than mutable ones and also it
     *                           cannot be changed (only removed).
     */
    setGlobalEventProperty(options: {
        key: string;
        value: string;
        immutable?: boolean;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Remove property from global event properties.
     *
     * @param options.key Key of global event property that needs to be removed.
     */
    removeGlobalEventProperty(options: {
        key: string;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Remove all properties from global event properties.
     */
    removeAllGlobalEventProperties(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Possibility to manually set referrer and source of the installation visible in dashboard
     *              and accessible via filters
     *
     * @param referrer Desired referrer value
     * @param source   Desired source, i.e. com.android.vending or com.amazon.venezia
     */
    setReferrer(options: {
        referrer: string;
        source: string;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    getDashboardSessionUrl(options: {
        withCurrentTimestamp?: boolean;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    getDashboardVisitorUrl(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    registerLogListener(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * You can unregister callback to all public SDK logs if registered before.
     */
    unregisterLogListener(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * By changing rendering method you can adjust the way we render the application for recordings.
     *
     * @param options.renderingMode       Mode defining the video output of recording. Currently only
     *                                    RenderingMode.NO_RENDERING and RenderingMode.NATIVE available.
     * @param options.renderingModeOption [NOT IMPLEMENTED]
     */
    setRenderingMode(options: {
        renderingMode: RenderingMode[];
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
    registerIntegrationListener(options: {
        onSessionReady: (dashboardSessionUrl: string) => void;
        onVisitorReady: (dashboardVisitorUrl: string) => void;
    }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
    /**
     * @description Unregister Integration listener (@see registerIntegrationListener())
     */
    unregisterIntegrationListener(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
}
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
export declare function setupAndStartRecording(options: SetupOptions, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function setup(options: SetupOptions, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Start SDK recording.
 */
export declare function startRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Stop SDK recording.
 */
export declare function stopRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function isRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Resets current session and new session in dashboard is created.
 *
 * @param options.resetUser (Optional) If set to TRUE new visitor is created in the dashboard.
 */
export declare function resetSession(options: {
    resetUser: boolean;
}, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Identify user with identifier and optional properties.
 *
 * @param options.identifier        String Id that can be used to identify user and his records. You will see this
 *                                  Id in Smartlook dashboard so you can pair records with concrete user.
 * @param options.sessionProperties (Optional) Additional properties object that will be paired with every session and can
 *                                  be viewed in Smartlook dashboard.
 */
export declare function setUserIdentifier(options: {
    identifier: string;
    sessionProperties: Dictionary<any>;
}, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function setEventTrackingMode(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function setEventTrackingModes(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Track custom navigation event.
 *
 * @param options.name      Controller/Activity/Page name.
 * @param options.viewState One of Smartlook.ViewState.START or Smartlook.ViewState.STOP.
 */
export declare function trackNavigationEvent(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function startTimedCustomEvent(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Stops timed event. Duration from according start is calculated and send with the event.
 *
 * @param options.eventId         Unique event id that is used to identify this event.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
export declare function stopTimedCustomEvent(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Cancels timed event. It calculates event duration and notes that this event has failed.
 *
 * @param options.eventId         Unique event id that is used to identify this event.
 * @param options.reason          Short string description explaining why the event was canceled.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
export declare function cancelTimedCustomEvent(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Track custom event.
 *
 * @param options.name            String used to identify event.
 * @param options.eventProperties (Optional) Event data stored in object.
 */
export declare function trackCustomEvent(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Set global event properties that will be added to every tracked event.
 *
 * @param options.globalEventProperties Global event properties stored in object.
 * @param options.immutable             If set to TRUE these properties have higher priority than mutable ones
 *                                      and also they cannot be changed (only removed).
 */
export declare function setGlobalEventProperties(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Set global event property that will be added to every tracked event.
 *
 * @param options.key        Global event property key.
 * @param options.value      Global event property value.
 * @param options.immutable  If set to TRUE this property has higher priority than mutable ones and also it
 *                           cannot be changed (only removed).
 */
export declare function setGlobalEventProperty(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Remove property from global event properties.
 *
 * @param options.key Key of global event property that needs to be removed.
 */
export declare function removeGlobalEventProperty(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Remove all properties from global event properties.
 */
export declare function removeAllGlobalEventProperties(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Possibility to manually set referrer and source of the installation visible in dashboard
 *              and accessible via filters
 *
 * @param referrer Desired referrer value
 * @param source   Desired source, i.e. com.android.vending or com.amazon.venezia
 */
export declare function setReferrer(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function getDashboardSessionUrl(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function getDashboardVisitorUrl(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function registerLogListener(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * You can unregister callback to all public SDK logs if registered before.
 */
export declare function unregisterLogListener(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * By changing rendering method you can adjust the way we render the application for recordings.
 *
 * @param options.renderingMode       Mode defining the video output of recording. Currently only
 *                                    RenderingMode.NO_RENDERING and RenderingMode.NATIVE available.
 * @param options.renderingModeOption [NOT IMPLEMENTED]
 */
export declare function setRenderingMode(options: {
    renderingMode: RenderingMode;
}, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
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
export declare function registerIntegrationListener(options: any, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
/**
 * @description Unregister Integration listener (@see registerIntegrationListener())
 */
export declare function unregisterIntegrationListener(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
