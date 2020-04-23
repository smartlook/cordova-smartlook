package com.smartlook.cordovaplugin;

import android.app.Activity;

import com.smartlook.sdk.smartlook.Smartlook;
import com.smartlook.sdk.smartlook.LogListener;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.webkit.WebView;

public class SmartlookPlugin extends CordovaPlugin {

    private static final String TAG = SmartlookPlugin.class.getSimpleName();

    // API methods names

    // Setup and lifecycle
    private static final String SETUP_AND_START_RECORDING = "setupAndStartRecording";
    private static final String SETUP = "setup";
    private static final String START_RECORDING = "startRecording";
    private static final String STOP_RECORDING = "stopRecording";
    private static final String IS_RECORING = "isRecording";

    // Fullscreen sensitive mode
    private static final String START_FULLSCREEN_SENSITIVE_MODE = "startFullscreenSensitiveMode";
    private static final String STOP_FULLSCREEN_SENSITIVE_MODE = "stopFullscreenSensitiveMode";
    private static final String IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE = "isFullscreenSensitiveModeActive";

    // User identification
    private static final String SET_USER_IDENTIFIER = "setUserIdentifier";

    // Tracking
    private static final String SET_EVENT_TRACKING_MODE = "setEventTrackingMode";
    private static final String TRACK_NAVIGATION_EVENT = "trackNavigationEvent";
    private static final String START_TIMED_CUSTOM_EVENT = "startTimedCustomEvent";
    private static final String STOP_TIMED_CUSTOM_EVENT = "stopTimedCustomEvent";
    private static final String CANCEL_TIMED_CUSTOM_EVENT = "cancelTimedCustomEvent";
    private static final String TRACK_CUSTOM_EVENT = "trackCustomEvent";

    // Event properties
    private static final String SET_GLOBAL_EVENT_PROPERTIES = "setGlobalEventProperties";
    private static final String SET_GLOBAL_EVENT_PROPERTY = "setGlobalEventProperty";
    private static final String REMOVE_GLOBAL_EVENT_PROPERTY = "removeGlobalEventProperty";
    private static final String REMOVE_ALL_GLOBAL_EVENT_PROPERTIES = "removeAllGlobalEventProperties";

    // Utilities
    private static final String SET_REFERRER = "setReferrer";
    private static final String GET_DASHBOARD_SESSION_URL = "getDashboardSessionUrl";
    private static final String REGISTER_LOG_LISTENER = "registerLogListener";
    private static final String UNREGISTER_LOG_LISTENER = "unregisterLogListener";
    private static final String SET_RENDERING_MODE = "setRenderingMode";

    // Arguments
    private static final int SMARTLOOK_API_KEY = 0;
    private static final int FPS = 1;
    private static final int SETUP_RENDERING_MODE = 2;
    private static final int IDENTIFIER = 0;
    private static final int SESSION_PROPERTIES = 1;
    private static final int EVENT_NAME = 0;
    private static final int EVENT_PROPERTIES = 1;
    private static final int GLOBAL_EVENT_PROPERTIES = 0;
    private static final int IMMUTABLE_PROPERTIES = 1;
    private static final int KEY = 0;
    private static final int VALUE = 1;
    private static final int IMMUTABLE_PROPERTY = 2;
    private static final int VIEW_STATE = 1;
    private static final int CUSTOM_EVENT_KEY = 1;
    private static final int CUSTOM_EVENT_VALUE = 2;
    private static final int EVENT_ID = 0;
    private static final int REASON = 1;
    private static final int CANCEL_TIMED_EVENT_PROPERTIES = 2;
    private static final int REFERRER = 0;
    private static final int SOURCE = 1;
    private static final int EVENT_TRACKING_MODE = 0;
    private static final int RENDERING_MODE = 0;

