export declare enum Command {
    TEST_SDK = "testSdk"
}
export interface Dictionary<T> {
    [key: string]: T;
}
export type SuccessCallback = (value: any) => void;
export type ErrorCallback = (message: string) => void;
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
export declare function testSdk(successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
