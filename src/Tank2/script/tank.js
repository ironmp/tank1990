/**
 * Created by MP on 2015/10/21.
 */


var canvas = document.getElementById('canvas');
//16:10
canvas.width =500;
canvas.height = 600;//640
var ctx = canvas.getContext('2d');

//var img = new Image();
//img.src = './image/p1tankU.gif';
//img.onload = function () {
//    ctx.drawImage(img,10,250,35,35);
//};

function init(){
    var path = './image/';
    var o = {};
    o.p1 = {};
    o.p2 = {};
    o.e1 = {};
    o.e2 = {};
    o.e3 = {};
    var w = 10;
    var h = 10;
    var ways = ['D','L','R','U'];
    ways.forEach(function(way){
        loadImg(path + 'p1tank' + way + '.gif',function(img){
            o.p1[way] = img;//path + 'p1tank' + w + '.gif';
            ctx.drawImage(img,w,h,35,35);
            w += 40;
            h += 40;
        });

        //o.p2[w] = path + 'p2tank' + w + '.gif';
        //o.e1[w] = path + 'enemy1' + w + '.gif';
        //o.e2[w] = path + 'enemy2' + w + '.gif';
        //o.e3[w] = path + 'enemy3' + w + '.gif';
    });

}
function loadImg(path,callback){
    var img = new Image();
    img.src = path;
    if(callback)
        img.onload = function(){
            callback(img);
        };
}

init();

