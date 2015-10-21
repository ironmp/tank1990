/**
 * Created by MP on 2015/10/21.
 */


var canvas = document.getElementById('canvas');
//16:10
canvas.width =500;
canvas.height = 600;//640

var ctx = canvas.getContext('2d');

var img = new Image();
img.src = './image/p1tankU.gif';
img.onload = function () {
    ctx.drawImage(img,10,250,35,35);
};
