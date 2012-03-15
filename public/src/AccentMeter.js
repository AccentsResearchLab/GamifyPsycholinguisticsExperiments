var canvas = document.getElementById("accent_meter");
var ctx = canvas.getContext("2d");
canvas.width = 180;
canvas.height = 450;
var img = new Image();
    img.onload = function(){
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      /*TODO draw the scale */
      ;
    };
 img.src = './../images/meter.png';
