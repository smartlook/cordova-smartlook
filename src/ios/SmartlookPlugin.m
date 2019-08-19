#import "SmartlookPlugin.h"
#import <Smartlook/Smartlook.h>

@implementation SmartlookPlugin

- (void)setupAndStartRecording:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [Smartlook setupWithKey:@"beta_a76b285a70ecfb2b2cc13a13b0be2de6b60acf99" options:nil];
    [Smartlook registerWhitelistedObject:[UIWebView class]];
    [Smartlook startRecording];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)setup:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;

    [Smartlook setupWithKey:@"beta_a76b285a70ecfb2b2cc13a13b0be2de6b60acf99" options:nil];
    [Smartlook registerWhitelistedObject:[UIWebView class]];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)startRecording:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)stopRecording:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)isRecording:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)startFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)stopFullscreenSensitiveMode:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)isFullscreenSensitiveModeActive:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)setUserIdentifier:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)startTimedCustomEvent:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)trackCustomEvent:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)setGlobalEventProperties:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)setGlobalEventProperty:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)removeGlobalEventProperty:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)removeAllGlobalEventProperties:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)echo:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
