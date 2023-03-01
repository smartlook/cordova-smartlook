//
//  SmartlookPlugin.swift
//  
//
//  Created by Martin Budínský on 15.01.2023.
//

import Foundation

extension SmartlookPlugin {
    func sendOkResultWithMessageForCallbackId(callbackId: String, message: [Any]? = nil) {
        let pluginResult = CDVPluginResult(status: .ok, messageAs: message)

        self.commandDelegate.send(pluginResult, callbackId: callbackId)
    }

    func sendBadParameterResultForCallbackId(callbackId: String, parameterNamed: String, expectedType: Any.Type) {
        self.sendBadParametersResultFroCallbackId(callbackId: callbackId, parametersNamed: [parameterNamed], expectedTypes: [expectedType])
    }

    func sendBadParametersResultFroCallbackId(callbackId: String, parametersNamed: [String], expectedTypes: [Any.Type]) {
        let args = zip(parametersNamed, expectedTypes)
            .map { name, type in "parameter: \(name), type: \(type)" }
            .joined(separator: ", ")

        let pluginResult = CDVPluginResult(status: .error, messageAs: "Invalid or missing parameter(s): \(args)")
        self.commandDelegate.send(pluginResult, callbackId: callbackId)
    }
  
}