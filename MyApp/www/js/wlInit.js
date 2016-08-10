// Uncomment the initialization options as required. For advanced initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center
 var wlInitOptions = {
	showIOS7StatusBar: false
};
if (window.addEventListener) {
	window.addEventListener('load', function() { WL.Client.init(wlInitOptions); }, false);
} else if (window.attachEvent) {
	window.attachEvent('onload',  function() { WL.Client.init(wlInitOptions); });
}
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required.
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *
	 */
	// Common initialization code goes here
	var env = WL.Client.getEnvironment();
    if(env === WL.Environment.IPHONE || env === WL.Environment.IPAD){
        document.body.classList.add('platform-ios');
    } else if(env === WL.Environment.ANDROID){
        document.body.classList.add('platform-android');
    }
	document.dispatchEvent(new Event('mfpready'));
}