
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define


define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    // var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    // require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');

    // Write your app here.
    //

    var last_reading = 0;
    var tolerance = -1;
    var time;

    function handleMotionEvent(event) {

        var x = event.accelerationIncludingGravity.x;
        var y = event.accelerationIncludingGravity.y;
        var z = event.accelerationIncludingGravity.z;

        var a = Math.sqrt(x*x + y*y + z*z) - 10;

        var diff = Math.abs(last_reading - a);
        if (diff < tolerance){
            navigator.vibrate(200); 
        }

        last_reading = a;

        //document.getElementById('abs').innerHTML = diff;
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);

    document.getElementById('walk').addEventListener('click', function(){
        statusUpdate();
        tolerance = 1; 
    }, true);

    document.getElementById('run').addEventListener('click', function(){
        statusUpdate();
        tolerance = 10; 
    }, true);

    document.getElementById('enough').addEventListener('click', function(){
        statusUpdate();
        tolerance = 0; 
    }, true);

    function statusUpdate() {
        if (time == undefined) {
            time = new Date().getTime(); 
            document.getElementById('status').innerHTML = '';
        } else {
            var diff = Math.round((new Date().getTime() - time)/1000);
            var what;

            if (tolerance == 1) { what = 'walk'}
            else { what = 'run' }

            document.getElementById('status').innerHTML = "You've managed to " +
                                what + " for " + diff + " second" + 
                                (diff >= 1?'':'s') + "!";
            time = undefined;
        }
    }

});
