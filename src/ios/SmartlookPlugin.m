#import "SmartlookPlugin.h"
#import <Smartlook/Smartlook.h>
#import <WebKit/WebKit.h>

#ifdef DEBUG
//#   define DLog(fmt, ...) NSLog((@"Smartlook: %s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
//#   define DLog(fmt, ...) NSLog((@"Smartlook: " fmt), ##__VA_ARGS__);
#   define DLog(...)
#else
#   define DLog(...)
#endif

@implementation SmartlookPlugin

NSDictionary *cordovaEventTrackingModeToNative;
NSDictionary *nativeEventTrackingModeToCordova;

NSDictionary *cordovaRenderingModeToNative;
NSDictionary *nativeRenderingModeToCordova;

- (void)initializeEnumConversionTables {
    cordovaEventTrackingModeToNative = @{
        @"full_tracking"                 : SLEventTrackingModeFullTracking,
        @"ignore_user_interaction"       : SLEventTrackingModeIgnoreUserInteractionEvents,
        @"ignore_navigation_interaction" : SLEventTrackingModeIgnoreNavigationInteractionEvents,
        @"ignore_rage_clicks"            : SLEventTrackingModeIgnoreRageClickEvents,
        @"no_tracking"                   : SLEventTrackingModeNoTracking
    };
    nativeEventTrackingModeToCordova = @{
        SLEventTrackingModeFullTracking                      : @"full_tracking",
        SLEventTrackingModeIgnoreUserInteractionEvents       : @"ignore_user_interaction",
        SLEventTrackingModeIgnoreNavigationInteractionEvents : @"ignore_navigation_interaction",
        SLEventTrackingModeIgnoreRageClickEvents             : @"ignore_rage_clicks",
        SLEventTrackingModeNoTracking                        : @"no_tracking"
    };
    cordovaRenderingModeToNative = @{
        @"native"       : SLRenderingModeNative,
        @"no_rendering" : SLRenderingModeNoRendering,
    };
    nativeRenderingModeToCordova = @{
        SLRenderingModeNative      : @"native",
        SLRenderingModeNoRendering : @"no_rendering"
    };
}


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

static NSString *__smartlookPluginVersion = @"unknown";

- (void)setPluginVersion:(CDVInvokedUrlCommand*)command {
    DLog(@"setPluginVersion: %@", [command arguments]);
    __smartlookPluginVersion = [command argumentAtIndex:2];
}

- (BOOL)internalSetup:(CDVInvokedUrlCommand*)command {
    
    [self initializeEnumConversionTables];
    
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

    id renderingMode = [command argumentAtIndex:2];
    if ([renderingMode respondsToSelector:@selector(isEqualToString:)]) {
        SLRenderingMode smartlookRenderingMode = cordovaRenderingModeToNative[renderingMode];
        if (smartlookRenderingMode != nil) {
            options[SLSetupOptionRenderingModeKey] = smartlookRenderingMode;
        }
    }

    id startNewSession = [command argumentAtIndex:3];
    if ([startNewSession respondsToSelector:@selector(boolValue)]) {
        if ([startNewSession boolValue]) {
            options[SLSetupOptionStartNewSessionKey] = @YES;
        }
    }

    id startNewSessionAndUser = [command argumentAtIndex:4];
    if ([startNewSessionAndUser respondsToSelector:@selector(boolValue)]) {
        if ([startNewSessionAndUser boolValue]) {
            options[SLSetupOptionStartNewSessionKey] = @NO; // not needed if accidentally set, too
            options[SLSetupOptionStartNewSessionAndResetUserKey] = @YES;
        }
    }

    options[@"__sdk_framework"] = @"CORDOVA";
    options[@"__sdk_framework_version"] = CDV_VERSION;
    options[@"__sdk_framework_plugin_version"] = __smartlookPluginVersion;
        
    DLog(@"STARTUP ARGUMENTS %@", [command arguments]);
    DLog(@"STARTUP OPTIONS %@", options);

    [Smartlook setupWithKey:key options:options];
    
    [Smartlook registerWhitelistedObject:[WKWebView class]];
    
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

- (void)resetSession:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `resetSession`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            BOOL resetUser = NO;
            id resetUserArg = [command argumentAtIndex:0];
            if ([resetUserArg respondsToSelector:@selector(boolValue)]) {
                resetUser = [resetUserArg boolValue];
            }
            [Smartlook resetSessionAndUser:resetUser];
            [self reportOKResultForCallbackID:command.callbackId];
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
            #pragma clang diagnostic push
            #pragma clang diagnostic ignored "-Wdeprecated-declarations"
            [Smartlook beginFullscreenSensitiveMode];
            #pragma clang diagnostic pop
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
            #pragma clang diagnostic push
            #pragma clang diagnostic ignored "-Wdeprecated-declarations"
            [Smartlook endFullscreenSensitiveMode];
            #pragma clang diagnostic pop
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
            #pragma clang diagnostic push
            #pragma clang diagnostic ignored "-Wdeprecated-declarations"
            BOOL isActive = [Smartlook isFullscreenSensitiveModeActive];
            #pragma clang diagnostic pop
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
    DLog(@"entering `setEventTrackingMode` %@", [command arguments]);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *smartlookTrackingMode;
            NSString *trackingMode = [self checkFirstArgumentInCommand:command argName:@"Tracking Mode"];
            if (trackingMode != nil) {
                smartlookTrackingMode= cordovaEventTrackingModeToNative[trackingMode];
            }
            if (smartlookTrackingMode == nil) {
                [self raiseExceptionWithMessage:[NSString stringWithFormat:@"'%@' is not a recognized event tracking mode", trackingMode] forCallbackID:command.callbackId];
            };
            DLog(@"tracking mode: %@", smartlookTrackingMode);
            [Smartlook setEventTrackingModeTo:smartlookTrackingMode];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)setEventTrackingModes:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `setEventTrackingModes` %@", [command arguments]);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSMutableArray *smartlookTrackingModes = [NSMutableArray new];
            NSArray *trackingModes = [command argumentAtIndex:0];
            if ([trackingModes isKindOfClass:[NSArray class]]) {
                [trackingModes enumerateObjectsUsingBlock:^(NSString *  _Nonnull trackingMode, NSUInteger idx, BOOL * _Nonnull stop) {
                    if ([trackingMode isKindOfClass:[NSString class]]) {
                        SLEventTrackingMode smartlookTrackingMode = cordovaEventTrackingModeToNative[trackingMode];
                        if (smartlookTrackingMode != nil) {
                            [smartlookTrackingModes addObject:smartlookTrackingMode];
                        } else {
                            [self raiseExceptionWithMessage:[NSString stringWithFormat:@"'%@' is not a recognized event tracking mode", trackingMode] forCallbackID:command.callbackId];
                        }
                    }
                }];
                [Smartlook setEventTrackingModesTo:smartlookTrackingModes];
            }
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
            DLog(@"properties: %@", [command argumentAtIndex:1]);
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
    DLog(@"entering `getDashboardSessionUrl` arguments: %@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            BOOL withTimestamp = NO;
            id withTimestampArg = [command argumentAtIndex:0];
            if ([withTimestampArg respondsToSelector:@selector(boolValue)]) {
                withTimestamp = [withTimestampArg boolValue];
            }
            NSURL *dashboardURL = [Smartlook getDashboardSessionURLWithCurrentTimestamp:withTimestamp];
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[dashboardURL absoluteString]];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

