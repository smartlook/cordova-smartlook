#import "SmartlookPlugin.h"
#import <Smartlook/Smartlook.h>

#ifdef DEBUG
#   define DLog(fmt, ...) NSLog((@"Smartlook: %s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
//#   define DLog(fmt, ...) NSLog((@"Smartlook: " fmt), ##__VA_ARGS__);
#else
#   define DLog(...)
#endif

// declare methods that will be implemented in future SDK versions
@interface Smartlook (ForwardDeclarations)
+ (void)setEventTrackingModeTo:(NSString *)eventTractingMode;
+ (void)setRenderingModeTo:(nonnull SLRenderingMode)renderingMode;
@end

@implementation SmartlookPlugin

- (void)reportOKResultForCallbackID:(NSString *)callbackID {
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackID];
}

- (void)raiseExceptionWithMessage:(NSString *)errorMessage forCallbackID:(NSString *)callbackID {
    NSException *exception = [NSException exceptionWithName:@"SmartlookException" reason:errorMessage userInfo:nil];
    @throw exception;
}

- (void)reportException:(NSException *)exception forCallbackID:(NSString *)callbackID {
    DLog(@"exception: %@", exception);
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:exception.description];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackID];
}

- (NSString *)checkFirstArgumentInCommand:(CDVInvokedUrlCommand *)command argName:(NSString *)argName {
    NSString *value = [command argumentAtIndex:0];
    if (value == nil) {
        NSString *errorMessage = [NSString stringWithFormat:@"Smartlook: '%@' must not be null.", argName];
        [self raiseExceptionWithMessage:errorMessage forCallbackID:command.callbackId];
        return nil;
    }
    return [NSString stringWithFormat:@"%@", value];
}

// MARK: - Lifecycle

- (BOOL)internalSetup:(CDVInvokedUrlCommand*)command {
    
    NSString *key = [self checkFirstArgumentInCommand:command argName:@"API key"];
    if (key == nil) {
        return NO;
    }
    
    NSMutableDictionary *options = [NSMutableDictionary new];
    options[SLSetupOptionUseAdaptiveFramerateKey] = @NO;
    
    id fps = [command argumentAtIndex:1];
    if (fps != nil && [fps isKindOfClass:[NSNumber class]]) {
        options[SLSetupOptionFramerateKey] = fps;
    }
    
    [Smartlook setupWithKey:key options:options];
    
    [Smartlook registerWhitelistedObject:[WKWebView class]];
    
    [Smartlook setSessionPropertyValue:@"cordova" forName:@"sdk_build_flavor"];
    
    return YES;
}

- (void)setupAndStartRecording:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setupAndStartRecording`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            if ([self internalSetup:command]) {
                [Smartlook startRecording];
                [self reportOKResultForCallbackID:command.callbackId];
            }
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)setup:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setup`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            if ([self internalSetup:command]) {
                [self reportOKResultForCallbackID:command.callbackId];
            }
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
    
}


- (void)startRecording:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `startRecording`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook startRecording];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
    
}


- (void)stopRecording:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `stopRecording`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook stopRecording];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


- (void)isRecording:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `isRecording`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            BOOL isRecording = [Smartlook isRecording];
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:isRecording];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

// MARK: - Full Screen Sensitive Mode

- (void)startFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `startFullscreenSensitiveMode`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook beginFullscreenSensitiveMode];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


- (void)stopFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `stopFullscreenSensitiveMode`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook endFullscreenSensitiveMode];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


- (void)isFullscreenSensitiveModeActive:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `stopFullscreenSensitiveMode`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            BOOL isActive = [Smartlook isFullscreenSensitiveModeActive];
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:isActive];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

// MARK: - User identifier

