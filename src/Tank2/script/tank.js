/**
 * Created by MP on 2015/10/21.
 */

window.onload = function() {
    var tk = {};
    tk.canvas = document.getElementById('canvas');
    //16:10
    tk.canvas.width = 500;
    tk.canvas.height = 600;//640
    var ctx = canvas.getContext('2d');

    document.onkeydown = function(e){
        console.log('down: '+ e.keyCode);
    };

    var img = new Image();
    img.src = './image/p1tankU.gif';
    img.onload = function () {
        ctx.drawImage(img,10,10,35,35);
    };
    var imgs = GetImages();

    function GetImages() {
        var path = './image/';
        var o = {};
        o.p1 = {};
        o.p2 = {};
        o.e1 = {};
        o.e2 = {};
        o.e3 = {};
        var w = 10;
        var h = 10;
        var ways = ['D', 'L', 'R', 'U'];
        ways.forEach(function (w) {
            o.p1[w] = path + 'p1tank' + w + '.gif';
            o.p2[w] = path + 'p2tank' + w + '.gif';
            o.e1[w] = path + 'enemy1' + w + '.gif';
            o.e2[w] = path + 'enemy2' + w + '.gif';
            o.e3[w] = path + 'enemy3' + w + '.gif';
        });

    }

    function loadImg(path, callback) {
        var img = new Image();
        img.src = path;
        if (callback)
            img.onload = function () {
                callback(img);
            };
    }

}
