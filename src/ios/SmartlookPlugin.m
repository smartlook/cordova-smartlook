#import "SmartlookPlugin.h"
#import <Smartlook/Smartlook.h>

#ifdef DEBUG
//#   define DLog(fmt, ...) NSLog((@"Smartlook: %s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
#   define DLog(fmt, ...) NSLog((@"Smartlook: " fmt), ##__VA_ARGS__);
#else
#   define DLog(...)
#endif

@implementation SmartlookPlugin

static NSString *firstArgumentAsNonullString(SmartlookPlugin *object, CDVInvokedUrlCommand *command, NSString *argName) {
    NSString *value = [command argumentAtIndex:0];
    if (value == nil) {
        NSString *errorMessage = [NSString stringWithFormat:@"Smartlook: '%@' must not be null.", argName];
        DLog(@"%@", errorMessage);
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorMessage];
        [object.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return nil;
    }
    return [NSString stringWithFormat:@"%@", value];
}

- (BOOL)internalSetup:(CDVInvokedUrlCommand*)command {
    
    NSString *key = firstArgumentAsNonullString(self, command, @"API key");
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
                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
            }
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}

- (void)setup:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setup`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            if ([self internalSetup:command]) {
                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
            }
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
    
}


- (void)startRecording:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `startRecording`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook startRecording];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
    
}


- (void)stopRecording:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `stopRecording`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook stopRecording];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
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
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}


- (void)startFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `startFullscreenSensitiveMode`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook beginFullscreenSensitiveMode];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}


- (void)stopFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `stopFullscreenSensitiveMode`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook endFullscreenSensitiveMode];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
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
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}


- (void)setUserIdentifier:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `setUserIdentifier`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *identifier = firstArgumentAsNonullString(self, command, @"User identifier");
            if (identifier == nil) {
                return;
            }
            [Smartlook setUserIdentifier:identifier];
            
            id sessionProperties = [command argumentAtIndex:1];
            for (id key in [sessionProperties allKeys]) {
                NSString *nameString = [NSString stringWithFormat:@"%@", key];
                NSString *valueString = [NSString stringWithFormat:@"%@", sessionProperties[key]];
                [Smartlook setSessionPropertyValue:valueString forName:nameString];
            }
            
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}


- (void)startTimedCustomEvent:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `startTimedCustomEvent`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *eventName = firstArgumentAsNonullString(self, command, @"Event name");
            if (eventName == nil) {
                return;
            }
            [Smartlook startTimedCustomEventWithName:eventName props:[command argumentAtIndex:1]];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}


- (void)trackCustomEvent:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `trackCustomEvent`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *eventName = firstArgumentAsNonullString(self, command, @"Event name");
            if (eventName == nil) {
                return;
            }
            [Smartlook trackCustomEventWithName:eventName props:[command argumentAtIndex:1]];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}


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
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
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
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
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
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}


- (void)removeAllGlobalEventProperties:(CDVInvokedUrlCommand*)command
{
    DLog(@"entering `removeAllGlobalEventProperties`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            [Smartlook clearGlobalEventProperties];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}

-(void)trackNavigationEvent:(CDVInvokedUrlCommand *)command {
    DLog(@"entering `trackNavigationEvent`");
    dispatch_async(dispatch_get_main_queue(), ^{
        @try {
            NSString *identifier = firstArgumentAsNonullString(self, command, @"Controller id");
            if (identifier == nil) {
                return;
            }
            SLNavigationType navigationType = SLNavigationTypeEnter;
            NSString *eventTypeString = [[NSString stringWithFormat:@"%@", [command argumentAtIndex:1]] lowercaseString];
            if ([eventTypeString isEqualToString:@"stop"] || [eventTypeString isEqualToString:@"exit"] ) {
                navigationType = SLNavigationTypeExit;
            }
            [Smartlook trackNavigationEventWithControllerId:identifier type:navigationType];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
        } @catch (NSException *exception) {
            NSLog(@"Smartlook error: %@", exception);
        }
    });
}

@end