    // Undefined
    private static final int UNDEFINED_FPS = -1;
    private static final String UNDEFINED_RENDERING_MODE = "";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {

        try {
            if (action.equals(SETUP_AND_START_RECORDING)) {
                setupAndStartRecording(args, callbackContext);
            } else if (action.equals(SETUP)) {
                setup(args, callbackContext);
            } else if (action.equals(START_RECORDING)) {
                startRecording(callbackContext);
            } else if (action.equals(STOP_RECORDING)) {
                stopRecording(callbackContext);
            } else if (action.equals(IS_RECORING)) {
                isRecording(callbackContext);
            } else if (action.equals(START_FULLSCREEN_SENSITIVE_MODE)) {
                startFullscreenSensitiveMode(callbackContext);
            } else if (action.equals(STOP_FULLSCREEN_SENSITIVE_MODE)) {
                stopFullscreenSensitiveMode(callbackContext);
            } else if (action.equals(IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE)) {
                isFullscreenSensitiveModeActive(callbackContext);
            } else if (action.equals(SET_USER_IDENTIFIER)) {
                setUserIdentifier(args, callbackContext);
            } else if (action.equals(SET_EVENT_TRACKING_MODE)) {        
                setEventTrackingMode(args, callbackContext); 
            } else if (action.equals(TRACK_NAVIGATION_EVENT)) {
                trackNavigationEvent(args, callbackContext);
            } else if (action.equals(START_TIMED_CUSTOM_EVENT)) {
                startTimedCustomEvent(args, callbackContext);
            } else if (action.equals(STOP_TIMED_CUSTOM_EVENT)) {
                stopTimedCustomEvent(args, callbackContext);
            } else if (action.equals(CANCEL_TIMED_CUSTOM_EVENT)) {
                cancelTimedCustomEvent(args, callbackContext);
            } else if (action.equals(TRACK_CUSTOM_EVENT)) {
                trackCustomEvent(args, callbackContext);
            } else if (action.equals(SET_GLOBAL_EVENT_PROPERTIES)) {
                setGlobalEventProperties(args, callbackContext);
            } else if (action.equals(SET_GLOBAL_EVENT_PROPERTY)) {
                setGlobalEventProperty(args, callbackContext);
            } else if (action.equals(REMOVE_GLOBAL_EVENT_PROPERTY)) {
                removeGlobalEventProperty(args, callbackContext);
            } else if (action.equals(REMOVE_ALL_GLOBAL_EVENT_PROPERTIES)) {
                removeAllGlobalEventProperties(callbackContext);
            } else if (action.equals(SET_REFERRER)) {
                setReferrer(args, callbackContext);
            } else if (action.equals(GET_DASHBOARD_SESSION_URL)) {
                getDashboardSessionUrl(callbackContext);
            } else if (action.equals(REGISTER_LOG_LISTENER)) {
                registerLogListener(callbackContext);
            } else if (action.equals(UNREGISTER_LOG_LISTENER)){
                unregisterLogListener(callbackContext);    
            } else if (action.equals(SET_RENDERING_MODE)) {
                setRenderingMode(args, callbackContext);
            } else {
                callbackContext.error("Unknow action");
                return false;
            }
        } catch (JSONException e) {
            callbackContext.error("JsonException: " + e.getMessage());
        }  

        return true;
    }

    // Setup and lifecycle

    private void setupAndStartRecording(final JSONArray args, final CallbackContext callbackContext) throws JSONException {

        if (!args.isNull(SMARTLOOK_API_KEY)) {
            Smartlook.SetupOptionsBuilder builder = new Smartlook.SetupOptionsBuilder(args.getString(SMARTLOOK_API_KEY));
            builder.setActivity(cordova.getActivity());

            if (!args.isNull(FPS) && args.getInt(FPS) != UNDEFINED_FPS) {
                builder.setFps(args.getInt(FPS));
            }

            if (!args.isNull(FPS) && args.getInt(FPS) != UNDEFINED_FPS) {
                builder.setFps(args.getInt(FPS));
            }

            if (!args.isNull(SETUP_RENDERING_MODE) && !args.getString(SETUP_RENDERING_MODE).equals(UNDEFINED_RENDERING_MODE)) {
                builder.setRenderingMode(args.getString(SETUP_RENDERING_MODE));
            }

            Smartlook.setup(builder.build());
            Smartlook.unregisterBlacklistedClass(WebView.class);
            Smartlook.startRecording();
            callbackContext.success();
        }

        callbackContext.error("Invalid setupAndStartRecording parameters!");
    }

