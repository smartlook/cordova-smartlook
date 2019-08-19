//
//  UIView+Smartlook.h
//  SmartlookIDTest
//
//  Created by Pavel Kroh on 29/01/2019.
//  Copyright © 2019 Smartlook. All rights reserved.
//

#import <UIKit/UIKit.h>

/** Defines inspectable properties on UIView
 */
@interface UIView (Smartlook)

/** Flags UIView instance as sensitive. For UIViews that are `UITextView`, `UITextField`, `UIWebView` and `WKWebView`, the default value is `YES`. Otherwise, the default value is `NO`.
 */
@property (nonatomic, assign) IBInspectable BOOL slSensitive;

/** Setting colour of sensitive view overlay. Views flagged as sensitive are replaced by solid color rectangles of this color. Alpha channel of the color is ignored. The default value is `black`.
 */
@property (nonatomic, strong) IBInspectable UIColor *slOverlay;

@end