- (void)setUserIdentifier:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setUserIdentifier`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *identifier = [self checkFirstArgumentInCommand:command argName:@"User identifier"];
            [Smartlook setUserIdentifier:identifier];
            
            id sessionProperties = [command argumentAtIndex:1];
            for (id key in [sessionProperties allKeys]) {
                NSString *nameString = [NSString stringWithFormat:@"%@", key];
                NSString *valueString = [NSString stringWithFormat:@"%@", sessionProperties[key]];
                [Smartlook setSessionPropertyValue:valueString forName:nameString];
            }
            
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

// MARK: - Tracking
- (void)setEventTrackingMode:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setEventTrackingMode`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            if (![Smartlook respondsToSelector:@selector(setEventTrackingModeTo:)]) {
                [self raiseExceptionWithMessage:@"`setEventTracking` not implemented on iOS yet." forCallbackID:command.callbackId];
            }
            NSString *trackingMode = [self checkFirstArgumentInCommand:command argName:@"Tracking Mode"];
            NSString *smartlookTrackingMode;
            if ([trackingMode isEqualToString:@"full_tracking"]) {
                smartlookTrackingMode = @"event-tracking-mode-full";
            } else if ([trackingMode isEqualToString:@"ignore_user_interaction"]) {
                smartlookTrackingMode = @"event-tracking-mode-ignore-user-interaction";
            } else if ([trackingMode isEqualToString:@"no_tracking"]) {
                smartlookTrackingMode = @"event-tracking-mode-no-tracking";
            } else {
                [self raiseExceptionWithMessage:[NSString stringWithFormat:@"'%@' is not a recognized event tracking mode", trackingMode] forCallbackID:command.callbackId];
            };
            [Smartlook setEventTrackingModeTo:smartlookTrackingMode];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

-(void)trackNavigationEvent:(CDVInvokedUrlCommand *)command {
    DLog(@"entering `trackNavigationEvent`, arguments: %@", [command arguments]);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *identifier = [self checkFirstArgumentInCommand:command argName:@"Controller id"];
            SLNavigationType navigationType = SLNavigationTypeEnter;
            NSString *eventTypeString = [[NSString stringWithFormat:@"%@", [command argumentAtIndex:1]] lowercaseString];
            if ([eventTypeString isEqualToString:@"stop"] || [eventTypeString isEqualToString:@"exit"] ) {
                navigationType = SLNavigationTypeExit;
            }
            [Smartlook trackNavigationEventWithControllerId:identifier type:navigationType];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)startTimedCustomEvent:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `startTimedCustomEvent` arguments:%@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *eventName = [self checkFirstArgumentInCommand:command argName:@"Event name"];
            NSString *eventId = [NSString stringWithFormat:@"%@", [Smartlook startTimedCustomEventWithName:eventName props:[command argumentAtIndex:1]]];;
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:eventId];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)stopTimedCustomEvent:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `stopTimedCustomEvent` arguments:%@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *eventIdString = [self checkFirstArgumentInCommand:command argName:@"Event id"];
            NSUUID *eventId = [[NSUUID alloc] initWithUUIDString:eventIdString];
            if (eventId == nil) {
                [self raiseExceptionWithMessage:[NSString stringWithFormat:@"'%@' is not a valid event id", eventIdString] forCallbackID:command.callbackId];
            }
            [Smartlook trackTimedCustomEventWithEventId:eventId props:[command argumentAtIndex:1]];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)cancelTimedCustomEvent:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `cancelTimedCustomEvent` arguments:%@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *eventIdString = [self checkFirstArgumentInCommand:command argName:@"Event id"];
            NSUUID *eventId = [[NSUUID alloc] initWithUUIDString:eventIdString];
            if (eventId == nil) {
                [self raiseExceptionWithMessage:[NSString stringWithFormat:@"'%@' is not a valid event id", eventIdString] forCallbackID:command.callbackId];
            }
            [Smartlook trackTimedCustomEventCancelWithEventId:eventId reason:[command argumentAtIndex:1] props:[command argumentAtIndex:2]];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)trackCustomEvent:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `trackCustomEvent` arguments:%@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *eventName = [self checkFirstArgumentInCommand:command argName:@"Event name"];
            [Smartlook trackCustomEventWithName:eventName props:[command argumentAtIndex:1]];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}




