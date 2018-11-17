function flash(){
  $('.flash')
   .show()  //show the hidden div
   .fadeOut(Math.random() * 200 + 100)
   .css({'opacity': 1});
}

$(document).ready(function() {    
  $('.flash').hide();  
  (function loop() {
    var mindelay = 200;
    var maxdelay = 2000;
    var rand = Math.round(Math.random() * (maxdelay - mindelay)) + mindelay;
    setTimeout(function() {
            flash();
            loop();  
    }, rand);
}());
});
