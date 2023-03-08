//
//  SmartlookPlugin.swift
//  
//
//  Created by Martin Budínský on 11.01.2023.
//

import Foundation
import SmartlookAnalytics
import WebKit

@objc(SmartlookPlugin)
public class SmartlookPlugin : CDVPlugin {
    @objc(setPluginVersion:)
    func setPluginVersion(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let pluginVersion = command.arguments[0] as? String
        let frameworkVersion = command.arguments[1] as? String 

        let cdvBridgeInterface = BridgeInterface()
        let cdvFrameworkInfo = FrameworkInfo()
        
        cdvFrameworkInfo.framework = "CORDOVA"
        cdvFrameworkInfo.frameworkPluginVersion = pluginVersion
        cdvFrameworkInfo.frameworkVersion = frameworkVersion

        cdvBridgeInterface.frameworkInfo = cdvFrameworkInfo

        Smartlook.instance.register(bridgeInterface: cdvBridgeInterface) 
        Smartlook.instance.sensitivity[WKWebView.self] = false

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(start:)
    func start(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.start()

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(stop:)
    func stop(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.stop()

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(reset:)
    func reset(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.reset()

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setProjectKey:)
    func setProjectKey(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let projectKey = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "projectKey", expectedType: String.self) 
            return
        }
      
        Smartlook.instance.preferences.projectKey(projectKey)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(trackEvent:)
    func trackEvent(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let eventName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "eventName", expectedType: String.self)
            return
        }
        let props = command.arguments[1] as? [String: String?]
        let eventProperties: Properties? = self.properties(from: props)
      
        Smartlook.instance.track(event: eventName, properties: eventProperties)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(trackSelector:)
    func trackSelector(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let selectorName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "selectorName", expectedType: String.self)
            return
        }
        let props = command.arguments[1] as? [String: String?]
        let eventProperties: Properties? = self.properties(from: props)
      
