//
//  SmartlookPlugin+RecordingMask.swift
//  
//
//  Created by Martin Budínský on 13.02.2023.
//

import Foundation
import SmartlookAnalytics

extension SmartlookPlugin {
    struct MaskData: Codable {
        let maskRect: Rect
        let maskType: String

        enum CodingKeys: String, CodingKey {
            case maskRect, maskType
        }
    }

    struct Rect: Codable {
        let height: Int
        let left: Int
        let top: Int
        let width: Int

        enum CodingKeys: String, CodingKey {
            case height, left, top, width
        }
    }

    @objc(setRecordingMask:)
    func setRecordingMask(command: CDVInvokedUrlCommand) {
        DispatchQueue.main.async {
            let mask = command.arguments
            var maskElements = [MaskElement]()
            
            do {
                let jsonData = try JSONSerialization.data(withJSONObject: mask as Any, options: [])
                let masks = try JSONDecoder().decode([MaskData].self, from: jsonData)
                
                for mask in masks {
                    maskElements.append(MaskElement(rect: CGRect(x: mask.maskRect.left, y: mask.maskRect.top, width: mask.maskRect.width, height: mask.maskRect.height), type: mask.maskType == "COVERING" ? .covering : .erasing))
                }
            } catch {
                print("Error parsing recording mask data: \(error.localizedDescription)")
            }
            
            let recordingMask = RecordingMask(elements: maskElements)
            Smartlook.instance.recordingMask = recordingMask
            
            self.sendOkResultWithMessageForCallbackId(callbackId: command.callbackId)
        }
    }
}
