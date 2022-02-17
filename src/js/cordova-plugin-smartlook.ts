const { cordova } = window;

// Plugin name
const SMARTLOOK_PLUGIN = 'SmartlookPlugin';

// Smartlook framework info
const SMARTLOOK_FRAMEWORK = 'CORDOVA';
const SMARTLOOK_FRAMEWORK_VERSION = '-';
const SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = '1.9.5';

// API methods names
export enum Command {
	// Setup and lifecycle
	SETUP_AND_START_RECORDING = 'setupAndStartRecording',
	SETUP = 'setup',
	START_RECORDING = 'startRecording',
	STOP_RECORDING = 'stopRecording',
	IS_RECORDING = 'isRecording',
	RESET_SESSION = 'resetSession',

	// User identifier
	SET_USER_IDENTIFIER = 'setUserIdentifier',

	//Tracking
	SET_EVENT_TRACKING_MODE = 'setEventTrackingMode',
	SET_EVENT_TRACKING_MODES = 'setEventTrackingModes',
	TRACK_NAVIGATION_EVENT = 'trackNavigationEvent',
	START_TIMED_CUSTOM_EVENT = 'startTimedCustomEvent',
	STOP_TIMED_CUSTOM_EVENT = 'stopTimedCustomEvent',
	CANCEL_TIMED_CUSTOM_EVENT = 'cancelTimedCustomEvent',
	TRACK_CUSTOM_EVENT = 'trackCustomEvent',

	// Event properties
	SET_GLOBAL_EVENT_PROPERTIES = 'setGlobalEventProperties',
	SET_GLOBAL_EVENT_PROPERTY = 'setGlobalEventProperty',
	REMOVE_GLOBAL_EVENT_PROPERTY = 'removeGlobalEventProperty',
	REMOVE_ALL_GLOBAL_EVENT_PROPERTIES = 'removeAllGlobalEventProperties',

	// Utilities
	SET_REFERRER = 'setReferrer',
	GET_DASHBOARD_SESSION_URL = 'getDashboardSessionUrl',
	GET_DASHBOARD_VISITOR_URL = 'getDashboardVisitorUrl',
	REGISTER_LOG_LISTENER = 'registerLogListener',
	UNREGISTER_LOG_LISTENER = 'unregisterLogListener',
	SET_RENDERING_MODE = 'setRenderingMode',

	//Integrations
	REGISTER_INTEGRATION_LISTENER = 'registerIntegrationListener',
	UNREGISTER_INTEGRATION_LISTENER = 'unregisterIntegrationListener',

	// Callbacks
	SESSION_READY_CALLBACK = 'onSessionReady',
	VISITOR_READY_CALLBACK = 'onVisitorReady',
}

// Internal logic
const SET_PLUGIN_VERSION = 'setPluginVersion';

// Undefined
const UNDEFINED_FPS = -1;
const UNDEFINED_RENDERING_MODE = '';

const emptyCallback = function () {
	return;
};

export interface Dictionary<T> {
	[key: string]: T;
}

////////////////////////////////////////////////////////////////////////////////
// SDK API constants

export enum ViewState {
	START = 'start',
	STOP = 'stop',
}

export enum EventTrackingMode {
	FULL_TRACKING = 'full_tracking',
	IGNORE_USER_INTERACTION = 'ignore_user_interaction',
	IGNORE_NAVIGATION_INTERACTION = 'ignore_navigation_interaction',
	IGNORE_RAGE_CLICKS = 'ignore_rage_clicks',
	NO_TRACKING = 'no_tracking',
}

export enum RenderingMode {
	NO_RENDERING = 'no_rendering',
	NATIVE = 'native',
}

export type SuccessCallback = (value: any) => void;
export type ErrorCallback = (message: string) => void;

