# Smartlook Cordova SDK

Official Smartlook SDK plugin for Cordova Android & iOS applications.

> ### Minimum supported versions
> 
> The minimum supported Android version is `Jelly Bean (API 18)`
> 
> The minimum supported iOS version is `13`
> 
> The minimum supported Cordova CLI version is `10.0.0`
> 
> The minimum supported Cordova Android engine is `10.1.1`

## Integration

1. Add the Cordova plugin to your project:

```npm
npm install cordova-plugin-smartlook
```
or
```Cordova
cordova plugin add cordova-plugin-smartlook
```



2. Setup and start Smartlook using the [deviceready](https://cordova.apache.org/docs/en/5.1.1/cordova/events/events.deviceready.html) callback:

```javascript
if(document.readyState === "complete") {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  	Smartlook.setProjectKey({key: "YOUR_API_KEY"});
  	Smartlook.start();
}
```



> ### Project API Key
> 
> To setup Smartlook, you need your project API key. You can find your project key in the mobile project settings in the [Smartlook app](https://app.smartlook.com/settings/projects).

3. If you cannot access TypeScript types, you need to explicitly set the type folder roots. Add the following to your project's `tsconfig.json`:

```json
"typeRoots": ["./node_modules/@types", "./node_modules/cordova-plugin-smartlook/globalTypes"]
```