    private void setup(JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (!args.isNull(SMARTLOOK_API_KEY)) {
            Smartlook.SetupOptionsBuilder builder = new Smartlook.SetupOptionsBuilder(args.getString(SMARTLOOK_API_KEY));
            builder.setActivity(cordova.getActivity());

            if (!args.isNull(FPS) && args.getInt(FPS) != -1) {
                builder.setFps(args.getInt(FPS));
            }

            if (!args.isNull(FPS) && args.getInt(FPS) != -1) {
                builder.setFps(args.getInt(FPS));
            }

            if (!args.isNull(SETUP_RENDERING_MODE) && !args.getString(SETUP_RENDERING_MODE).equals(UNDEFINED_RENDERING_MODE)) {
                builder.setRenderingMode(args.getString(SETUP_RENDERING_MODE));
            }

            Smartlook.setup(builder.build());
            Smartlook.unregisterBlacklistedClass(WebView.class);
            callbackContext.success();
        }

        callbackContext.error("Invalid setup parameters!");
    }

    private void startRecording(CallbackContext callbackContext) throws JSONException {
        Smartlook.startRecording();
        callbackContext.success();
    }

    private void stopRecording(CallbackContext callbackContext) throws JSONException {
        Smartlook.stopRecording();
        callbackContext.success();
    }

    private void isRecording(CallbackContext callbackContext) throws JSONException {
        callbackContext.success(Smartlook.isRecording() ? "true" : "false");
    }

    // Fullscreen sensitive mode

    private void startFullscreenSensitiveMode(CallbackContext callbackContext) throws JSONException {
        Smartlook.startFullscreenSensitiveMode();
        callbackContext.success();
    }

    private void stopFullscreenSensitiveMode(CallbackContext callbackContext) throws JSONException {
        Smartlook.stopFullscreenSensitiveMode();
        callbackContext.success();
    }

    private void isFullscreenSensitiveModeActive(CallbackContext callbackContext) throws JSONException {
        callbackContext.success(Smartlook.isFullscreenSensitiveModeActive() ? "true" : "false");
    }

    // User identification

    private void setUserIdentifier(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(IDENTIFIER) && !args.isNull(SESSION_PROPERTIES)) {
            Smartlook.setUserIdentifier(args.getString(IDENTIFIER), args.getJSONObject(SESSION_PROPERTIES));
            callbackContext.success();
            return;
        } else if (!args.isNull(IDENTIFIER)) {
            Smartlook.setUserIdentifier(args.getString(IDENTIFIER));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setUserIdentifier parameters!");
    }

    // Tracking

