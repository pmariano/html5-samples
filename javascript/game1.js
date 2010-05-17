
var x = 0;
var y = 0;
var xDirection = 1;
var yDirection = 1;
var image = new Image();
image.src = "http://sergiolopes.github.com/css3-experimentos/logo-caelum-css3/caelum-logo.png";
var canvas2 = null;
var context2D2 = null;


$(document).ready(function(){
	init();
})

function init()
{
   canvas2 = document.getElementById('canvas');
   context2D2 = canvas2.getContext('2d');
   setInterval(draw, 30);
}

function draw()
{
   context2D2.clearRect(0, 0, canvas2.width, canvas2.height);
   context2D2.drawImage(image, x, y);
   x += 1 * xDirection;
   y += 1 * yDirection;

   if (x >= 450)
   {
      x = 450;
      xDirection = -1;
   }
   else if (x <= 0)
   {
      x = 0;
      xDirection = 1;
   }

   if (y >= 250)
   {
      y = 250;
      yDirection = -1;
   }
   else if (y <= 0)
   {
      y = 0;
      yDirection = 1;
   }
}

