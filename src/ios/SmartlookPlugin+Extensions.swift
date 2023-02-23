//
//  SmartlookPlugin+Extensions.swift
//  
//
//  Created by Martin Budínský on 21.01.2023.
//

import Foundation
import SmartlookAnalytics

public extension SmartlookAnalytics.Status {
    func toInt() -> Int {
        switch self {
        case .recording:
            return 0
            
        case .notRecording(Status.Cause.notStarted):
            return 1
            
        case .notRecording(Status.Cause.stopped):
            return 2
            
        case .notRecording(Status.Cause.projectLimitReached):
            return 4
            
        case .notRecording(Status.Cause.internalError):
            return 6
            
        case .notRecording(.swiftUIPreviewContext):
            return 7

        case .notRecording(.unsupportedPlatform):
            return 8

        default: return 1
        }
    }
}

public extension RenderingMode {
    init(with renderingMode: Int) {
        switch renderingMode {
        case 0:
            self = .noRendering
        
        case 1:
            self = .native
        
        case 2:
            self = .wireframe()
                        
        default: self = .native
        }
    }

    func toInt() -> Int {
        let renderingMode = self
        switch renderingMode {
        case .noRendering: return 0
            
        case .native: return 1

        case .wireframe: return 2
            
        default: return 0
        }
    }
}