/**
 * Created by MP on 2015/10/22.
 */


var TK = function(canvas){
    var p1,p2,cvs,ctx,
        w = 35,
        h = 35,
        keyCode ={
            // w 87/ s 83/ a 65/ d 68
            'W':87,
            'S':83,
            'A':65,
            'D':68
        }
        ways = ['D', 'L', 'R', 'U'],
        speed={
          'slow':2,
          'normal':4,
          'fast':5
        },
        tank = function(img,x,y,width,height,missile){
            var t = this;
            ways.forEach(function (w) {
                var i = new Image();
                i.src = img[w];
                i.onload = function () {
                    t[w] = i;
                    t.tank = i;
                }
            });
            this.x = 10;
            this.y = 10;
            this.w = w;
            this.h = h;
            this.speed = speed.normal;
            if(x) this.x = x;
            if(y) this.y = y;
            if(width) this.w = width;
            if(height) this.h = height;
            if(missile) this.missile = missile;
            this.turnTo = function(kc){
                switch (kc){
                    case keyCode.A: this.tank = this['L']; break;
                    case keyCode.D: this.tank = this['R']; break;
                    case keyCode.S: this.tank = this['D']; break;
                    case keyCode.W: this.tank = this['U']; break;
                }
            }
            this.moveUp = function(){
                this.y += this.speed;
            }
            this.moveDown = function(){
                this.y -= this.speed;
            }
            this.moveLeft = function(){
                this.x -= this.speed;
            }
            this.moveRight = function(){
                this.x += this.speed;
            }
            this.moveTo = function(kc){
                switch (kc){
                    case keyCode.A: this.moveLeft(); break;
                    case keyCode.D: this.moveRight(); break;
                    case keyCode.S: this.moveDown(); break;
                    case keyCode.W:this.moveUp(); break;
                }
            }
        },
        IMG = (function() {
        var path = './image/';
        var o = {};
        o.p1 = {};
        o.p2 = {};
        o.e1 = {};
        o.e2 = {};
        o.e3 = {};
        var w = 10;
        var h = 10;
        ways.forEach(function (w) {
            o.p1[w] = path + 'p1tank' + w + '.gif';
            o.p2[w] = path + 'p2tank' + w + '.gif';
            o.e1[w] = path + 'enemy1' + w + '.gif';
            o.e2[w] = path + 'enemy2' + w + '.gif';
            o.e3[w] = path + 'enemy3' + w + '.gif';
        });
        return o;
    })()
        ;

    cvs = document.getElementById(canvas);
    ctx = cvs.getContext('2d');
    //16:10
    cvs.width = 500;
    cvs.height = 600;//640
    this.setSize = function(w,h){
        if(w)cvs.width = w;
        if(h)cvs.height = h;
    };
    this.initData = function(){
        p1 = new tank(IMG.p1);
    };
    this.start = function(){
        requestAnimationFrame(go);
    }
    function go(){
        ctx.drawImage(p1.tank,p1.x,p1.y,p1.w,p1.h);
        //ctx.drawImage(img,10,10,35,35);
        requestAnimationFrame(go);
    }
    document.onkeydown = function(e){
        // w 87/ s 83/ a 65/ d 68
        p1.turnTo(e.keyCode);
    }
    document.onkeyup = function(e){
        p1.turnTo(e.keyCode);
    }
    document.onkeypress = function(e){
        p1.moveTo(e.keyCode);
    }

}