- (void)getDashboardVisitorUrl:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `getDashboardVisitorUrl` arguments: %@", command.arguments);
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSURL *dashboardVisitorURL = [Smartlook getDashboardVisitorURL];
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[dashboardVisitorURL absoluteString]];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}

NSString *integrationCallbackId;

- (void)registerIntegrationListener:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `registerIntegrationListener` arguments: %@", command.arguments);
    if (integrationCallbackId == nil) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(dashboardURLDidChange:) name:SLDashboardSessionURLChangedNotification object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(dashboardURLDidChange:) name:SLDashboardVisitorURLChangedNotification object:nil];
    }
    integrationCallbackId = command.callbackId;
}

- (void)unregisterIntegrationListener:(CDVInvokedUrlCommand*)command {
    DLog(@"entering `unregisterIntegrationListener` arguments: %@", command.arguments);
    if (integrationCallbackId != nil) {
        [[NSNotificationCenter defaultCenter] removeObserver:self name:SLDashboardSessionURLChangedNotification object:nil];
        [[NSNotificationCenter defaultCenter] removeObserver:self name:SLDashboardVisitorURLChangedNotification object:nil];
    }
    integrationCallbackId = nil;
}

- (void)dashboardURLDidChange:(NSNotification *)notification {
    if (integrationCallbackId != nil) {
        dispatch_async(dispatch_get_main_queue(), ^{
            DLog(@"entering `dashboardURLDidChange` notification: %@", notification.name);
            NSMutableDictionary *params = [NSMutableDictionary new];
            if ([notification.name isEqualToString:SLDashboardSessionURLChangedNotification]) {
                [params setValue:@"onSessionReady" forKey:@"callback"];
                [params setValue:[Smartlook getDashboardSessionURLWithCurrentTimestamp:NO].absoluteString forKey:@"url"];
            } else if ([notification.name isEqualToString:SLDashboardVisitorURLChangedNotification]) {
                [params setValue:@"onVisitorReady" forKey:@"callback"];
                [params setValue:[Smartlook getDashboardVisitorURL].absoluteString forKey:@"url"];
            }
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
            [pluginResult setKeepCallbackAsBool:YES];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:integrationCallbackId];
        });
    }
}

//

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
            NSString *smartlookRenderingMode;
            NSString *renderingMode = [self checkFirstArgumentInCommand:command argName:@"renderingMode"];
            if (renderingMode != nil) {
                smartlookRenderingMode = cordovaRenderingModeToNative[renderingMode];
            }
            if (smartlookRenderingMode == nil) {
                [self raiseExceptionWithMessage:[NSString stringWithFormat:@"`%@` is not a valid rendering mode.", renderingMode] forCallbackID:command.callbackId];
            }
            [Smartlook setRenderingModeTo:smartlookRenderingMode];
            [self reportOKResultForCallbackID:command.callbackId];
        } @catch (NSException *exception) {
            [self reportException:exception forCallbackID:command.callbackId];
        }
    });
}


@end
