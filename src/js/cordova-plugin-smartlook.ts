const { cordova } = window;

// Plugin name
const SMARTLOOK_PLUGIN = 'SmartlookPlugin';

// Smartlook framework info
const SMARTLOOK_FRAMEWORK = 'CORDOVA';
const SMARTLOOK_FRAMEWORK_VERSION = '-';
const SMARTLOOK_FRAMEWORK_PLUGIN_VERSION = '1.9.5';

// API methods names
export enum Command {
  TEST_SDK = 'testSdk',
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

export type SuccessCallback = (value: any) => void;
export type ErrorCallback = (message: string) => void;

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
  sdkTest(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
}

export function testSdk(successCallback: SuccessCallback, errorCallback: ErrorCallback) {
	execWithCallbacks(successCallback, errorCallback, Command.TEST_SDK, []);
}

function execWithCallbacks(
	successCallback: SuccessCallback = emptyCallback,
	errorCallback: ErrorCallback = emptyCallback,
	method: string,
	args?: any[],
) {
	cordova.exec(successCallback, errorCallback, SMARTLOOK_PLUGIN, method, args);
}
