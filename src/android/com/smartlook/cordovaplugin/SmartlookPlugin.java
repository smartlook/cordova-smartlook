package com.smartlook.cordovaplugin;

import android.app.Activity;

import com.smartlook.sdk.smartlook.Smartlook;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.webkit.WebView;

public class SmartlookPlugin extends CordovaPlugin {

    private static final String TAG = SmartlookPlugin.class.getSimpleName();

    // API methods names
    private static final String SETUP_AND_START_RECORDING = "setupAndStartRecording";
    private static final String SETUP = "setup";
    private static final String START_RECORDING = "startRecording";
    private static final String STOP_RECORDING = "stopRecording";
    private static final String IS_RECORING = "isRecording";
    private static final String START_FULLSCREEN_SENSITIVE_MODE = "startFullscreenSensitiveMode";
    private static final String STOP_FULLSCREEN_SENSITIVE_MODE = "stopFullscreenSensitiveMode";
    private static final String IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE = "isFullscreenSensitiveModeActive";
    private static final String SET_USER_IDENTIFIER = "setUserIdentifier";
    private static final String START_TIMED_CUSTOM_EVENT = "startTimedCustomEvent";
    private static final String TRACK_CUSTOM_EVENT = "trackCustomEvent";
    private static final String SET_GLOBAL_EVENT_PROPERTIES = "setGlobalEventProperties";
    private static final String SET_GLOBAL_EVENT_PROPERTY = "setGlobalEventProperty";
    private static final String REMOVE_GLOBAL_EVENT_PROPERTY = "removeGlobalEventProperty";
    private static final String REMOVE_ALL_GLOBAL_EVENT_PROPERTIES = "removeAllGlobalEventProperties";

    // Arguments
    private static final int SMARTLOOK_API_KEY = 0;
    private static final int FPS = 1;
    private static final int IDENTIFIER = 0;
    private static final int SESSION_PROPERTIES = 1;
    private static final int EVENT_NAME = 0;
    private static final int EVENT_PROPERTIES = 1;
    private static final int GLOBAL_EVENT_PROPERTIES = 0;
    private static final int IMMUTABLE_PROPERTIES = 1;
    private static final int KEY = 0;
    private static final int VALUE = 1;
    private static final int IMMUTABLE_PROPERTY = 2;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case SETUP_AND_START_RECORDING:
                setupAndStartRecording(args, callbackContext);
                return true;
            case SETUP:
                setup(args, callbackContext);
                return true;
            case START_RECORDING:
                startRecording(callbackContext);
                return true;
            case STOP_RECORDING:
                stopRecording(callbackContext);
                return true;
            case IS_RECORING:
                isRecording(callbackContext);
                return true;
            case START_FULLSCREEN_SENSITIVE_MODE:
                startFullscreenSensitiveMode(callbackContext);
                return true;
            case STOP_FULLSCREEN_SENSITIVE_MODE:
                stopFullscreenSensitiveMode(callbackContext);
                return true;
            case IS_FULLSCREEN_SENSITIVE_MODE_ACTIVE:
                isFullscreenSensitiveModeActive(callbackContext);
                return true;
            case SET_USER_IDENTIFIER:
                setUserIdentifier(args, callbackContext);
                return true;
            case START_TIMED_CUSTOM_EVENT:
                startTimedCustomEvent(args, callbackContext);
                return true;
            case TRACK_CUSTOM_EVENT:
                trackCustomEvent(args, callbackContext);
                return true;
            case SET_GLOBAL_EVENT_PROPERTIES:
                setGlobalEventProperties(args, callbackContext);
                return true;
            case SET_GLOBAL_EVENT_PROPERTY:
                setGlobalEventProperty(args, callbackContext);
                return true;
            case REMOVE_GLOBAL_EVENT_PROPERTY:
                removeGlobalEventProperty(args, callbackContext);
                return true;
            case REMOVE_ALL_GLOBAL_EVENT_PROPERTIES:
                removeAllGlobalEventProperties(callbackContext);
                return true;
            default:
                callbackContext.error("Unknow action");
                return false;
        }
    }

    private void setupAndStartRecording(final JSONArray args, final CallbackContext callbackContext) throws JSONException {

        if (!args.isNull(SMARTLOOK_API_KEY) && !args.isNull(FPS)) {
            Smartlook.setup(args.getString(SMARTLOOK_API_KEY), cordova.getActivity(), args.getInt(FPS));
            Smartlook.unregisterBlacklistedClass(WebView.class);
            Smartlook.startRecording();
            callbackContext.success();
            return;
        } else if (!args.isNull(SMARTLOOK_API_KEY)) {
            Smartlook.setup(args.getString(SMARTLOOK_API_KEY), cordova.getActivity());
            Smartlook.unregisterBlacklistedClass(WebView.class);
            Smartlook.startRecording();
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setupAndStartRecording parameters!");
    }

    private void setup(JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (!args.isNull(SMARTLOOK_API_KEY) && !args.isNull(FPS)) {
            Smartlook.setup(args.getString(SMARTLOOK_API_KEY), cordova.getActivity(), args.getInt(FPS));
            Smartlook.unregisterBlacklistedClass(WebView.class);
            callbackContext.success();
            return;
        } else if (!args.isNull(SMARTLOOK_API_KEY)) {
            Smartlook.setup(args.getString(SMARTLOOK_API_KEY), cordova.getActivity());
            Smartlook.unregisterBlacklistedClass(WebView.class);
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid setupAndStartRecording parameters!");
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

    private void startTimedCustomEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_NAME) && !args.isNull(EVENT_PROPERTIES)) {
            Smartlook.startTimedCustomEvent(args.getString(EVENT_NAME), args.getJSONObject(EVENT_PROPERTIES));
            callbackContext.success();
            return;
        } else if (!args.isNull(EVENT_NAME)) {
            Smartlook.startTimedCustomEvent(args.getString(EVENT_NAME));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid startTimedCustomEvent parameters!");
    }

    private void trackCustomEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!args.isNull(EVENT_NAME) && !args.isNull(EVENT_PROPERTIES)) {
            Smartlook.trackCustomEvent(args.getString(EVENT_NAME), args.getJSONObject(EVENT_PROPERTIES));
            callbackContext.success();
            return;
        } else if (!args.isNull(EVENT_NAME)) {
            Smartlook.trackCustomEvent(args.getString(EVENT_NAME));
            callbackContext.success();
            return;
        }

        callbackContext.error("Invalid trackCustomEvent parameters!");
    }

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
}