package com.smartlook.cordovaplugin;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.util.Log;
import android.os.Bundle;

import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import com.smartlook.sdk.smartlook.Smartlook;

public class SmartlookPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("init")) {
            this.init(args.getString(0), callbackContext);
            return true;
        }
        return false;
    }

    private void init(final String apiKey, final CallbackContext callbackContext) {
        if (apiKey != null && apiKey.length() > 0) {
            final Activity activity = cordova.getActivity();

            activity.runOnUiThread(new Runnable() {
                public void run() {
                    Smartlook.initIrregular(apiKey, activity);
                    callbackContext.success(); // Thread-safe.
                }
            });
        } else {
            callbackContext.error("Expected non-empty apiKey argument.");
        }
    }
}
