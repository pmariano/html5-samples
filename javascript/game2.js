const HALFIMAGEDIMENSION = 75;
const HALFCANVASWIDTH = 300;
const HALFCANVASHEIGHT = 200;
var image = new Image();
image.src = "http://sergiolopes.github.com/css3-experimentos/logo-caelum-css3/caelum-logo.png";
var canvas = null;
var context2D = null;
var currentFunction = null;
var currentTime = 0;
var sineWave = 0;

$(document).ready(function(){
	init2();
})

function init2()
{
   canvas = document.getElementById('outro_canvas');
   context2D = canvas.getContext('2d');
   setInterval(draw2, 33);
   currentFunction = alpha;
}

function draw2()
{
    currentTime += 0.04;
    sineWave = (Math.sin(currentTime) + 1) / 2;

    context2D.clearRect(0, 0, canvas.width, canvas.height);

    context2D.save();

    context2D.translate(HALFCANVASWIDTH - HALFIMAGEDIMENSION, HALFCANVASHEIGHT - HALFIMAGEDIMENSION);

    currentFunction();

   context2D.drawImage(image, 0, 0);

   context2D.restore();
}

function alpha()
{
    context2D.globalAlpha = sineWave;
}

function shear()
{
    context2D.transform(1, 0, (sineWave - 0.5), 1, 0, 0);
}

function scale()
{
    context2D.translate(HALFIMAGEDIMENSION * (1 - sineWave), HALFIMAGEDIMENSION * (1 - sineWave));
    context2D.scale(sineWave, sineWave);
}

function rotate()
{
    context2D.translate(HALFIMAGEDIMENSION, HALFIMAGEDIMENSION);
    context2D.rotate(sineWave * Math.PI * 2);
    context2D.translate(-HALFIMAGEDIMENSION, -HALFIMAGEDIMENSION);
}