export type SetupOptions = {
	smartlookAPIKey: string;
	fps?: number;
	renderingMode?: RenderingMode;
	startNewSession?: boolean;
	startNewSessionAndUser?: boolean;
	eventTrackingModes?: EventTrackingMode[];
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
	resetSession(options: { resetUser: boolean }, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
	/**
	 * @deprecated This method is deprecated and should not be further used. Please use:
	 * Smartlook.setRenderingMode({renderingMode: Smartlook.RenderingMode.NO_RENDERING})
	 *
	 * @description When you start sensitive mode SDK records blank videos (single color) but SDK still
	 *              sends Analytic events.
	 */
	setUserIdentifier(
		options: { identifier: string; sessionProperties: Dictionary<any> },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
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
	setEventTrackingMode(
		options: { eventTrackingMode: EventTrackingMode },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
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
	setEventTrackingModes(
		options: { eventTrackingMode: EventTrackingMode[] },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Track custom navigation event.
	 *
	 * @param options.name      Controller/Activity/Page name.
	 * @param options.viewState One of Smartlook.ViewState.START or Smartlook.ViewState.STOP.
	 */
	trackNavigationEvent(
		options: { name: string; viewState: ViewState },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
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
	startTimedCustomEvent(
		options: { name: string; eventProperties?: Dictionary<string> },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Stops timed event. Duration from according start is calculated and send with the event.
	 *
	 * @param options.eventId         Unique event id that is used to identify this event.
	 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
	 *                                data passed in start.
	 */
	stopTimedCustomEvent(
		options: { eventId: string; eventProperties?: Dictionary<string> },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Cancels timed event. It calculates event duration and notes that this event has failed.
	 *
	 * @param options.eventId         Unique event id that is used to identify this event.
	 * @param options.reason          Short string description explaining why the event was canceled.
	 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
	 *                                data passed in start.
	 */
	cancelTimedCustomEvent(
		options: { eventId: string; reason: string; eventProperties?: Dictionary<string> },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Track custom event.
	 *
	 * @param options.name            String used to identify event.
	 * @param options.eventProperties (Optional) Event data stored in object.
	 */
	trackCustomEvent(
		options: { name: string; eventProperties: Dictionary<any> },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Set global event properties that will be added to every tracked event.
	 *
	 * @param options.globalEventProperties Global event properties stored in object.
	 * @param options.immutable             If set to TRUE these properties have higher priority than mutable ones
	 *                                      and also they cannot be changed (only removed).
	 */
	setGlobalEventProperties(
		options: { globalEventProperties: Dictionary<string>; immutable?: boolean },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Set global event property that will be added to every tracked event.
	 *
	 * @param options.key        Global event property key.
	 * @param options.value      Global event property value.
	 * @param options.immutable  If set to TRUE this property has higher priority than mutable ones and also it
	 *                           cannot be changed (only removed).
	 */
	setGlobalEventProperty(
		options: { key: string; value: string; immutable?: boolean },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Remove property from global event properties.
	 *
	 * @param options.key Key of global event property that needs to be removed.
	 */
	removeGlobalEventProperty(
		options: { key: string },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
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
	setReferrer(
		options: { referrer: string; source: string },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
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
	getDashboardSessionUrl(
		options: { withCurrentTimestamp?: boolean },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
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
	setRenderingMode(
		options: { renderingMode: RenderingMode[] },
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
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
	registerIntegrationListener(
		options: {
			onSessionReady: (dashboardSessionUrl: string) => void;
			onVisitorReady: (dashboardVisitorUrl: string) => void;
		},
		successCallback: SuccessCallback,
		errorCallback: ErrorCallback,
	): void;
	/**
	 * @description Unregister Integration listener (@see registerIntegrationListener())
	 */
	unregisterIntegrationListener(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
}

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
export function setupAndStartRecording(
	options: SetupOptions,
	successCallback: SuccessCallback,
	errorCallback: ErrorCallback,
) {
	setPluginVersion();

	const args = [];
	const renderingModeAllowedValues = [RenderingMode.NO_RENDERING, RenderingMode.NATIVE];

	if (checkStringOption('smartlookAPIKey', options, errorCallback, true)) {
		args.push(options['smartlookAPIKey']);
	} else {
		return;
	}

	if (checkFpsOption(options, errorCallback, false)) {
		args.push(options['fps']);
	} else {
		args.push(UNDEFINED_FPS);
	}

	if (
		checkStringArrayOption(options['renderingMode'], 'renderingMode', renderingModeAllowedValues, errorCallback, false)
	) {
		args.push(options['renderingMode']);
	} else {
		args.push(UNDEFINED_RENDERING_MODE);
	}

	if (checkBooleanOption('startNewSession', options, errorCallback, false)) {
		args.push(options['startNewSession']);
	} else {
		args.push(false);
	}

	if (checkBooleanOption('startNewSessionAndUser', options, errorCallback, false)) {
		args.push(options['startNewSessionAndUser']);
	} else {
		args.push(false);
	}

	if (checkEventTrackingModeArray(options, errorCallback, false)) {
		args.push(options['eventTrackingModes']);
	} else {
		args.push([]);
	}

	execWithCallbacks(successCallback, errorCallback, Command.SETUP_AND_START_RECORDING, args);
}

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
export function setup(options: SetupOptions, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	setPluginVersion();

	const args = [];
	const renderingModeAllowedValues = [RenderingMode.NO_RENDERING, RenderingMode.NATIVE];

	if (checkStringOption('smartlookAPIKey', options, errorCallback, true)) {
		args.push(options['smartlookAPIKey']);
	} else {
		return;
	}

	if (checkFpsOption(options, errorCallback, false)) {
		args.push(options['fps']);
	} else {
		args.push(UNDEFINED_FPS);
	}

	if (
		checkStringArrayOption(options['renderingMode'], 'renderingMode', renderingModeAllowedValues, errorCallback, false)
	) {
		args.push(options['renderingMode']);
	} else {
		args.push(UNDEFINED_RENDERING_MODE);
	}

	if (checkBooleanOption('startNewSession', options, errorCallback, false)) {
		args.push(options['startNewSession']);
	} else {
		args.push(false);
	}

	if (checkBooleanOption('startNewSessionAndUser', options, errorCallback, false)) {
		args.push(options['startNewSessionAndUser']);
	} else {
		args.push(false);
	}

	if (checkEventTrackingModeArray(options, errorCallback, false)) {
		args.push(options['eventTrackingModes']);
	} else {
		args.push([]);
	}

	execWithCallbacks(successCallback, errorCallback, Command.SETUP, args);
}

/**
 * @description Start SDK recording.
 */
export function startRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.START_RECORDING, []);
}

/**
 * @description Stop SDK recording.
 */
export function stopRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.STOP_RECORDING, []);
}

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
export function isRecording(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.IS_RECORDING, []);
}

/**
 * @description Resets current session and new session in dashboard is created.
 *
 * @param options.resetUser (Optional) If set to TRUE new visitor is created in the dashboard.
 */
export function resetSession(
	options: { resetUser: boolean },
	successCallback: SuccessCallback,
	errorCallback: ErrorCallback,
) {
	const args = [];

	if (checkBooleanOption('resetUser', options, errorCallback, true)) {
		args.push(options['resetUser']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.RESET_SESSION, args);
}

// User identification

/**
 * @description Identify user with identifier and optional properties.
 *
 * @param options.identifier        String Id that can be used to identify user and his records. You will see this
 *                                  Id in Smartlook dashboard so you can pair records with concrete user.
 * @param options.sessionProperties (Optional) Additional properties object that will be paired with every session and can
 *                                  be viewed in Smartlook dashboard.
 */
export function setUserIdentifier(
	options: { identifier: string; sessionProperties: Dictionary<any> },
	successCallback: SuccessCallback,
	errorCallback: ErrorCallback,
) {
	const args = [];

	if (checkStringOption('identifier', options, errorCallback, true)) {
		args.push(options['identifier']);
	} else {
		return;
	}

	if (checkProperties('sessionProperties', options, errorCallback, false)) {
		args.push(options['sessionProperties']);
	}

	execWithCallbacks(successCallback, errorCallback, Command.SET_USER_IDENTIFIER, args);
}

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
export function setEventTrackingMode(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];
	const allowedValues = [
		EventTrackingMode.FULL_TRACKING,
		EventTrackingMode.IGNORE_USER_INTERACTION,
		EventTrackingMode.IGNORE_NAVIGATION_INTERACTION,
		EventTrackingMode.IGNORE_RAGE_CLICKS,
		EventTrackingMode.NO_TRACKING,
	];

	if (checkStringArrayOption(options['eventTrackingMode'], 'eventTrackingMode', allowedValues, errorCallback, true)) {
		args.push(options['eventTrackingMode']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.SET_EVENT_TRACKING_MODE, args);
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
export function setEventTrackingModes(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkEventTrackingModeArray(options, errorCallback, true)) {
		args.push(options['eventTrackingModes']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.SET_EVENT_TRACKING_MODES, args);
}

/**
 * @description Track custom navigation event.
 *
 * @param options.name      Controller/Activity/Page name.
 * @param options.viewState One of Smartlook.ViewState.START or Smartlook.ViewState.STOP.
 */
export function trackNavigationEvent(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];
	const allowedValues = [ViewState.START, ViewState.STOP];

	if (checkStringOption('name', options, errorCallback, true)) {
		args.push(options['name']);
	} else {
		return;
	}

	if (checkStringArrayOption(options['viewState'], 'viewState', allowedValues, errorCallback, true)) {
		args.push(options['viewState']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.TRACK_NAVIGATION_EVENT, args);
}

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
export function startTimedCustomEvent(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkStringOption('name', options, errorCallback, true)) {
		args.push(options['name']);
	} else {
		return;
	}

	if (checkProperties('eventProperties', options, errorCallback, false)) {
		args.push(options['eventProperties']);
	}

	execWithCallbacks(successCallback, errorCallback, Command.START_TIMED_CUSTOM_EVENT, args);
}

/**
 * @description Stops timed event. Duration from according start is calculated and send with the event.
 *
 * @param options.eventId         Unique event id that is used to identify this event.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
export function stopTimedCustomEvent(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkStringOption('eventId', options, errorCallback, true)) {
		args.push(options['eventId']);
	} else {
		return;
	}

	if (checkProperties('eventProperties', options, errorCallback, false)) {
		args.push(options['eventProperties']);
	}

	execWithCallbacks(successCallback, errorCallback, Command.STOP_TIMED_CUSTOM_EVENT, args);
}

/**
 * @description Cancels timed event. It calculates event duration and notes that this event has failed.
 *
 * @param options.eventId         Unique event id that is used to identify this event.
 * @param options.reason          Short string description explaining why the event was canceled.
 * @param options.eventProperties (Optional) Event data stored in object. These are going to be merged with
 *                                data passed in start.
 */
export function cancelTimedCustomEvent(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkStringOption('eventId', options, errorCallback, true)) {
		args.push(options['eventId']);
	} else {
		return;
	}

	if (checkStringOption('reason', options, errorCallback, true)) {
		args.push(options['reason']);
	} else {
		return;
	}

	if (checkProperties('eventProperties', options, errorCallback, false)) {
		args.push(options['eventProperties']);
	}

	execWithCallbacks(successCallback, errorCallback, Command.CANCEL_TIMED_CUSTOM_EVENT, args);
}

/**
 * @description Track custom event.
 *
 * @param options.name            String used to identify event.
 * @param options.eventProperties (Optional) Event data stored in object.
 */
export function trackCustomEvent(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkStringOption('name', options, errorCallback, true)) {
		args.push(options['name']);
	} else {
		return;
	}

	if (checkProperties('eventProperties', options, errorCallback, false)) {
		args.push(options['eventProperties']);
	}

	execWithCallbacks(successCallback, errorCallback, Command.TRACK_CUSTOM_EVENT, args);
}

// Event properties

/**
 * @description Set global event properties that will be added to every tracked event.
 *
 * @param options.globalEventProperties Global event properties stored in object.
 * @param options.immutable             If set to TRUE these properties have higher priority than mutable ones
 *                                      and also they cannot be changed (only removed).
 */
export function setGlobalEventProperties(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkProperties('globalEventProperties', options, errorCallback, true)) {
		args.push(options['globalEventProperties']);
	} else {
		return;
	}

	if (checkBooleanOption('immutable', options, errorCallback, true)) {
		args.push(options['immutable']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.SET_GLOBAL_EVENT_PROPERTIES, args);
}

/**
 * @description Set global event property that will be added to every tracked event.
 *
 * @param options.key        Global event property key.
 * @param options.value      Global event property value.
 * @param options.immutable  If set to TRUE this property has higher priority than mutable ones and also it
 *                           cannot be changed (only removed).
 */
export function setGlobalEventProperty(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkKeyValueOptions(options, errorCallback, true)) {
		args.push(options['key']);
		args.push(options['value']);
	} else {
		return;
	}

	if (checkBooleanOption('immutable', options, errorCallback, true)) {
		args.push(options['immutable']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.SET_GLOBAL_EVENT_PROPERTY, args);
}

/**
 * @description Remove property from global event properties.
 *
 * @param options.key Key of global event property that needs to be removed.
 */
export function removeGlobalEventProperty(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkStringOption('key', options, errorCallback, true)) {
		args.push(options['key']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.REMOVE_GLOBAL_EVENT_PROPERTY, args);
}

/**
 * @description Remove all properties from global event properties.
 */
export function removeAllGlobalEventProperties(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.REMOVE_ALL_GLOBAL_EVENT_PROPERTIES, []);
}

// Utilities

/**
 * @description Possibility to manually set referrer and source of the installation visible in dashboard
 *              and accessible via filters
 *
 * @param referrer Desired referrer value
 * @param source   Desired source, i.e. com.android.vending or com.amazon.venezia
 */
export function setReferrer(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkStringOption('referrer', options, errorCallback, true)) {
		args.push(options['referrer']);
	} else {
		return;
	}

	if (checkStringOption('source', options, errorCallback, true)) {
		args.push(options['source']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.SET_REFERRER, args);
}

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
export function getDashboardSessionUrl(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const args = [];

	if (checkBooleanOption('withCurrentTimestamp', options, errorCallback, false)) {
		args.push(options['withCurrentTimestamp']);
	}

	execWithCallbacks(successCallback, errorCallback, Command.GET_DASHBOARD_SESSION_URL, args);
}

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
export function getDashboardVisitorUrl(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.GET_DASHBOARD_VISITOR_URL, []);
}

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
export function registerLogListener(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.REGISTER_LOG_LISTENER, []);
}

/**
 * You can unregister callback to all public SDK logs if registered before.
 */
export function unregisterLogListener(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.UNREGISTER_LOG_LISTENER, []);
}

/**
 * By changing rendering method you can adjust the way we render the application for recordings.
 *
 * @param options.renderingMode       Mode defining the video output of recording. Currently only
 *                                    RenderingMode.NO_RENDERING and RenderingMode.NATIVE available.
 * @param options.renderingModeOption [NOT IMPLEMENTED]
 */
export function setRenderingMode(
	options: { renderingMode: RenderingMode },
	successCallback: SuccessCallback,
	errorCallback: ErrorCallback,
) {
	const args = [];

	const allowedValues = [RenderingMode.NO_RENDERING, RenderingMode.NATIVE];

	if (checkStringArrayOption(options['renderingMode'], 'renderingMode', allowedValues, errorCallback, true)) {
		args.push(options['renderingMode']);
	} else {
		return;
	}

	execWithCallbacks(successCallback, errorCallback, Command.SET_RENDERING_MODE, args);
}

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
export function registerIntegrationListener(options, successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	const integrationCallback = (callbackData) => {
		if (callbackData != undefined && callbackData['url'] != undefined && callbackData['url'].length > 0) {
			if (callbackData['callback'] === Command.SESSION_READY_CALLBACK) {
				options['onSessionReady'](callbackData['url']);
			} else if (callbackData['callback'] === Command.VISITOR_READY_CALLBACK) {
				options['onVisitorReady'](callbackData['url']);
			}
		}
	};

	execWithCallbacks(integrationCallback, errorCallback, Command.REGISTER_INTEGRATION_LISTENER, []);
	successCallback('');
}

/**
 * @description Unregister Integration listener (@see registerIntegrationListener())
 */
export function unregisterIntegrationListener(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.UNREGISTER_INTEGRATION_LISTENER, []);
}

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

function checkStringOption(option: string, options, errorCallback, isMandatory) {
	const toCheck = options[option];

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

function checkStringArrayOption(
	toCheck: string,
	option: string,
	possibleValueArray: string[],
	errorCallback: ErrorCallback,
	isMandatory: boolean,
) {
	if (toCheck == undefined || toCheck == null) {
		if (isMandatory != undefined && isMandatory === true) {
			logError(errorCallback, option + ' option! is mandatory');
		}

		return false;
	}

	if (typeof toCheck === 'string') {
		let found = false;
		var errorMessagePossibilities = '';
		for (let i = 0; i < possibleValueArray.length; i++) {
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
	} else {
		logError(errorCallback, option + ' must be one of: ' + errorMessagePossibilities);
		return false;
	}

	return true;
}

function checkBooleanOption(option, options, errorCallback, isMandatory) {
	const toCheck = options[option];

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
	const toCheck = options[option];

	if (toCheck == undefined || toCheck == null) {
		if (isMandatory != undefined && isMandatory === true) {
			logError(errorCallback, option + ' option is mandatory!');
		}

		return false;
	}

	return true;
}

function checkKeyValueOptions(options, errorCallback, isMandatory) {
	const key = options['key'];
	const value = options['value'];

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
	const fps = options['fps'];

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
	const allowedValues = [
		EventTrackingMode.FULL_TRACKING,
		EventTrackingMode.IGNORE_USER_INTERACTION,
		EventTrackingMode.IGNORE_NAVIGATION_INTERACTION,
		EventTrackingMode.IGNORE_RAGE_CLICKS,
		EventTrackingMode.NO_TRACKING,
	];

	const eventTrackingModeArray = options['eventTrackingModes'];
	let noneFailed = true;

	if (eventTrackingModeArray == undefined || eventTrackingModeArray == null || !Array.isArray(eventTrackingModeArray)) {
		if (isMandatory != undefined && isMandatory === true) {
			logError(errorCallback, 'eventTrackingModes array option is mandatory!');
		}

		return false;
	}

	for (let i = 0; i < eventTrackingModeArray.length; i++) {
		console.log('checkEventTrackingModeArray(): gonna check: ' + eventTrackingModeArray[i]);
		if (
			!checkStringArrayOption(eventTrackingModeArray[i], 'eventTrackingMode', allowedValues, errorCallback, isMandatory)
		) {
			noneFailed = false;
		}
	}

	return noneFailed;
}

// Utility methods

function execWithCallbacks(
	successCallback: SuccessCallback = emptyCallback,
	errorCallback: ErrorCallback = emptyCallback,
	method: string,
	args?: any[],
) {
	cordova.exec(successCallback, errorCallback, SMARTLOOK_PLUGIN, method, args);
}

function logError(errorCallback: ErrorCallback, message: string) {
	errorCallback?.(`${new Error(message).stack}`);
}
