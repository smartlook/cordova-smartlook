#import <Cordova/CDVPlugin.h>

@interface SmartlookPlugin : CDVPlugin

// Setup and life cycle
- (void)setupAndStartRecording:(CDVInvokedUrlCommand*)command;
- (void)setup:(CDVInvokedUrlCommand*)command;
- (void)startRecording:(CDVInvokedUrlCommand*)command;
- (void)stopRecording:(CDVInvokedUrlCommand*)command;
- (void)isRecording:(CDVInvokedUrlCommand*)command;

// Full screen sensitive mode
- (void)startFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command;
- (void)stopFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command;
- (void)isFullscreenSensitiveModeActive:(CDVInvokedUrlCommand*)command;

// User identifier
- (void)setUserIdentifier:(CDVInvokedUrlCommand*)command;

// Tracking
- (void)setEventTrackingMode:(CDVInvokedUrlCommand*)command;
- (void)trackNavigationEvent:(CDVInvokedUrlCommand*)command;
- (void)startTimedCustomEvent:(CDVInvokedUrlCommand*)command;
- (void)trackCustomEvent:(CDVInvokedUrlCommand*)command;

// Event properties
- (void)setGlobalEventProperties:(CDVInvokedUrlCommand*)command;
- (void)setGlobalEventProperty:(CDVInvokedUrlCommand*)command;
- (void)removeGlobalEventProperty:(CDVInvokedUrlCommand*)command;
- (void)removeAllGlobalEventProperties:(CDVInvokedUrlCommand*)command;

// Utilities

@end

