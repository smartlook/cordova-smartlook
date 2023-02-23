const { cordova } = window;

// Plugin name
const SMARTLOOK_PLUGIN = 'SmartlookPlugin';

// Smartlook framework info
const SMARTLOOK_FRAMEWORK_VERSION = '-';
const SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = '1.9.5';

// API methods names
export enum Command {
	START = 'start',
	STOP = 'stop',
	RESET = 'reset',
	TEST_SDK = 'testSdk',
	SET_PROJECT_KEY = 'setProjectKey',
	TRACK_EVENT = 'trackEvent',
	TRACK_SELECTOR = 'trackSelector',
	TRACK_NAVIGATION_ENTER = 'trackNavigationEnter',
	TRACK_NAVIGATION_EXIT = 'trackNavigationExit',
	SET_REFERRER = 'setReferrer',
	PUT_STRING_EVENT_PROPERTY = 'putStringEventProperty',
	GET_STRING_EVENT_PROPERTY = 'getStringEventProperty',
	REMOVE_STRING_EVENT_PROPERTY = 'removeStringEventProperty',
	CLEAR_EVENT_PROPERTIES = 'clearEventProperties',
	SET_USER_IDENTIFIER = 'setUserIdentifier',
	SET_USER_NAME = 'setUserName',
	SET_USER_EMAIL = 'setUserEmail',
	SET_USER_PROPERTY = 'setUserProperty',
	GET_USER_PROPERTY = 'getUserProperty',
	REMOVE_USER_PROPERTY = 'removeUserProperty',
	OPEN_NEW_USER = 'openNewUser',
	OPEN_NEW_SESSION = 'openNewSession',
	GET_USER_URL = 'getUserUrl',
	GET_SESSION_URL = 'getSessionUrl',
	GET_SESSION_URL_WITH_TIMESTAMP = 'getSessionUrlWithTimestamp',
	SET_RELAY_PROXY_HOST = 'setRelayProxyHost',
	GET_FRAMERATE = 'getFrameRate',
	SET_FRAMERATE = 'setFrameRate',
	SET_JOB_UPLOAD_ENABLED = 'setJobUploadEnabled',
	SET_ADAPTIVE_FRAMERATE_ENABLED = 'setAdaptiveFrameRateEnabled',
	GET_ADAPTIVE_FRAMERATE_ENABLED = 'getAdaptiveFrameRateEnabled',
	SET_SURFACE_CAPTURE_EMABLED = 'SurfaceCaptureEnabled',
	GET_SURFACE_CAPTURE_EMABLED = 'getSurfaceCaptureEnabled',
	EVENT_TRACKING_ENABLE_ALL = 'eventTrackingEnableAll',
	EVENT_TRACKING_DISABLE_ALL = 'eventTrackingDisableAll',
	IS_RECORDING = 'isRecording',
	GET_PROJECT_KEY = 'getProjectKey',
	SET_EVENT_TRACKING_INTERACTION_USER_STATUS = 'setEventTrackingInteractionUserStatus',
	SET_EVENT_TRACKING_INTERACTION_RAGE_CLICK_STATUS = 'setEventTrackingInteractionRageClickStatus',
	RESTORE_DEFAULT = 'restoreDefault',
	SET_WEB_VIEW_SENSITIVITY = 'setWebViewSensitivity',
	GET_RENDERING_MODE = 'getRenderingMode',
	GET_RECORDING_STATUS = 'getRecordingStatus',
	GET_STATE_FRAME_RATE = 'getStateFrameRate',
	SET_RENDERING_MODE = 'setRenderingMode',
	REGISTER_USER_URL_CHANGED_LISTENER = 'registerUserUrlChangedListener',
	REGISTER_SESSION_URL_CHANGED_LISTENER = 'registerSessionUrlChangedListener',
	REGISTER_RENDERING_MODE_CHANGED_LISTENER = 'registerRenderingModeChangedListener',
	REGISTER_RECORDING_STATUS_CHANGED_LISTENER = 'registerRecordingStatusChangedListener',
	REMOVE_USER_URL_CHANGED_LISTENER = 'removeUserUrlChangedListener',
	REMOVE_SESSION_URL_CHANGED_LISTENER = 'removeSessionUrlChangedListener',
	REMOVE_RENDERING_MODE_CHANGED_LISTENER = 'removeRenderingModeChangedListener',
	REMOVE_RECORDING_STATUS_CHANGED_LISTENER = 'removeRecordingStatusChangedListener',
	SET_RECORDING_MASK = 'setRecordingMask',
	ENABLE_LOGS = 'enableLogs',
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

export type SuccessCallback<TValue> = (value: TValue) => void;
export type ErrorCallback = (message: string) => void;

export type RecordingMaskType = 'COVERING' | 'ERASING';

export enum RenderingMode {
  NO_RENDERING = 0,
  NATIVE = 1,
  WIREFRAME = 2,
}

export enum RecordingStatus {
  Recording = 0,
  NotStarted = 1,
  Stopped = 2,
  BellowMinSdkVersion = 3,
  ProjectLimitReached = 4,
  StorageLimitReached = 5,
  InternalError = 6,
  NotRunningInSwiftUIContext = 7,
  UnsupportedPlatform = 8,
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
export interface Smartlook {
	sdkTest(successCallback: SuccessCallback<boolean>, errorCallback: ErrorCallback): void;
	start(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	stop(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	reset(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	trackEvent(
		options: { eventName: string; props?: Record<string, string> },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	trackSelector(
		options: { selectorName: string; props?: Record<string, string> },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	trackNavigationEnter(
		options: { eventName: string; props?: Record<string, string> },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	trackNavigationExit(
		options: { eventName: string; props?: Record<string, string> },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	setReferrer(
		options: { referrer: string; source: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	putGlobalEventProperty(
		options: { propertyName: string; value: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	getGlobalEventProperty(
		options: { propertyName: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	removeGlobalEventProperty(
		options: { propertyName: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	clearGlobalEventProperties(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	setUserIdentifier(
		options: { identifier: string },
		successCallback?: SuccessCallback<boolean>,
		errorCallback?: ErrorCallback,
	): void;
	setUserName(
		options: { name: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	setUserEmail(
		options: { email: string },
		successCallback?: SuccessCallback<boolean>,
		errorCallback?: ErrorCallback,
	): void;
	setUserProperty(
		options: { propertyName: string; value: string },
		successCallback?: SuccessCallback<boolean>,
		errorCallback?: ErrorCallback,
	): void;
	getUserProperty(
		options: { propertyName: string },
		successCallback: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	removeUserProperty(
		options: { propertyName: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	openNewUser(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	openNewSession(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	getUserUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	getSessionUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	getSessionUrlWithTimestamp(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	setRelayProxyHost(
		options: { relaxyProxyHost: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	setFrameRate(
		options: { frameRate: number },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	getFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void;
	setJobUploadEnabled(
		options: { isEnabled: boolean },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	setAdaptiveFrameRateEnabled(
		options: { isEnabled: boolean },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	getAdaptiveFrameRateEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
	setSurfaceCaptureEnabled(
		options: { isEnabled: boolean },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	getSurfaceCaptureEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
	eventTrackingEnableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	eventTrackingDisableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	setProjectKey(
		options: { key: string },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	isRecording(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
	getProjectKey(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	setEventTrackingInteractionUserStatus(
		options: { isEnabled: boolean },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	setEventTrackingInteractionRageClickStatus(
		options: { isEnabled: boolean },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	restoreDefault(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback): void;
	setWebViewSensitivity(
		options: { isSensitive: boolean },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	getRenderingMode(successCallback: SuccessCallback<RenderingMode>, errorCallback?: ErrorCallback): void;
	getRecordingStatus(successCallback: SuccessCallback<RecordingStatus>, errorCallback?: ErrorCallback): void;
	getStateFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): Promise<number>;
	setRenderingMode(
		options: { renderingMode: RenderingMode },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	registerUserUrlChangedListener(
		options: { userUrlChangedCallback: (userUrl: string) => void },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	registerSessionUrlChangedListener(
		options: { sessionUrlChangedCallback: (sessionUrl: string) => void },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	registerRenderingModeChangedListener(
		options: { renderingModeChangedCallback: (renderingMode: RenderingMode) => void },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	registerRecordingStatusChangedListener(
		options: { recordingStatusChangedCallback: (recordingStatus: RecordingStatus) => void },
		successCallback?: SuccessCallback<string>,
		errorCallback?: ErrorCallback,
	): void;
	removeUserUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
	removeSessionUrlChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
	removeRenderingModeChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
	removeRecordingStatusChangedListener(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
	setRecordingMask(
		options: {
			recordingMaskList: Array<{
				maskType: RecordingMaskType;
				maskRect: { left: number; top: number; width: number; height: number };
			}>;
		},
		successCallback?: SuccessCallback<boolean>,
		errorCallback?: ErrorCallback,
	): void;
	enableLogs(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void;
}

export function sdkTest(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void {
	execWithCallbacks(Command.TEST_SDK, successCallback, errorCallback, []);
}

// Internal setup logic
function setupAndRegisterBridgeInterface(): void {
  let args = [];

  args.push(SMARTLOOK_FRAMEWORK_PLUGIN_VERSION);
  args.push(SMARTLOOK_FRAMEWORK_VERSION);
  execWithCallbacks(SET_PLUGIN_VERSION, emptyCallback, emptyCallback, args);
}

export function start(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void {
  setupAndRegisterBridgeInterface();
	execWithCallbacks(Command.START, successCallback, errorCallback);
}

export function stop(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void {
	execWithCallbacks(Command.STOP, successCallback, errorCallback);
}

export function reset(successCallback?: SuccessCallback<boolean>, errorCallback?: ErrorCallback): void {
	execWithCallbacks(Command.RESET, successCallback, errorCallback);
}

export function trackEvent(
	options: { eventName: string; props?: Record<string, string> },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('eventName', options, true, errorCallback)) {
		return;
	}

	args.push(options['eventName']);
	args.push(options['props']);
	execWithCallbacks(Command.TRACK_EVENT, successCallback, errorCallback, args);
}

export function trackSelector(
	options: { selectorName: string; props?: Record<string, string> },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('selectorName', options, true, errorCallback)) {
		return;
	}

	args.push(options['selectorName']);
	args.push(options['props']);
	execWithCallbacks(Command.TRACK_SELECTOR, successCallback, errorCallback, args);
}

export function trackNavigationEnter(
	options: { eventName: string; props?: Record<string, string> },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('eventName', options, true, errorCallback)) {
		return;
	}

	args.push(options['eventName']);
	args.push(options['props']);
	execWithCallbacks(Command.TRACK_NAVIGATION_ENTER, successCallback, errorCallback, args);
}

export function trackNavigationExit(
	options: { eventName: string; props?: Record<string, string> },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('eventName', options, true, errorCallback)) {
		return;
	}

	args.push(options['eventName']);
	args.push(options['props']);
	execWithCallbacks(Command.TRACK_NAVIGATION_EXIT, successCallback, errorCallback, args);
}

export function setReferrer(
	options: { referrer: string; source: string },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (
		!checkStringOption('referrer', options, true, errorCallback) ||
		!checkStringOption('source', options, true, errorCallback)
	) {
		return;
	}

	args.push(options['referrer']);
	args.push(options['source']);
	execWithCallbacks(Command.SET_REFERRER, successCallback, errorCallback, args);
}

export function putGlobalEventProperty(
	options: { propertyName: string; value: string },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (
		!checkStringOption('propertyName', options, true, errorCallback) ||
		!checkStringOption('value', options, true, errorCallback)
	) {
		return;
	}

	args.push(options['propertyName']);
	args.push(options['value']);
	execWithCallbacks(Command.PUT_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}

export function getGlobalEventProperty(
	options: { propertyName: string },
	successCallback: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('propertyName', options, true, errorCallback)) {
		return;
	}

	args.push(options['propertyName']);
	execWithCallbacks(Command.GET_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}

export function removeGlobalEventProperty(
	options: { propertyName: string },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('propertyName', options, true, errorCallback)) {
		return;
	}

	args.push(options['propertyName']);
	execWithCallbacks(Command.REMOVE_STRING_EVENT_PROPERTY, successCallback, errorCallback, args);
}

export function clearGlobalEventProperties(successCallback: SuccessCallback<boolean>, errorCallback: ErrorCallback): void {
	execWithCallbacks(Command.CLEAR_EVENT_PROPERTIES, successCallback, errorCallback);
}

export function setUserIdentifier(
	options: { identifier: string },
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];

	args.push(options['identifier']);
	execWithCallbacks(Command.SET_USER_IDENTIFIER, successCallback, errorCallback, args);
}

export function setUserName(
	options: { name: string },
	successCallback: SuccessCallback<boolean>,
	errorCallback: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('name', options, true, errorCallback)) {
		return;
	}

	args.push(options['name']);
	execWithCallbacks(Command.SET_USER_NAME, successCallback, errorCallback, args);
}

export function setUserEmail(
	options: { email: string },
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!checkStringOption('email', options, true, errorCallback)) {
		return;
	}

	args.push(options['email']);
	execWithCallbacks(Command.SET_USER_EMAIL, successCallback, errorCallback, args);
}

export function setUserProperty(
	options: { propertyName: string; value: string },
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (
		!checkStringOption('propertyName', options, true, errorCallback) ||
		!checkStringOption('value', options, true, errorCallback)
	) {
		return;
	}

	args.push(options['propertyName']);
	args.push(options['value']);
	execWithCallbacks(Command.SET_USER_PROPERTY, successCallback, errorCallback, args);
}

export function getUserProperty(
	options: { propertyName: string },
	successCallback: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkStringOption('propertyName', options, true, errorCallback)) {
		return;
	}

	args.push(options['propertyName']);
	execWithCallbacks(Command.GET_USER_PROPERTY, successCallback, errorCallback, args);
}

export function removeUserProperty(
	options: { propertyName: string },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkStringOption('propertyName', options, true, errorCallback)) {
		return;
	}

	args.push(options['propertyName']);
	execWithCallbacks(Command.REMOVE_USER_PROPERTY, successCallback, errorCallback, args);
}

export function openNewUser(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.OPEN_NEW_USER, successCallback, errorCallback);
}

export function openNewSession(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.OPEN_NEW_SESSION, successCallback, errorCallback);
}

export function getUserUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.GET_USER_URL, successCallback, errorCallback);
}

export function getSessionUrl(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.GET_SESSION_URL, successCallback, errorCallback);
}

export function getSessionUrlWithTimestamp(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.GET_SESSION_URL_WITH_TIMESTAMP, successCallback, errorCallback);
}

export function setRelayProxyHost(
	options: { relayProxyHost: string },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkStringOption('relayProxyHost', options, true, errorCallback)) {
		return;
	}

	args.push(options['relayProxyHost']);
	execWithCallbacks(Command.SET_RELAY_PROXY_HOST, successCallback, errorCallback, args);
}

export function setFrameRate(
	options: { frameRate: number },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkFpsOption(options, true, errorCallback)) {
		return;
	}

	args.push(options['frameRate']);
	execWithCallbacks(Command.SET_FRAMERATE, successCallback, errorCallback, args);
}

export function getFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.GET_FRAMERATE, successCallback, errorCallback);
}

export function setJobUploadEnabled(
	options: { isEnabled: boolean },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
		return;
	}

	args.push(options['isEnabled']);
	execWithCallbacks(Command.SET_RELAY_PROXY_HOST, successCallback, errorCallback, args);
}

export function setAdaptiveFrameRateEnabled(
	options: { isEnabled: boolean },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
		return;
	}

	args.push(options['isEnabled']);
	execWithCallbacks(Command.SET_ADAPTIVE_FRAMERATE_ENABLED, successCallback, errorCallback, args);
}

export function getAdaptiveFrameRateEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.GET_ADAPTIVE_FRAMERATE_ENABLED, successCallback, errorCallback);
}

export function setSurfaceCaptureEnabled(
	options: { isEnabled: boolean },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
		return;
	}

	args.push(options['isEnabled']);
	execWithCallbacks(Command.SET_SURFACE_CAPTURE_EMABLED, successCallback, errorCallback, args);
}

export function getSurfaceCaptureEnabled(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.GET_SURFACE_CAPTURE_EMABLED, successCallback, errorCallback);
}

export function eventTrackingEnableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.EVENT_TRACKING_ENABLE_ALL, successCallback, errorCallback);
}

export function eventTrackingDisableAll(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.EVENT_TRACKING_ENABLE_ALL, successCallback, errorCallback);
}

export function setProjectKey(
	options: { key: string },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
  // TODO log how many times this happens not to bottleneck
  setupAndRegisterBridgeInterface();

	let args = [];
	if (!checkStringOption('key', options, true, errorCallback)) {
		return;
	}

	args.push(options['key']);
	execWithCallbacks(Command.SET_PROJECT_KEY, successCallback, errorCallback, args);
}

export function isRecording(successCallback: SuccessCallback<boolean>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.IS_RECORDING, successCallback, errorCallback);
}

export function getProjectKey(successCallback: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.GET_PROJECT_KEY, successCallback, errorCallback);
}

export function setEventTrackingInteractionUserStatus(
	options: { isEnabled: boolean },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
		return;
	}

	args.push(options['isEnabled']);
	execWithCallbacks(Command.SET_EVENT_TRACKING_INTERACTION_USER_STATUS, successCallback, errorCallback, args);
}

export function setEventTrackingInteractionRageClickStatus(
	options: { isEnabled: boolean },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkBooleanOption('isEnabled', options, true, errorCallback)) {
		return;
	}

	args.push(options['isEnabled']);
	execWithCallbacks(Command.SET_EVENT_TRACKING_INTERACTION_RAGE_CLICK_STATUS, successCallback, errorCallback, args);
}

export function restoreDefault(successCallback?: SuccessCallback<string>, errorCallback?: ErrorCallback) {
	execWithCallbacks(Command.RESTORE_DEFAULT, successCallback, errorCallback);
}

export function setWebViewSensitivity(
	options: { isSensitive: boolean },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
) {
	let args = [];
	if (!checkBooleanOption('isSensitive', options, true, errorCallback)) {
		return;
	}

	args.push(options['isSensitive']);
	execWithCallbacks(Command.SET_WEB_VIEW_SENSITIVITY, successCallback, errorCallback, args);
}

export function getRenderingMode(successCallback: SuccessCallback<RenderingMode>, errorCallback?: ErrorCallback): void {
  const renderingModeCallback = (renderingMode: number) => {
    const renderingModeTyped = renderingModeFromNumber(renderingMode);
    successCallback(renderingModeTyped);
  };

	execWithCallbacks(Command.GET_RENDERING_MODE, renderingModeCallback, errorCallback);
}

export function getRecordingStatus(successCallback: SuccessCallback<RecordingStatus>, errorCallback?: ErrorCallback): void {
  const recordingStatusCallback = (recordingStatus: number) => {
    const renderingModeTyped = recordingStatusFromNumber(recordingStatus);
    successCallback(renderingModeTyped);
  };

	execWithCallbacks(Command.GET_RECORDING_STATUS, recordingStatusCallback, errorCallback);
}

export function getStateFrameRate(successCallback: SuccessCallback<number>, errorCallback?: ErrorCallback): void {
	execWithCallbacks(Command.GET_STATE_FRAME_RATE, successCallback, errorCallback);
}

export function setRenderingMode(
	options: { renderingMode: RenderingMode },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	let args = [];
	if (!(options['renderingMode'] in RenderingMode)) {
		return;
	}

	args.push(options['renderingMode']);
	execWithCallbacks(Command.SET_WEB_VIEW_SENSITIVITY, successCallback, errorCallback, args);
}

export function registerUserUrlChangedListener(
	options: { userUrlChangedCallback: (userUrl: string) => void },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	const integrationCallback = (url: string) => {
		const userUrlChangedCallback = options['userUrlChangedCallback'];

		if (url != undefined && url.length > 0) {
			userUrlChangedCallback(url);
		}
	};

	execWithCallbacks(Command.REGISTER_USER_URL_CHANGED_LISTENER, integrationCallback, errorCallback);
	successCallback?.('');
}

export function registerSessionUrlChangedListener(
	options: { sessionUrlChangedCallback: (sessionUrl: string) => void },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	const integrationCallback = (url: string) => {
		const sessionUrlChangedCallback = options['sessionUrlChangedCallback'];

		if (url != undefined && url.length > 0) {
			sessionUrlChangedCallback(url);
		}
	};

	execWithCallbacks(Command.REGISTER_SESSION_URL_CHANGED_LISTENER, integrationCallback, errorCallback);
	successCallback?.('');
}

export function registerRenderingModeChangedListener(
	options: { renderingModeChangedCallback: (renderingMode: string) => void },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	const integrationCallback = (callbackData: Record<string, string>) => {
		const renderingModeChangedCallback = options['renderingModeChangedCallback'];

		if (
			callbackData != undefined &&
			callbackData['renderingMode'] != undefined &&
			callbackData['renderingMode'].length > 0
		) {
			renderingModeChangedCallback(callbackData['renderingMode']);
		}
	};

	execWithCallbacks(Command.REGISTER_RENDERING_MODE_CHANGED_LISTENER, integrationCallback, errorCallback);
	successCallback?.('');
}

export function registerRecordingStatusChangedListener(
	options: { recordingStatusChangedCallback: (recordingStatus: string) => void },
	successCallback?: SuccessCallback<string>,
	errorCallback?: ErrorCallback,
): void {
	const integrationCallback = (callbackData: Record<string, string>) => {
		const renderingModeChangedCallback = options['recordingStatusChangedCallback'];

		if (
			callbackData != undefined &&
			callbackData['recordingStatus'] != undefined &&
			callbackData['recordingStatus'].length > 0
		) {
			renderingModeChangedCallback(callbackData['recordingStatus']);
		}
	};

	execWithCallbacks(Command.REGISTER_RECORDING_STATUS_CHANGED_LISTENER, integrationCallback, errorCallback);
	successCallback?.('');
}

export function removeUserUrlChangedListener(
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
): void {
	execWithCallbacks(Command.REMOVE_USER_URL_CHANGED_LISTENER, successCallback, errorCallback);
}

export function removeSessionUrlChangedListener(
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
): void {
	execWithCallbacks(Command.REMOVE_SESSION_URL_CHANGED_LISTENER, successCallback, errorCallback);
}

export function removeRenderingModeChangedListener(
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
): void {
	execWithCallbacks(Command.REMOVE_RENDERING_MODE_CHANGED_LISTENER, successCallback, errorCallback);
}

export function removeRecordingStatusChangedListener(
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
): void {
	execWithCallbacks(Command.REMOVE_RECORDING_STATUS_CHANGED_LISTENER, successCallback, errorCallback);
}

export function setRecordingMask(
	options: {
		recordingMaskList: Array<{
			maskType: RecordingMaskType;
			maskRect: { left: number; top: number; width: number; height: number };
		}>;
	},
	successCallback?: SuccessCallback<boolean>,
	errorCallback?: ErrorCallback,
): void {
	const args = options['recordingMaskList'];
	if (args === undefined || args === null) {
		logError('Recording mask list cannot be null or undefined!', errorCallback);
	}

	execWithCallbacks(Command.SET_RECORDING_MASK, successCallback, errorCallback, args);
}

export function enableLogs(successCallback: SuccessCallback<boolean>, errorCallback: ErrorCallback): void {
	execWithCallbacks(Command.ENABLE_LOGS, successCallback, errorCallback);
}

function execWithCallbacks<T>(
	method: string,
	successCallback: SuccessCallback<T> = emptyCallback,
	errorCallback: ErrorCallback = emptyCallback,
	args?: any[],
) {
	cordova.exec(successCallback, errorCallback, SMARTLOOK_PLUGIN, method, args);
}

function logError(message: string, errorCallback?: ErrorCallback) {
	errorCallback?.(`${new Error(message).stack}`);
}

function checkStringOption(
	option: string,
	options: Record<any, any>,
	isMandatory: boolean,
	errorCallback?: ErrorCallback,
) {
	const toCheck = options[option];

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

function checkBooleanOption(
	option: string,
	options: Record<any, any>,
	isMandatory: boolean,
	errorCallback?: ErrorCallback,
) {
	const toCheck = options[option];

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

function checkFpsOption(options: Record<any, any>, isMandatory: boolean, errorCallback?: ErrorCallback) {
	const fps = options['frameRate'];

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

function renderingModeFromNumber(renderingMode:number): RenderingMode {
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

function recordingStatusFromNumber(recordingStatus: number): RecordingStatus {
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
