//
//  SmartlookPlugin.swift
//  
//
//  Created by Martin Budínský on 11.01.2023.
//

import Foundation
import SmartlookAnalytics

@objc(SmartlookPlugin)
public class SmartlookPlugin : CDVPlugin {

    @objc(testSdk:)
    func testSdk(command : CDVInvokedUrlCommand) {
        let isRecording = Smartlook.instance.state.status == .recording
        let result = CDVPluginResult(status: .ok, messageAs: "isRecording")
        
        print("SL: ", isRecording)

        self.commandDelegate.send(result, callbackId: command.callbackId)
    }
}
