

var deg = 0;
var screenOrientation = 0;
		
// The watch id references the current `watchHeading`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	startWatch();
}

// Start watching the compass
//
function startWatch() {

	// Update compass every 1/2 seconds
	var options = { frequency: 500 };

	watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

// Stop watching the compass
//
function stopWatch() {
	if (watchID) {
		navigator.compass.clearWatch(watchID);
		watchID = null;
	}
}

// onSuccess: Get the current heading
//
function onSuccess(heading) {
	//var element = document.getElementById('heading');
	deg = 360 - (screenOrientation + heading.magneticHeading);
	//element.innerHTML = 'Heading: ' + deg;
	
	var compass = document.getElementById('compass');
	compass.style.webkitTransform = "rotate(" + deg + "deg)";  
	
}

// onError: Failed to get the heading
//
function onError(compassError) {
	alert('Compass error: ' + compassError.code);
}


//correct angle for screen orientation
function doOnOrientationChange(){
    
	switch(window.orientation){  
		case -90:
			screenOrientation = -90;
			break; 
		case 90:
			screenOrientation = 90;
			break; 
		default:
			screenOrientation = 0;
			break; 
	}
}
  
window.addEventListener('orientationchange', doOnOrientationChange);




