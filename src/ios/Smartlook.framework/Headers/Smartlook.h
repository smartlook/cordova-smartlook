//
//  Smartlook.h
//  Smartlook iOS SDK 0.1.12
//
//  Copyright © 2018 Smartsupp.com, s.r.o. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <CoreMedia/CoreMedia.h>
#import <CoreVideo/CoreVideo.h>
#import <QuartzCore/QuartzCore.h>
#import <SystemConfiguration/SystemConfiguration.h>
#import <WebKit/WebKit.h>

#import "Smartlook_Deprecated.h"
#import "UIView+Smartlook.h"

NS_SWIFT_NAME(Smartlook.SensitiveData)
/**
 Convenience protocol to "flag" classes that present sensitive data.
 */
@protocol SLSensitiveData
@end

NS_SWIFT_NAME(Smartlook.NotSensitiveData)
/**
 Convenience protocol to "flag" classes that present nonsensitive data.
 */
@protocol SLNonSensitiveData
@end

// Smartlook SDK. To use, call "startWithApiKey:" method from "applicationDidFinishLaunching:withOptions:" in your AppDelegate class

@interface Smartlook (PublicInterface)

// MARK: Setup

NS_SWIFT_NAME(Smartlook.SetupOptionKey)
typedef NSString * SLSetupOptionKey NS_TYPED_ENUM;
extern SLSetupOptionKey const _Nonnull SLSetupOptionFramerateKey NS_SWIFT_NAME(framerate);
extern SLSetupOptionKey const _Nonnull SLSetupOptionEnableCrashyticsKey NS_SWIFT_NAME(enableCrashytics);


/**
 Setup Smartlook.
 
 Call this method once in your `applicationDidFinishLaunching:withOptions:`.
 
 - Attention: This method initializes Smartlook SDK, but does not start recording. To start recording, call `startRecording` method.
 
 @param key The application (project) specific SDK key, available in your Smartlook dashboard.
 */
+(void)setupWithKey:(nonnull NSString *)key;

/**
 Setup Smartlook.
 
 Call this method once in your `applicationDidFinishLaunching:withOptions:`.

 - Attention: This method initializes Smartlook SDK, but does not start recording. To start recording, call `startRecording` method.
 
 @param key The application (project) specific SDK key, available in your Smartlook dashboard.
 @param options (optional) Startup options.
 
 `SLFramerateOptionKey` (Swift: `Smartlook.framerateOptionKey`) NSNumber, custom recording framerate.
 */
+(void)setupWithKey:(nonnull NSString *)key options:(nullable NSDictionary<SLSetupOptionKey,id> *)options NS_SWIFT_NAME(setup(key:options:));



// MARK: Start/Stop Recording

/** Starts video and events recording.
 */
+ (void)startRecording;

/** Stops video and events recording.
 */
+ (void)stopRecording;

/** Current video and events recording state.
 */
+ (BOOL)isPaused;

/** Current video and events recording state.
 */
+ (BOOL)isRecording;

// MARK: Custom Event

/**
 Start timer for custom event.
 
 This method does not record an event. It is the subsequent `trackCustomEvent` call with the same `eventName` that does.
 
 In the resulting event, the property dictionaries of `start` and `record` are merged (the `record` values override the `start` ones if the key is the same), and a `duration` property is added to them.
 
 @param eventName Name of the event.
 @param props Optional dictionary with additional information.  Non String values will be stringlified.
 */
+ (void)startTimedCustomEventWithName:(nonnull NSString*)eventName props:(nullable NSDictionary<NSString*, NSString*>*)props NS_SWIFT_NAME(startTimedCustomEvent(name:props:));

/**
 Records timestamped custom event with optional properties.

 @param eventName Name that identifies the event.
 @param props Optional dictionary with additional information. Non String values will be stringlified.
 */
+ (void)trackCustomEventWithName:(nonnull NSString*)eventName props:(nullable NSDictionary<NSString*, NSString*>*)props NS_SWIFT_NAME(trackCustomEvent(name:props:));


// MARK: - Session and Global Event Properties

/** Set the app's user identifier.
 @param userIdentifier The application-specific user identifier.
 */
+ (void)setUserIdentifier:(nullable NSString*)userIdentifier;


NS_SWIFT_NAME(Smartlook.PropertyOption)
/**
 Smartlook property options

 - SLPropertyOptionDefaults: the default value
 - SLPropertyOptionImmutable: the property is immutable. To change it, remove it first.
 */
typedef NS_OPTIONS(NSUInteger, SLPropertyOption) {
    SLPropertyOptionDefaults    = 0,
    SLPropertyOptionImmutable   = 1 << 0
};

/**
 Custom session properties. You will see these properties in the Dashboard at Visitor details.

 @param value the property value
 @param name the property name
 */
+ (void)setSessionPropertyValue:(nonnull NSString *)value forName:(nonnull NSString *)name NS_SWIFT_NAME(setSessionProperty(value:forName:));

/**
 Custom session properties. You will see these properties in the Dashboard at Visitor details.

 @param value the property value
 @param name the property name
 @param options how the property is managed
 */
