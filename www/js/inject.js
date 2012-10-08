// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
    initCanvas();
}

// the canvas context
var context;
var lineY = 0;
var w;
var h;
var iv;

function initCanvas(){
    w = $('#canvaspage').width();
    h = $('#canvaspage').height()-3;
    $('#canvaspage').html('<canvas id="cv" width="'+w+'" height="'+h+'"></canvas>');
    var canvas = document.getElementById("cv");
    context = canvas.getContext("2d");
    
    console.log('hello canvas',w,h,context);
    iv = setInterval( addLine , 20 );


}

function addLine(){
    var rex = rhex();
    context.strokeStyle = rex;
    context.beginPath();
    context.moveTo(0,lineY);
    context.lineTo(w,lineY);
    context.stroke();
    lineY = (lineY+1) % h;
    //console.log(lineY , rex );
}

function rhex(){
    var pool = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var hex = '#';
    for( var i = 0 ; i < 6 ; i++){
        hex += pool[ Math.floor( Math.random() * pool.length ) ];
    }
    return hex;
}






/*

ACCELEROMETER EXAMPLE

// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
    startWatch();
}

// Start watching the acceleration
//
function startWatch() {

    // Update acceleration every 3 seconds
    var options = { frequency: 200 };
    var element = document.getElementById('accelerometer');
    element.innerHTML = "waiting...";
    var delay = setTimeout( function(){
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    } , 2000);
    
}

// Stop watching the acceleration
//
function stopWatch() {
    var element = document.getElementById('accelerometer');
    element.innerHTML = "waiting...";
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';
}

// onError: Failed to get the acceleration
//
function onError() {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Error!';
}

*/