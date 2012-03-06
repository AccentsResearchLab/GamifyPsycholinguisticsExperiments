var canvas = document.getElementById("accent_meter");
var ctx = canvas.getContext("2d");
canvas.width = 105;
canvas.height = 330;
var img = new Image();
    img.onload = function(){
      ctx.drawImage(img,0,0);
      /*TODO draw the scale */
      ;
    };
 img.src = './../images/meter.png';