// MARK: - Event Properties

- (void)setGlobalEventProperties:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setGlobalEventProperties`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            SLPropertyOption options = SLPropertyOptionDefaults;
            id immutable = [command argumentAtIndex:1];
            if ([immutable respondsToSelector:@selector(boolValue)] && [immutable boolValue]) {
                options = options | SLPropertyOptionImmutable;
            }
            id properties = [command argumentAtIndex:0];
            for (id key in [properties allKeys]) {
                NSString *nameString = [NSString stringWithFormat:@"%@", key];
                NSString *valueString = [NSString stringWithFormat:@"%@", properties[key]];
                [Smartlook setGlobalEventPropertyValue:valueString forName:nameString withOptions:options];
            }
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


- (void)setGlobalEventProperty:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setGlobalEventProperty`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            SLPropertyOption options = SLPropertyOptionDefaults;
            id immutable = [command argumentAtIndex:2];
            if ([immutable respondsToSelector:@selector(boolValue)] && [immutable boolValue]) {
                options = options | SLPropertyOptionImmutable;
            }
            NSString *nameString = [NSString stringWithFormat:@"%@", [command argumentAtIndex:0]];
            NSString *valueString = [NSString stringWithFormat:@"%@", [command argumentAtIndex:1]];
            [Smartlook setGlobalEventPropertyValue:valueString forName:nameString withOptions:options];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


- (void)removeGlobalEventProperty:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `removeGlobalEventProperty`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *nameString = [NSString stringWithFormat:@"%@", [command argumentAtIndex:0]];
            [Smartlook removeGlobalEventPropertyForName:nameString];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


- (void)removeAllGlobalEventProperties:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `removeAllGlobalEventProperties`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook clearGlobalEventProperties];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

// MARK: - Utilities

- (void)setReferrer:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `setReferrer` arguments: %@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [self raiseExceptionWithMessage:@"`setReferrer` not available on iOS" forCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)getDashboardSessionUrl:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `getDashboardSessionUrl`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSURL *dashboardURL = [Smartlook getDashboardSessionURL];
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[dashboardURL absoluteString]];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)registerLogListener:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `registerLogListener` arguments: %@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [self raiseExceptionWithMessage:@"`registerLogListener` not available on iOS" forCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)unregisterLogListener:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `unregisterLogListener` arguments: %@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [self raiseExceptionWithMessage:@"`unregisterLogListener` not available on iOS" forCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)setRenderingMode:(CDVInvokedUrlCommand *)command {
    DLog(@"entering `setRenderingMode` arguments: %@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *renderingMode = [self checkFirstArgumentInCommand:command argName:@"renderingMode"];
            if ([Smartlook respondsToSelector:@selector(setRenderingModeTo:)]) {
                NSString *smartlookRenderingMode;
                if ([renderingMode isEqualToString:@"no_rendering"]) {
                    smartlookRenderingMode = @"no-rendering";
                } else if ([renderingMode isEqualToString:@"native"]) {
                    smartlookRenderingMode = SLRenderingModeNative;
                } else {
                    [self raiseExceptionWithMessage:[NSString stringWithFormat:@"`%@` is not a valid rendering mode.", renderingMode] forCallbackID:command.callbackId];
                }
                [Smartlook setRenderingModeTo:smartlookRenderingMode];
            } else {
                if ([renderingMode isEqualToString:@"no_rendering"]) {
                    [Smartlook beginFullscreenSensitiveMode];
                } else if ([renderingMode isEqualToString:@"native"]) {
                    [Smartlook endFullscreenSensitiveMode];
                } else {
                    [self raiseExceptionWithMessage:[NSString stringWithFormat:@"`%@` is not a valid rendering mode.", renderingMode] forCallbackID:command.callbackId];
                }
            }
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


@end
