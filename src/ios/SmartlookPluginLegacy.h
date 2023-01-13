#import <Cordova/CDVPlugin.h>

@interface SmartlookPlugin : CDVPlugin

// Setup and life cycle
- (void)setPluginVersion:(CDVInvokedUrlCommand*)command;
- (void)testSdk:(CDVInvokedUrlCommand*)command;

- (void)setupAndStartRecording:(CDVInvokedUrlCommand*)command;
- (void)setup:(CDVInvokedUrlCommand*)command;
- (void)startRecording:(CDVInvokedUrlCommand*)command;
- (void)stopRecording:(CDVInvokedUrlCommand*)command;
- (void)isRecording:(CDVInvokedUrlCommand*)command;

- (void)resetSession:(CDVInvokedUrlCommand*)command;

// User identifier
- (void)setUserIdentifier:(CDVInvokedUrlCommand*)command;

// Tracking
- (void)setEventTrackingMode:(CDVInvokedUrlCommand*)command;

- (void)trackNavigationEvent:(CDVInvokedUrlCommand*)command;

- (void)startTimedCustomEvent:(CDVInvokedUrlCommand*)command;
- (void)stopTimedCustomEvent:(CDVInvokedUrlCommand*)command;
- (void)cancelTimedCustomEvent:(CDVInvokedUrlCommand*)command;

- (void)trackCustomEvent:(CDVInvokedUrlCommand*)command;

// Event properties
- (void)setGlobalEventProperties:(CDVInvokedUrlCommand*)command;
- (void)setGlobalEventProperty:(CDVInvokedUrlCommand*)command;
- (void)removeGlobalEventProperty:(CDVInvokedUrlCommand*)command;
- (void)removeAllGlobalEventProperties:(CDVInvokedUrlCommand*)command;

// Integrationa
- (void)getDashboardSessionUrl:(CDVInvokedUrlCommand*)command;
- (void)getDashboardVisitorUrl:(CDVInvokedUrlCommand*)command;

- (void)registerIntegrationListener:(CDVInvokedUrlCommand*)command;
- (void)unregisterIntegrationListener:(CDVInvokedUrlCommand*)command;

// Utilities

- (void)setReferrer:(CDVInvokedUrlCommand*)command;

- (void)registerLogListener:(CDVInvokedUrlCommand*)command;
- (void)unregisterLogListener:(CDVInvokedUrlCommand*)command;

- (void)setRenderingMode:(CDVInvokedUrlCommand*)command;

@end
