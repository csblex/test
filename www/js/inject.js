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
var initted = false;

var point;
var vector;

function initCanvas(){
    if(initted) return;
    w = $('#canvaspage').width();
    h = $('#canvaspage').height()-3;
    $('#canvaspage').prepend('<canvas id="cv" width="'+w+'" height="'+h+'"></canvas>');
    
    point = {};
    point.x = w * 0.5;
    point.y = h * 0.5;

    vector = {x:0,y:0};

    var canvas = document.getElementById("cv");
    context = canvas.getContext("2d");
    
    console.log('hello canvas',w,h,context);
    iv = setInterval( function(){
            addLine();
            updatePoint();
    } , 20 );


    $.event.special.tap.tapholdThreshold = 20;

    $('#button1').bind('tap taphold' , function(event){
        //event.preventDefault();
        buttonclick(1);
    } );
    $('#button2').bind('tap taphold' , function(event){
        //event.preventDefault();
        buttonclick(2);
    } );


    var watchID = navigator.accelerometer.watchAcceleration(function(a){
        vector.x = a.x * 1;
        vector.y = a.y * -1;
    }, function(){/*error*/},{ frequency: 100 });

    initted = true;

}

function updatePoint(){
    s = 3;
    point.x += vector.x * s;
    point.y += vector.y * s;
    point.x = Math.max( Math.min(point.x , w) , 0);
    point.y = Math.max( Math.min(point.y , h) , 0);

    context.beginPath();
    context.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = '#000';
    context.fill();
    
    
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

function buttonclick(i){
    console.log('click');
    var col = '#ff0000';
    if( i == 1 ) col = '#00ff00';

    rx = Math.floor( Math.random() * w );
    ry = Math.floor( Math.random() * h );

    context.beginPath();
    context.arc(rx, ry, 100, 0, 2 * Math.PI, false);
    context.fillStyle = col;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();

    navigator.notification.vibrate(20);
    //navigator.notification.alert('message', function(){} , 'title' , 'buttonname');

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