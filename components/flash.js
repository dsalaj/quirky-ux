function flash(min_time, var_time, flash_overlay_class){
  var flash_els = document.getElementsByClassName(flash_overlay_class);
  Array.prototype.forEach.call(flash_els, function(el) {
    el.style.display = "";
    var s = el.style;
    s.opacity = 1;
    (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,Math.random() * var_time + min_time)})();
  });
}

function init_flash(flash_overlay_class, mindelay, maxdelay, min_time, var_time) {
  var flash_els = document.getElementsByClassName(flash_overlay_class);
  Array.prototype.forEach.call(flash_els, function(el) {
    el.style.display = "none";
  });
  function loop() {
    var rand = Math.round(Math.random() * (maxdelay - mindelay)) + mindelay;
    setTimeout(function() {
      flash(min_time, var_time, flash_overlay_class);
      loop();
    }, rand);
  };
  loop();
};

init_flash("flash", 500, 2000, 10, 30);
init_flash("flash-horror", 50, 500, 4, 8);