        Smartlook.instance.track(event: selectorName, properties: eventProperties)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(trackNavigationEnter:)
    func trackNavigationEnter(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let eventName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "eventName", expectedType: String.self)
            return
        }
        let props = command.arguments[1] as? [String: String?]
        let eventProperties: Properties? = self.properties(from: props)
      
        Smartlook.instance.track(navigationEvent: eventName, direction: .enter, properties: eventProperties)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(trackNavigationExit:)
    func trackNavigationExit(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let eventName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "eventName", expectedType: String.self)
            return
        }
        let props = command.arguments[1] as? [String: String?]
        let eventProperties: Properties? = self.properties(from: props)
      
        Smartlook.instance.track(navigationEvent: eventName, direction: .exit, properties: eventProperties)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setReferrer:)
    func setReferrer(command: CDVInvokedUrlCommand) {

    }

    @objc(putStringEventProperty:)
    func putStringEventProperty(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let propertyName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "propertyName", expectedType: String.self)
            return
        }

        guard let value = command.arguments[1] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "value", expectedType: String.self)
            return
        }

        Smartlook.instance.eventProperties[propertyName] = value
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(getStringEventProperty:)
    func getStringEventProperty(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let propertyName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "propertyName", expectedType: String.self)
            return
        }

        let value = Smartlook.instance.eventProperties[propertyName]
        let result = CDVPluginResult(status: .ok, messageAs: value)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(removeStringEventProperty:)
    func removeStringEventProperty(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let propertyName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "propertyName", expectedType: String.self)
            return
        }

        Smartlook.instance.eventProperties[propertyName] = nil
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(clearEventProperties:)
    func clearEventProperties(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        for key in Smartlook.instance.eventProperties.keys {
            Smartlook.instance.eventProperties[key] = nil
        }

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setUserIdentifier:)
    func setUserIdentifier(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let userIdentifier = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "userIdentifier", expectedType: String.self)
            return
        }

        Smartlook.instance.user.identifier(userIdentifier)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setUserEmail:)
    func setUserEmail(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let userEmail = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "email", expectedType: String.self)
            return
        }

        Smartlook.instance.user.email(userEmail)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setUserName:)
    func setUserName(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let userName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "name", expectedType: String.self)
            return
        }

        Smartlook.instance.user.name(userName)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setUserProperty:)
    func setUserProperty(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let propertyName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "propertyName", expectedType: String.self)
            return
        }

        guard let value = command.arguments[1] as? String? else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "value", expectedType: String.self)
            return
        }

        Smartlook.instance.user.setProperty(propertyName, to: value)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(getUserProperty:)
    func getUserProperty(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let propertyName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "propertyName", expectedType: String.self)
            return
        }

        let value = Smartlook.instance.user[propertyName]
        let result = CDVPluginResult(status: .ok, messageAs: value)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(removeUserProperty:)
    func removeUserProperty(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let propertyName = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "propertyName", expectedType: String.self)
            return
        }

        Smartlook.instance.user[propertyName] = nil
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(openNewUser:)
    func openNewUser(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.user.openNew()
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(openNewSession:)
    func openNewSession(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.user.session.openNew()
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(getUserUrl:)
    func getUserUrl(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let userUrl = Smartlook.instance.user.url?.absoluteString
        let result = CDVPluginResult(status: .ok, messageAs: userUrl)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(getSessionUrl:)
    func getSessionUrl(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let sessionUrl = Smartlook.instance.user.session.url?.absoluteString
        let result = CDVPluginResult(status: .ok, messageAs: sessionUrl)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(getSessionUrlWithTimestamp:)
    func getSessionUrlWithTimestamp(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let sessionUrl = Smartlook.instance.user.session.urlWithTimestamp?.absoluteString
        let result = CDVPluginResult(status: .ok, messageAs: sessionUrl)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(setRelayProxyHost:)
    func setRelayProxyHost(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let relayProxyHost = command.arguments[0] as? String else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "relayProxyHost", expectedType: String.self)
            return
        }

        Smartlook.instance.setupConfiguration?.relayProxyHost(relayProxyHost)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setFrameRate:)
    func setFrameRate(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let frameRate = command.arguments[0] as? Int else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "frameRate", expectedType: Int.self)
            return
        }

        Smartlook.instance.preferences.framerate = frameRate
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(getFrameRate:)
    func getFrameRate(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let frameRate = Smartlook.instance.preferences.framerate else{
          return
        }
        let result = CDVPluginResult(status: .ok, messageAs: frameRate)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(setJobUploadEnabled:)
    func setJobUploadEnabled(command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok, messageAs: "setJobUploadEnabled is not supported on iOS")

        self.commandDelegate.send(result, callbackId: command.callbackId)
    }

    @objc(setAdaptiveFrameRateEnabled:)
    func setAdaptiveFrameRateEnabled(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let adaptiveFrameRateEnabled = command.arguments[0] as? Bool else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "isEnabled", expectedType: Bool.self)
            return
        }

        Smartlook.instance.preferences.useAdaptiveFramerate(adaptiveFrameRateEnabled)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(getAdaptiveFrameRateEnabled:)
    func getAdaptiveFrameRateEnabled(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let adaptiveFrameRateEnabled = Smartlook.instance.state.usingAdaptiveFramerate
        let result = CDVPluginResult(status: .ok, messageAs: adaptiveFrameRateEnabled)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(eventTrackingEnableAll:)
    func eventTrackingEnableAll(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.preferences.eventTracking = EventTracking()

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(eventTrackingDisableAll:)
    func eventTrackingDisableAll(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.preferences.eventTracking = EventTracking.noTracking

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(isRecording:)
    func isRecording(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let isRecording = Smartlook.instance.state.status == .recording
        let result = CDVPluginResult(status: .ok, messageAs: isRecording)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(getProjectKey:)
    func getProjectKey(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let projectKey = Smartlook.instance.state.projectKey
        let result = CDVPluginResult(status: .ok, messageAs: projectKey)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(setEventTrackingInteractionUserStatus:)
    func setEventTrackingInteractionUserStatus(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let isEnabled = command.arguments[0] as? Bool else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "isEnabled", expectedType: Bool.self)
            return
        }

        Smartlook.instance.preferences.eventTracking?.trackUserInteraction = isEnabled
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setEventTrackingInteractionRageClickStatus:)
    func setEventTrackingInteractionRageClickStatus(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let isEnabled = command.arguments[0] as? Bool else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "isEnabled", expectedType: Bool.self)
            return
        }

        Smartlook.instance.preferences.eventTracking?.trackRageClicks = isEnabled
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(restoreDefault:)
    func restoreDefault(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        Smartlook.instance.preferences.eventTracking = EventTracking.noTracking

        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    @objc(setWebViewSensitivity:)
    func setWebViewSensitivity(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let sensitivity = command.arguments[0] as? Bool else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "isSensitive", expectedType: Bool.self)
            return
        }

        Smartlook.instance.sensitivity[WKWebView.self] = sensitivity
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }
    
    @objc(getRenderingMode:)
    func getRenderingMode(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let renderingMode = Smartlook.instance.state.renderingMode
        let result = CDVPluginResult(status: .ok, messageAs: renderingMode.toInt())

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(getRecordingStatus:)
    func getRecordingStatus(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let recordingStatus = Smartlook.instance.state.status
        let result = CDVPluginResult(status: .ok, messageAs: recordingStatus.toInt())

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(getStateFrameRate:)
    func getStateFrameRate(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        let frameRate = Smartlook.instance.state.framerate
        let result = CDVPluginResult(status: .ok, messageAs: frameRate)

        self.commandDelegate.send(result, callbackId: command.callbackId)
      }
    }

    @objc(setRenderingMode:)
    func setRenderingMode(command: CDVInvokedUrlCommand) {
      DispatchQueue.main.async {
        guard let renderingMode = command.arguments[0] as? Int else {
            self.sendBadParameterResultForCallbackId(callbackId: command.callbackId, parameterNamed: "renderingMode", expectedType: Int.self)
            return
        }

        let slRenderingMode = RenderingMode(with: renderingMode)

        Smartlook.instance.preferences.renderingMode(slRenderingMode)
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
      }
    }

    /// MARK: - UserURLChangeListener

    private var userUrlChangedListenerCallbackId: String? = nil
    private var newUserObserver: NSObjectProtocol? = nil

    @objc(registerUserUrlChangedListener:)
    func registerUserUrlChangedListener(command: CDVInvokedUrlCommand) {
        if self.userUrlChangedListenerCallbackId == nil {
            self.newUserObserver = NotificationCenter.default.addObserver(forName: User.urlDidChangeNotification, object: nil, queue: nil) { _ in
                let url = Smartlook.instance.user.url?.absoluteString
                let result = CDVPluginResult(status: .ok, messageAs: url)
                result?.setKeepCallbackAs(true)
                self.commandDelegate.send(result, callbackId: self.userUrlChangedListenerCallbackId)
            }
        }

        self.userUrlChangedListenerCallbackId = command.callbackId
    }

    @objc(removeUserUrlChangedListener:)
    func removeUserUrlChangedListener(command: CDVInvokedUrlCommand) {
        if self.newUserObserver != nil {
            NotificationCenter.default.removeObserver(self.newUserObserver!)
            self.newUserObserver = nil
        }

        self.userUrlChangedListenerCallbackId = nil
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
    }  

    /// MARK: - SessionURLChangeListener

    private var sessionUrlChangedListenerCallbackId: String? = nil
    private var newSessionObserver: NSObjectProtocol? = nil

    @objc(registerSessionUrlChangedListener:)
    func registerSessionUrlChangedListener(command: CDVInvokedUrlCommand) {
        if self.sessionUrlChangedListenerCallbackId == nil {
            self.newSessionObserver = NotificationCenter.default.addObserver(forName: Session.urlDidChangeNotification, object: nil, queue: nil) { _ in
                let url = Smartlook.instance.user.session.url?.absoluteString
                let result = CDVPluginResult(status: .ok, messageAs: url)
                result?.setKeepCallbackAs(true)
                self.commandDelegate.send(result, callbackId: self.sessionUrlChangedListenerCallbackId)
            }
        }

        self.sessionUrlChangedListenerCallbackId = command.callbackId
    }

    @objc(removeSessionUrlChangedListener:)
    func removeSessionUrlChangedListener(command: CDVInvokedUrlCommand) {
        if self.newSessionObserver != nil {
            NotificationCenter.default.removeObserver(self.newSessionObserver!)
            self.newSessionObserver = nil
        }

        self.sessionUrlChangedListenerCallbackId = nil
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
    }

    /// MARK: - RenderingModeChangeListener

    private var renderingModeChangedListenerCallbackId: String? = nil
    private var newRenderingModeObserver: NSObjectProtocol? = nil

    @objc(registerRenderingModeChangedListener:)
    func registerRenderingModeChangedListener(command: CDVInvokedUrlCommand) {
        if self.renderingModeChangedListenerCallbackId == nil {
            self.newRenderingModeObserver = NotificationCenter.default.addObserver(forName: RuntimeState.renderingModeDidChangeNotification, object: nil, queue: nil) { _ in
                let renderingMode = Smartlook.instance.state.renderingMode.toInt()
                
                let result = CDVPluginResult(status: .ok, messageAs: renderingMode)
                result?.setKeepCallbackAs(true)
                self.commandDelegate.send(result, callbackId: self.renderingModeChangedListenerCallbackId)
            }
        }

        self.renderingModeChangedListenerCallbackId = command.callbackId
    }

    @objc(removeRenderingModeChangedListener:)
    func removeRenderingModeChangedListener(command: CDVInvokedUrlCommand) {
        if self.newRenderingModeObserver != nil {
            NotificationCenter.default.removeObserver(self.newRenderingModeObserver!)
            self.newRenderingModeObserver = nil
        }

        self.renderingModeChangedListenerCallbackId = nil
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
    }

    /// MARK: - RecordingStatusChangeListener

    private var recordingStatusChangedListenerCallbackId: String? = nil
    private var newRecordingStatusObserver: NSObjectProtocol? = nil

    @objc(registerRecordingStatusChangedListener:)
    func registerRecordingStatusChangedListener(command: CDVInvokedUrlCommand) {
        if self.recordingStatusChangedListenerCallbackId == nil {
            self.newRecordingStatusObserver = NotificationCenter.default.addObserver(forName: RuntimeState.statusDidChangeNotification, object: nil, queue: nil) { _ in
                let recordingStatus = Smartlook.instance.state.status.toInt()
                let result = CDVPluginResult(status: .ok, messageAs: recordingStatus)
                result?.setKeepCallbackAs(true)
                self.commandDelegate.send(result, callbackId: self.recordingStatusChangedListenerCallbackId)
            }
        }

        self.recordingStatusChangedListenerCallbackId = command.callbackId
    }

    @objc(removeRecordingStatusChangedListener:)
    func removeRecordingStatusChangedListener(command: CDVInvokedUrlCommand) {
        if self.newRecordingStatusObserver != nil {
            NotificationCenter.default.removeObserver(self.newRecordingStatusObserver!)
            self.newRecordingStatusObserver = nil
        }

        self.recordingStatusChangedListenerCallbackId = nil
        self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
    }

    

    private func properties(from record: [String: String?]?) -> Properties? {
        guard let record = record else {
            return nil
        }
        
        let properties = Properties()
        for (key, value) in record {
            properties[key] = value
        }
        
        return properties
    }
}