    private void setEventTrackingMode(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_TRACKING_MODE)) {
            Smartlook.setEventTrackingMode(args.getString(EVENT_TRACKING_MODE));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setEventTrackingMode parameters!");
    }

    private void trackNavigationEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_NAME) && !args.isNull(VIEW_STATE)) {
            Smartlook.trackNavigationEvent(args.getString(EVENT_NAME), args.getString(VIEW_STATE));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid trackNavigationEvent parameters!");
    }

    private void startTimedCustomEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_NAME) && !args.isNull(EVENT_PROPERTIES)) {
            String eventId = Smartlook.startTimedCustomEvent(args.getString(EVENT_NAME), args.getJSONObject(EVENT_PROPERTIES));
            callbackContext.success(eventId);
            return;
        } else if (!args.isNull(EVENT_NAME)) {
            String eventId = Smartlook.startTimedCustomEvent(args.getString(EVENT_NAME));
            callbackContext.success(eventId);
            return;
        }

        callbackContext.error("Invalid startTimedCustomEvent parameters!");
    }

    private void stopTimedCustomEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_ID) && !args.isNull(EVENT_PROPERTIES)) {
            Smartlook.stopTimedCustomEvent(args.getString(EVENT_ID), args.getJSONObject(EVENT_PROPERTIES));
            callbackContext.success();
            return;
        } else if (!args.isNull(EVENT_ID)) {
            Smartlook.stopTimedCustomEvent(args.getString(EVENT_ID));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid stopTimedCustomEvent parameters!");
    }

    private void cancelTimedCustomEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_ID) && !args.isNull(REASON) && !args.isNull(CANCEL_TIMED_EVENT_PROPERTIES)) {
            Smartlook.cancelTimedCustomEvent(
                args.getString(EVENT_NAME),
                args.getString(REASON),
                args.getJSONObject(CANCEL_TIMED_EVENT_PROPERTIES));
            callbackContext.success();
            return;
        } else if (!args.isNull(EVENT_ID) && !args.isNull(REASON)) {
            Smartlook.cancelTimedCustomEvent(args.getString(EVENT_NAME), args.getString(REASON));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid cancelTimedCustomEvent parameters!");
    }

    private void trackCustomEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_NAME) && !args.isNull(EVENT_PROPERTIES)) {
            Smartlook.trackCustomEvent(args.getString(EVENT_NAME), args.getJSONObject(EVENT_PROPERTIES));
            callbackContext.success();
            return;
        } else if (!args.isNull(EVENT_NAME) && !args.isNull(CUSTOM_EVENT_KEY) && !args.isNull(CUSTOM_EVENT_VALUE)) {
            Smartlook.trackCustomEvent(args.getString(EVENT_NAME), args.getString(CUSTOM_EVENT_KEY), args.getString(CUSTOM_EVENT_VALUE));
            callbackContext.success();
            return;
        } else if (!args.isNull(EVENT_NAME)) {
            Smartlook.trackCustomEvent(args.getString(EVENT_NAME));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid trackCustomEvent parameters!");
    }

    // Event properties

    private void setGlobalEventProperties(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(GLOBAL_EVENT_PROPERTIES) && !args.isNull(IMMUTABLE_PROPERTIES)) {
            Smartlook.setGlobalEventProperties(args.getJSONObject(GLOBAL_EVENT_PROPERTIES), args.getBoolean(IMMUTABLE_PROPERTIES));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setGlobalEventProperties parameters!");
    }

    private void setGlobalEventProperty(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(KEY) && !args.isNull(VALUE) && !args.isNull(IMMUTABLE_PROPERTY)) {
            Smartlook.setGlobalEventProperty(args.getString(KEY), args.getString(VALUE), args.getBoolean(IMMUTABLE_PROPERTY));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setGlobalEventProperty parameters!");
    }

    private void removeGlobalEventProperty(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(KEY)) {
            Smartlook.removeGlobalEventProperty(args.getString(KEY));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid removeGlobalEventProperty parameters!");
    }

    private void removeAllGlobalEventProperties(CallbackContext callbackContext) throws JSONException {
        Smartlook.removeAllGlobalEventProperties();
        callbackContext.success();
    }

    // Utilities

    private void setReferrer(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(REFERRER) && !args.isNull(SOURCE)) {
            Smartlook.setReferrer(args.getString(REFERRER), args.getString(SOURCE));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setReferrer parameters!");
    }

    private void getDashboardSessionUrl(CallbackContext callbackContext) throws JSONException {
        callbackContext.success(Smartlook.getDashboardSessionUrl());
    }

    private void registerLogListener(final CallbackContext callbackContext) throws JSONException {
        Smartlook.registerLogListener(new LogListener() {
            @Override
            public void onLog(String logSeverity, String tag, String message) {
                callbackContext.success(tag + "[" + logSeverity + "]: " + message);
            }
        });
    }

    private void unregisterLogListener(CallbackContext callbackContext) throws JSONException {
        Smartlook.unregisterLogListener();
        callbackContext.success();
    }

    private void setRenderingMode(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(RENDERING_MODE)) {
            Smartlook.setRenderingMode(args.getString(RENDERING_MODE));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setReferrer parameters!");
    }

}