+ (void)setSessionPropertyValue:(nonnull NSString *)value forName:(nonnull NSString *)name withOptions:(SLPropertyOption)options NS_SWIFT_NAME(setSessionProperty(value:forName:options:));

/**
 Removes custom session property.

 @param name the property name
 */
+ (void)removeSessionPropertyForName:(nonnull NSString *)name NS_SWIFT_NAME(removeSessionProperty(forName:));
/**
 Removes all the custom session properties.
 */
+ (void)clearSessionProperties;


/**
 Global event properties are sent with every event.

 @param value the property value
 @param name the property name
 */
+ (void)setGlobalEventPropertyValue:(nonnull NSString *)value forName:(nonnull NSString *)name NS_SWIFT_NAME(setGlobalEventProperty(value:forName:));
/**
 Global event properties are sent with every event.

 @param value  the property value
 @param name  the property name
 @param options  how the property is managed
 */
+ (void)setGlobalEventPropertyValue:(nonnull NSString *)value forName:(nonnull NSString *)name withOptions:(SLPropertyOption)options NS_SWIFT_NAME(setGlobalEventProperty(value:forName:options:));

/**
 Removes global event property so it is no longer sent with every event.

 @param name the property name
 */
+ (void)removeGlobalEventPropertyForName:(nonnull NSString *)name NS_SWIFT_NAME(removeGlobalEventProperty(forName:));
/**
 Removes all global event properties so they are no longer sent with every event.
 */
+ (void)clearGlobalEventProperties;

// MARK: - Full Sensitive Mode

/**
 Use this method to enter the **full sensitive mode**. No video is recorded, just analytics events.
 */
+ (void)beginFullscreenSensitiveMode;
/**
 Use this method to leave the **full sensitive mode**. Video is recorded again.
 */
+ (void)endFullscreenSensitiveMode;
/**
 To check Smartlook full sensitive mode status. In full sensitive mode, no video is recorded, just analytics events.

 @return fullscreen sensitive mode state
 */
+ (BOOL)isFullscreenSensitiveModeActive;

// MARK: - Sensitive Views

/**
 Default colour of blacklisted view overlay

 @param color overlay colour
 */
+ (void)setBlacklistedItemsColor:(nonnull UIColor *)color NS_SWIFT_NAME(setBlacklistedItem(color:));

/**
 Use to exempt a view from being ovelayed in video recording as containting sensitive data.
 
 By default, all instances of `UITextView`, `UITextField`, `UIWebView` and `WKWebView` are blacklisted.

 See online documentation for detailed blacklisting/whitelisting documentation.
 
 @param object an instance of UIView, an UIView subclass or a Protocol reference
 */
+ (void)registerWhitelistedObject:(nonnull id)object NS_SWIFT_NAME(registerWhitelisted(object:));
/**
 Use to stop whitelisting an object. Whitelisted objects are exempted from being ovelayed in video recording as containting sensitive data.
 
 By default, all instances of `UITextView`, `UITextField`, `UIWebView` and `WKWebView` are blacklisted.
 
 See online documentation for detailed blacklisting/whitelisting documentation.
 
 @param object an instance of UIView, an UIView subclass or a Protocol reference
 */
+ (void)unregisterWhitelistedObject:(nonnull id)object NS_SWIFT_NAME(unregisterWhitelisted(object:));

/**
 Add an object to the blacklist. Blacklisted objects are ovelayed in video recording..
 
 By default, all instances of `UITextView`, `UITextField`, `UIWebView` and `WKWebView` are blacklisted.
 
 See online documentation for detailed blacklisting/whitelisting documentation.
 
 @param object an instance of UIView, an UIView subclass or a Protocol reference
 */
+ (void)registerBlacklistedObject:(nonnull id)object NS_SWIFT_NAME(registerBlacklisted(object:));
/**
 Remove an object from the blacklist. Blacklisted objects are ovelayed in video recording..
 
 By default, all instances of `UITextView`, `UITextField`, `UIWebView` and `WKWebView` are blacklisted.
 
 See online documentation for detailed blacklisting/whitelisting documentation.
 
 @param object an instance of UIView, an UIView subclass or a Protocol reference
 */
+ (void)unregisterBlacklistedObject:(nonnull id)object NS_SWIFT_NAME(unregisterBlacklisted(object:));

// MARK: - Dashboard session URL
/**
 URL leading to the Dashboard player for the current Smartlook session. This URL can be access by everyone with the access rights to the dashboard.

 @return current session recording Dashboard URL
 */
+ (nullable NSURL *)getDashboardSessionURL;


// MARK: - Custom navigation events

 NS_SWIFT_NAME(Smartlook.NavigationEventType)
 typedef NSString * SLNavigationType NS_TYPED_ENUM;
 extern SLNavigationType const _Nonnull SLNavigationTypeEnter NS_SWIFT_NAME(enter);
 extern SLNavigationType const _Nonnull SLNavigationTypeExit NS_SWIFT_NAME(exit);
 
 + (void)trackNavigationEventWithControllerId:(nonnull NSString *)controllerId type:(nonnull SLNavigationType)type NS_SWIFT_NAME(trackNavigationEvent(withControllerId:type:));
 
@end

