package com.smartlook.cordovaplugin

import android.graphics.Rect
import android.webkit.WebView
import com.smartlook.android.core.api.Session
import com.smartlook.android.core.api.Smartlook
import com.smartlook.android.core.api.User
import com.smartlook.android.core.api.enumeration.Status
import com.smartlook.android.core.api.extension.isSensitive
import com.smartlook.android.core.api.model.Properties
import com.smartlook.android.core.api.model.RecordingMask
import com.smartlook.android.core.api.model.Referrer
import com.smartlook.android.core.bridge.BridgeInterface
import com.smartlook.android.core.bridge.model.BridgeFrameworkInfo
import com.smartlook.android.core.video.annotation.RenderingMode
import com.smartlook.android.util.logging.annotation.LogAspect
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject
import java.net.URL

class SmartlookPlugin : CordovaPlugin() {
    private val smartlook: Smartlook = Smartlook.instance
    private val user = smartlook.user
    private val state = smartlook.state

    override fun execute(action: String, args: JSONArray, callbackContext: CallbackContext): Boolean {
        when (action) {
            "setPluginVersion" -> {
                try {
                    val pluginVersion = args.getString(0)
                    val frameworkVersion = args.getString(1)
                    val cdvBridgeInterface = CordovaBridgeInterface(pluginVersion, frameworkVersion)

                    smartlook.bridgeInterfaces.add(cdvBridgeInterface)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "start" -> {
                WebView::class.isSensitive = false
                smartlook.start()
                callbackContext.success()
            }
            "stop" -> {
                smartlook.stop()
                callbackContext.success()
            }
            "reset" -> {
                smartlook.reset()
                callbackContext.success()
            }
            "trackEvent" -> {
                try {
                    val eventName = args.getString(0)
                    val propertiesMap = args.getJSONObject(1)
                    val properties = propertiesFromJSON(propertiesMap)

                    smartlook.trackEvent(eventName, properties)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "trackNavigationEnter" -> {
                try {
                    val name = args.getString(0)
                    val propertiesMap = args.getJSONObject(1)
                    val properties = propertiesFromJSON(propertiesMap)

                    smartlook.trackNavigationEnter(name, properties)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "trackNavigationExit" -> {
                try {
                    val name = args.getString(0)
                    val propertiesMap = args.getJSONObject(1)
                    val properties = propertiesFromJSON(propertiesMap)

                    smartlook.trackNavigationExit(name, properties)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setReferrer" -> {
                try {
                    val referrer = args.getString(0)
                    val source = args.getString(1)
                    val referrerObject = Referrer(referrer, source)

                    smartlook.referrer = referrerObject
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "putStringEventProperty" -> {
                try {
                    val propertyName = args.getString(0)
                    val value = args.getString(1)

                    smartlook.eventProperties.putString(propertyName, value)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "getStringEventProperty" -> {
                try {
                    val propertyName = args.getString(0)
                    callbackContext.success(smartlook.eventProperties.getString(propertyName))
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "removeStringEventProperty" -> {
                try {
                    val propertyName = args.getString(0)
                    smartlook.eventProperties.remove(propertyName)

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "clearEventProperties" -> {
                smartlook.eventProperties.clear()
                callbackContext.success()
            }
            "setUserIdentifier" -> {
                try {
                    val identifier = args.getString(0)
                    user.identifier = identifier

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setUserName" -> {
                try {
                    val name = args.getString(0)
                    user.name = name

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setUserEmail" -> {
                try {
                    val email = args.getString(0)
                    user.email = email

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setUserProperty" -> {
                try {
                    val propertyName = args.getString(0)
                    val value = args.getString(1)

                    user.properties.putString(propertyName, value)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "getUserProperty" -> {
                try {
                    val propertyName = args.getString(0)
                    callbackContext.success(user.properties.getString(propertyName))
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "removeUserProperty" -> {
                try {
                    val propertyName = args.getString(0)

                    user.properties.remove(propertyName)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "openNewUser" -> {
                user.openNew()
                callbackContext.success()
            }
            "getUserUrl" -> {
                callbackContext.success(user.url?.toString())
            }
            "openNewSession" -> {
                user.session.openNew()
                callbackContext.success()
            }
            "getSessionUrl" -> {
                callbackContext.success(user.session.url?.toString())
            }
            "getSessionUrlWithTimestamp" -> {
                callbackContext.success(user.session.urlWithTimestamp?.toString())
            }
            "setRelayProxyHost" -> {
                try {
                    val relayProxyHost = args.getString(0)

                    smartlook.setupConfiguration.relayProxyHost = relayProxyHost
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setProjectKey" -> {
                try {
                    val projectKey = args.getString(0)

                    smartlook.preferences.projectKey = projectKey
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setFrameRate" -> {
                try {
                    val frameRate = args.getInt(0)

                    smartlook.preferences.frameRate = frameRate
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "getFrameRate" -> {
                callbackContext.sendPluginResult(PluginResult(PluginResult.Status.OK, smartlook.preferences.frameRate!!))
            }
            "setRenderingMode" -> {
                try {
                    val renderingMethod: RenderingMode = when (args.getInt(0)) {
                        0 -> RenderingMode.NO_RENDERING
                        1 -> RenderingMode.NATIVE
                        2 -> RenderingMode.WIREFRAME
                        else -> RenderingMode.NATIVE
                    }

                    smartlook.preferences.renderingMode = renderingMethod
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setJobUploadEnabled" -> {
                try {
                    val isEnabled = args.getBoolean(0)
                    smartlook.preferences.isUploadUsingAndroidJobsEnabled = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setAdaptiveFrameRateEnabled" -> {
                try {
                    val isEnabled = args.getBoolean(0)
                    smartlook.preferences.isAdaptiveFrameRateEnabled = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }

            "getAdaptiveFrameRateEnabled" -> {
                callbackContext.sendPluginResult(PluginResult(PluginResult.Status.OK, state.isAdaptiveFrameRateEnabled))
            }
            "setSurfaceCaptureEnabled" -> {
                try {
                    val isEnabled = args.getBoolean(0)
                    smartlook.preferences.isSurfaceRecordingEnabled = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "getSurfaceCaptureEnabled" -> {
                callbackContext.sendPluginResult(PluginResult(PluginResult.Status.OK, state.isSurfaceRecordingEnabled))
            }
            "setRecordingMask" -> {
                try {
                    val recordingMaskList:MutableList<RecordingMask.Element> = mutableListOf()

                    for (i in 0 until args.length()) {
                        val maskObject = args.getJSONObject(i)

                        val isCoveringMaskType =
                            maskObject.getString("maskType").equals("COVERING")
                        val rect = maskObject.getJSONObject("maskRect")

                        val left = rect.getInt("left")
                        val top = rect.getInt("top")
                        val width = rect.getInt("width")
                        val height = rect.getInt("height")

                        val maskType =
                            if (isCoveringMaskType) RecordingMask.Element.Type.COVERING
                            else RecordingMask.Element.Type.ERASING

                        recordingMaskList.add(RecordingMask.Element(
                            Rect(left,top,left+width,top+height), maskType))
                    }
                    
                    Smartlook.instance.recordingMask = RecordingMask(recordingMaskList)
                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setWebViewSensitivity" -> {
                try {
                    val isEnabled = args.getBoolean(0)
                    WebView::class.isSensitive = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "eventTrackingEnableAll" -> {
                smartlook.preferences.eventTracking.enableAll()
                callbackContext.success()
            }
            "eventTrackingDisableAll" -> {
                smartlook.preferences.eventTracking.disableAll()
                callbackContext.success()
            }
            "eventTrackingNavigationDisableAll" -> {
                smartlook.preferences.eventTracking.navigation.disableAll()
                callbackContext.success()
            }
            "setEventTrackingNavigationEnableAll" -> {
                smartlook.preferences.eventTracking.navigation.enableAll()
                callbackContext.success()
            }
            "setEventTrackingNavigationActivityStatus" -> {
                try {
                    val isEnabled = args.getBoolean(0)
                    smartlook.preferences.eventTracking.navigation.isActivityEnabled = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setEventTrackingNavigationFragmentStatus" -> {
                try {
                    val isEnabled = args.getBoolean(0)
                    smartlook.preferences.eventTracking.navigation.isFragmentEnabled = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setEventTrackingInteractionEnableAll" -> {
                smartlook.preferences.eventTracking.interaction.enableAll()
                callbackContext.success()
            }
            "setEventTrackingInteractionDisableAll" -> {
                smartlook.preferences.eventTracking.interaction.disableAll()
                callbackContext.success()
            }
            "setEventTrackingInteractionUserStatus" -> {
                try {
                    val isEnabled = args.getBoolean(0)

                    smartlook.preferences.eventTracking.interaction.isSelectorEnabled = isEnabled
                    smartlook.preferences.eventTracking.interaction.isTouchEnabled = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "setEventTrackingInteractionRageClickStatus" -> {
                try {
                    val isEnabled = args.getBoolean(0)
                    smartlook.preferences.eventTracking.interaction.isRageClickEnabled = isEnabled

                    callbackContext.success()
                } catch (e: Exception) {
                    callbackContext.error(e.message)
                }
            }
            "restoreDefault" -> {
                smartlook.preferences.eventTracking.default()
                callbackContext.success()
            }
            "getRecordingStatus" -> {
                val status = smartlook.state.status

                if (status.isRecording) {
                    callbackContext.success(0)
                } else {
                    callbackContext.success((status as Status.NotRecording).cause.ordinal + 1)
                }
            }
            "isRecording" -> {
                val status = state.status
                callbackContext.sendPluginResult(PluginResult(PluginResult.Status.OK, status.isRecording))
            }
            "getProjectKey" -> {
                callbackContext.success(smartlook.state.projectKey)
            }
            "getStateFrameRate" -> {
                callbackContext.success(smartlook.state.frameRate)
            }
            "getRenderingMode" -> {
                callbackContext.success(smartlook.state.renderingMode.ordinal)
            }
            "enableLogs" -> {
                smartlook.log.allowedLogAspects = LogAspect.ALL
                callbackContext.success()
            }
            "registerSessionUrlChangedListener" -> {
                smartlook.user.session.listeners += object : Session.Listener {
                    override fun onUrlChanged(url: URL) {
                        callbackContext.success(url.toString())
                    }
                }
            }
            "registerUserUrlChangedListener" -> {
                smartlook.user.listeners += object : User.Listener {
                    override fun onUrlChanged(url: URL) {
                        callbackContext.success(url.toString())
                    }
                }
            }
            "removeSessionUrlChangedListener" -> {
                smartlook.user.session.listeners.clear()
                callbackContext.success()
            }
            "removeUserUrlChangedListener" -> {
                smartlook.user.listeners.clear()
                callbackContext.success()
            }
            else -> {
                callbackContext.error("Action $action is not implemented in the Cordova Smartlook Android bridge.")
                return false
            }
        }
        return true
    }

    private fun propertiesFromJSON(propertiesMap: JSONObject): Properties? {
        if (propertiesMap.length() == 0) {
            return null
        }

        val propKeys = propertiesMap.keys()
        val properties = Properties()

        while (propKeys.hasNext()) {
           val propKey = propKeys.next()
            properties.putString(propKey, propertiesMap.getString(propKey))
        }

        return properties
    }
}

class CordovaBridgeInterface(private val pluginVersion: String, private val frameworkVersion: String): BridgeInterface {
    override fun obtainFrameworkInfo(callback: (frameworkInfo: BridgeFrameworkInfo) -> Unit) {
        callback(BridgeFrameworkInfo(
            "CORDOVA",
            pluginVersion,
            frameworkVersion
            )
        )
    }
}
