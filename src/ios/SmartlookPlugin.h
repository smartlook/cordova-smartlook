#import <Cordova/CDVPlugin.h>

@interface SmartlookPlugin : CDVPlugin

- (void)setupAndStartRecording:(CDVInvokedUrlCommand*)command;
- (void)setup:(CDVInvokedUrlCommand*)command;
- (void)startRecording:(CDVInvokedUrlCommand*)command;
- (void)stopRecording:(CDVInvokedUrlCommand*)command;
- (void)isRecording:(CDVInvokedUrlCommand*)command;
- (void)startFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command;
- (void)stopFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command;
- (void)isFullscreenSensitiveModeActive:(CDVInvokedUrlCommand*)command;
- (void)setUserIdentifier:(CDVInvokedUrlCommand*)command;
- (void)startTimedCustomEvent:(CDVInvokedUrlCommand*)command;
- (void)trackCustomEvent:(CDVInvokedUrlCommand*)command;
- (void)setGlobalEventProperties:(CDVInvokedUrlCommand*)command;
- (void)setGlobalEventProperty:(CDVInvokedUrlCommand*)command;
- (void)removeGlobalEventProperty:(CDVInvokedUrlCommand*)command;
- (void)removeAllGlobalEventProperties:(CDVInvokedUrlCommand*)command;

@end

