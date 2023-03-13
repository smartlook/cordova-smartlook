import {
	getGlobalEventProperty,
	putGlobalEventProperty,
	removeGlobalEventProperty,
	RenderingMode,
	reset,
	setFrameRate,
	setReferrer,
	setRenderingMode,
	setUserEmail,
	setUserIdentifier,
	setUserName,
	setWebViewSensitivity,
	SMARTLOOK_FRAMEWORK_PLUGIN_VERSION,
	SMARTLOOK_FRAMEWORK_VERSION,
	start,
	stop,
	trackEvent,
	trackNavigationEnter,
	trackNavigationExit,
	trackSelector,
} from '../src/js/cordova-plugin-smartlook';

const execFn = jest.fn();

// @ts-expect-error - re-assignment not exhaustive enough
window.cordova = {
	exec: execFn,
} as Cordova;

const emptyCallback = function () {
	return;
};

describe('SmartlookPlugin', () => {
	beforeEach(() => {
		execFn.mockClear();
	});

	describe('start', () => {
		it('should call the mock twice', () => {
			start();

			expect(execFn).toHaveBeenCalledTimes(2);
		});

		it('should call setPluginVersion first with plugin info', () => {
			start();

			expect(execFn).toHaveBeenNthCalledWith(
				1,
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'setPluginVersion',
				[SMARTLOOK_FRAMEWORK_PLUGIN_VERSION, SMARTLOOK_FRAMEWORK_VERSION],
			);
		});

		it('should call start as a last call', () => {
			start();

			expect(execFn).toHaveBeenLastCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'start',
				undefined,
			);
		});
	});

	describe('stop', () => {
		it('should be called with correct params', () => {
			stop();

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'stop',
				undefined,
			);
		});
	});

	describe('reset', () => {
		it('should be called with empty params', () => {
			reset();

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'reset',
				undefined,
			);
		});
	});

	describe('checkStringOption arbitrary test', () => {
		it('should fail and throw into error callback when missing mandatory option', () => {
			const props = {
				'test-prop': 'test-value',
			};

			const successCallback = jest.fn();
			const errorCallback = jest.fn();

			// @ts-expect-error - we are testing the error case
			trackEvent({ props: props }, successCallback, errorCallback);

			expect(errorCallback).toHaveBeenCalledWith(new Error('eventName option is mandatory!').message);
		});

		it('should bail out and not call the exec function when missing mandatory option', () => {
			const props = {
				'test-prop': 'test-value',
			};

			const successCallback = jest.fn();
			const errorCallback = jest.fn();

			// @ts-expect-error - we are testing the error case
			trackEvent({ props: props }, successCallback, errorCallback);

			expect(execFn).not.toHaveBeenCalled();
		});
	});

	describe('trackEvent', () => {
		it('should be called with correctly parsed props', () => {
			const eventName = 'test-event';
			const props = {
				'test-prop': 'test-value',
			};

			trackEvent({ eventName: eventName, props: props });

			expect(execFn).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), 'SmartlookPlugin', 'trackEvent', [
				eventName,
				props,
			]);
		});
	});

	describe('trackSelector', () => {
		it('should be called with correctly parsed props', () => {
			const selector = 'test-selector';
			const props = {
				'test-prop': 'test-value',
			};

			trackSelector({ selectorName: selector, props: props });

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'trackSelector',
				[selector, props],
			);
		});
	});

	describe('trackNavigationEnter', () => {
		it('should be called with correctly parsed props', () => {
			const eventName = 'test-event';
			const props = {
				'test-prop': 'test-value',
			};

			trackNavigationEnter({ eventName: eventName, props: props });

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'trackNavigationEnter',
				[eventName, props],
			);
		});
	});

	describe('trackNavigationExit', () => {
		it('should be called with correctly parsed props', () => {
			const eventName = 'test-event';
			const props = {
				'test-prop': 'test-value',
			};

			trackNavigationExit({ eventName: eventName, props: props });

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'trackNavigationExit',
				[eventName, props],
			);
		});
	});

	describe('setReferrer', () => {
		it('should be called with correctly parsed props', () => {
			const referrer = 'test-referrer';
			const source = 'test-source';

			setReferrer({ referrer: referrer, source: source });

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'setReferrer',
				[referrer, source],
			);
		});
	});

	describe('putGlobalEventProperty', () => {
		it('should be called with correct value', () => {
			const propertyName = 'test-property';
			const value = 'test-value';

			putGlobalEventProperty({ propertyName: propertyName, value: value });
			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'putStringEventProperty',
				[propertyName, value],
			);
		});
	});

	describe('getGlobalEventProperty', () => {
		it('should be called with correct value', () => {
			const propertyName = 'test-property';
			const successCallback = jest.fn();

			getGlobalEventProperty({ propertyName: propertyName }, successCallback, emptyCallback);
			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'getStringEventProperty',
				[propertyName],
			);
		});
	});

	describe('removeGlobalEventProperty', () => {
		it('should be called with correct value', () => {
			const propertyName = 'test-property';
			const successCallback = jest.fn();

			removeGlobalEventProperty({ propertyName: propertyName }, successCallback, emptyCallback);
			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'removeStringEventProperty',
				[propertyName],
			);
		});
	});

	describe('setUserIdentifier', () => {
		it('should be called with an identifier', () => {
			const identifier = 'test-identifier';

			setUserIdentifier({ identifier: identifier });
			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'setUserIdentifier',
				[identifier],
			);
		});
	});

	describe('setUserName', () => {
		it('should be called with the name', () => {
			const userName = 'test-name';

			setUserName({ name: userName });
			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'setUserName',
				[userName],
			);
		});
	});

	describe('setUserEmail', () => {
		it('should be called with the email', () => {
			const userEmail = 'test@test.com';

			setUserEmail({ email: userEmail });
			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'setUserEmail',
				[userEmail],
			);
		});
	});

	describe('setFrameRate', () => {
		it('should set the framerate with correct range passed', () => {
			const frameRate = 5;
			setFrameRate({ frameRate: frameRate });

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'setFrameRate',
				[frameRate],
			);
		});

		it('should bail out and throw an error when frameRate is out of range', () => {
			const frameRate = 35;
			const errorCallback = jest.fn();

			setFrameRate({ frameRate: frameRate }, emptyCallback, errorCallback);

			expect(errorCallback).toHaveBeenCalledWith(new Error('fps not set, must be between 1 and 10 fps!').message);
		});

		it('should bail out and throw an error when frameRate is not a number', () => {
			const frameRate = 'test';
			const errorCallback = jest.fn();

			// @ts-expect-error - we are testing the error case
			setFrameRate({ frameRate: frameRate }, emptyCallback, errorCallback);

			expect(errorCallback).toHaveBeenCalledWith(new Error('fps not set, must be a number!').message);
		});
	});

	describe('checkBooleanOption arbitrary test', () => {
		it('should bail out and throw an error when a mandatory boolean option is not present', () => {
			const errorCallback = jest.fn();

			// @ts-expect-error - we are testing the error case
			setWebViewSensitivity({}, emptyCallback, errorCallback);

			expect(errorCallback).toHaveBeenCalledWith(new Error('isSensitive option is mandatory!').message);
		});
		it('should bail out and throw an error when a mandatory boolean option is not a boolean', () => {
			const errorCallback = jest.fn();

			// @ts-expect-error - we are testing the error case
			setWebViewSensitivity({ isSensitive: 'test' }, emptyCallback, errorCallback);

			expect(errorCallback).toHaveBeenCalledWith(new Error('isSensitive must be boolean!').message);
		});
	});

	describe('setRenderingMode', () => {
		it('should bail out and throw an error when invalid RenderingMode is set', () => {
			const errorCallback = jest.fn();
			const renderingMode = 9;

			setRenderingMode({ renderingMode: renderingMode }, emptyCallback, errorCallback);
			expect(errorCallback).toHaveBeenCalledWith(new Error('Invalid rendering mode 9 set!').message);
		});

		it('should set the rendering mode with correct value passed', () => {
			const renderingMode = RenderingMode.WIREFRAME;

			setRenderingMode({ renderingMode: renderingMode });

			expect(execFn).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Function),
				'SmartlookPlugin',
				'setRenderingMode',
				[renderingMode],
			);
		});
	});
});
