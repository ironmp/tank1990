/**
 * Created by MP on 2015/10/21.
 */

window.onload = function() {
    //var canvas = document.getElementById('canvas');
    ////16:10
    //canvas.width = 500;
    //canvas.height = 600;//640
    //var ctx = canvas.getContext('2d');
    //
    ////document.onkeydown = function(e){
    ////    console.log('down: '+ e.keyCode);
    ////};
    ////document.onkeypress = function(e){
    ////    console.log('press: '+ e.keyCode);
    ////};
    //var img = new Image();
    //img.src = './image/p1tankU.gif';
    //img.onload = function () {
    //    ctx.drawImage(img,10,10,35,35);
    //};

    var tk = new TK('canvas');
    tk.initData();
    tk.start()
}
