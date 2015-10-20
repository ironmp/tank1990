
/*
 *	
 */
var Missile = function (img, source) {
    if (!img || !source) {
        console.log('img or source is invalid');
        return null;
    }
    this._id = require("zrender/tool/guid")();
    this._type = "missile";
    this._source = source._type || ''; //来源，玩家或者电脑坦克
    this._step = 3; //移动单元
    this._ready = true;
    this._fireTicket;
    this._points = [];
    this._img = img;
    this._direction;
    this._level = 1; //导弹级别
    this._speed = 5; //导弹速度

    var sourceLocation = source.getLocation();
    var ImageShape = require("zrender/shape/Image");
    this._missile = new ImageShape({
        scale: [1, 1],
        zlevel: 1,
        style: {
            x: sourceLocation.x,
            y: sourceLocation.y,
            width: 15,
            height: 15,
            image: img
        },
        invisible: true,
        draggable: false,
        hoverable: false
    });
    zr.addShape(this._missile);
    return this;
}
//装弹
Missile.prototype.reload = function (startX, startY, direction) {
    if (this._ready == false) return this; //没有准备就绪
    //获取移动单位
    var width = Math.ceil(zr.getWidth());
    var height = Math.ceil(zr.getHeight());
    this._points.clear();
    this._direction = direction;
    switch (direction) {
        case "down":
            var d = height - startY;
            for (var i = startY; i <= height; i += this._step) {
                var p = [startX - this._missile.style.width / 2, i];
                this._points.push(p);
            }
            break;
        case "up":
            var d = startY;
            for (var i = startY; i >= 0; i -= this._step) {
                var p = [startX - this._missile.style.width / 2, i - this._step * 3];
                this._points.push(p);
            }
            break;
        case "left":
            var d = startX;
            for (var i = startX; i >= 0; i -= this._step) {
                var p = [i - this._step * 3, startY - this._missile.style.height / 2];
                this._points.push(p);
            }
            break;
        case "right":
            var d = width - startX;
            for (var i = startX; i <= width; i += this._step) {
                var p = [i, startY - this._missile.style.height / 2];
                this._points.push(p);
            }
            break;
        default:
            break;
    }
    return this;
}
//开火
Missile.prototype.fire = function () {
    if (this._ready == false) return;

    var obj = this;
    obj._ready = false;
    var _id = obj._missile.id;
    var points = obj._points;
    var animationTicket;
    if (animationTicket)
        clearInterval(animationTicket);

    animationTicket = setInterval(function () {
        if (TNK.Pause == false)
            _fire();
    }, obj._speed);
    obj._fireTickey = animationTicket;

    if (obj._source == 'player')
        playMedia(Media.Fire); //media

    function _fire() {
        try {
            if (!animationTicket) return;

            if (points && points.length > 0) {
                var p = points[0];
                //碰撞检测
                _check(p);
                zr.modShape(obj._missile.id, { invisible: false, style: { x: p[0], y: p[1]} });
                //zr.refresh();
                points.removeAt(0);
            } else {
                //console.log(e);
                _death();
            }
        } catch (e) {
            console.log(e);
            _death();
        }
    }
    //var area = require("zrender/tool/area")
    //碰撞检测
    function _check(point) {
        var self = obj._source;
        var selfLocation = obj.getLocation();
        //检测坦克碰撞
        if (TNK.Tanks.count() > 0) {
            for (key in TNK.Tanks._hash) {//遍历哈希表
                if (TNK.Tanks._hash[key].length != 0) {
                    var target = TNK.Tanks._hash[key];
                    if (self == target._type) continue;
                    var targetLocation = target.getLocation();
                    var xdiff = selfLocation.cx - targetLocation.cx;
                    var ydiff = selfLocation.cy - targetLocation.cy;
                    var d = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
                    if (d <= 38) {
                        var isView = target.death();
                        _death();
                        if (isView == true)
                            new Blast(IMG.blast, targetLocation.cx, targetLocation.cy).start();
                        break;
                    }
                    //敌军导弹
                    if (!target._Missile) continue;
                    var missile = target._Missile;
                    if (missile._ready == false) {
                        var missileLocation = missile.getLocation();
                        var xdiff = selfLocation.cx - missileLocation.cx;
                        var ydiff = selfLocation.cy - missileLocation.cy;
                        var d = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
                        if (d <= 15) {
                            //console.log(new Date().getTime() + " death :" + d + ",self:" + obj._missile.id + "," + obj._source + ",target:" + missile._missile.id);
                            if (missile._ready == false)
                                missile.death();
                            _death();
                            break;
                        }
                    }
                }
            }
        }
        //检测和墙等碰撞
        var items = ['water', 'grass']; //60*60
        var items2 = ['walls', 'steels']; //60*60
        var items3 = ['wall', 'steel']; //30*30
        var items4 = ['timer', 'star', 'bomb']; //40*40
        if (TNK.Shapes.count() > 0) {
            for (key in TNK.Shapes._hash) {//遍历哈希表
                if (TNK.Shapes._hash[key].length != 0) {
                    var target = TNK.Shapes._hash[key];
                    if (items.contains(target._type)) continue;
                    var targetLocation = target.getLocation();
                    var xdiff = selfLocation.cx - targetLocation.cx;
                    var ydiff = selfLocation.cy - targetLocation.cy;
                    var d = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);

                    if (items2.contains(target._type) && d <= 38) {//walls steels
                        target.death(obj._direction, obj._level);
                        _death();
                    }
                    if (items3.contains(target._type) && d <= 23) {//wall steel
                        target.death(obj._direction, obj._level);
                        _death();

                    }
                    if (items4.contains(target._type) && d <= 28) {
                        //导弹直接穿过
                        //_death();
                    }
                    if (target._type == 'boss' && d <= 38) {
                        target.death(obj._direction, obj._level);
                        _death();
                        new Blast(IMG.blast, targetLocation.cx, targetLocation.cy).start();
                    }
                }
            }
        }
    }

    function _death() {
        //console.log('self death:' + obj._missile.id + ",source:" + obj._source);
        if (animationTicket) {
            clearInterval(animationTicket);
            animationTicket = null;
        }
        obj._points.clear();
        obj._ready = true;

        zr.delShape(obj._missile.id);
        //zr.modShape(obj._missile.id, { invisible: true });
        //zr.refresh();
        ///zr.refreshShapes([obj._missile]);

    }
}
//停火
Missile.prototype.ceasefire = function () {

    if (!this._fireTicket) {

    }
}

Missile.prototype.death = function () {
    var animationTicket = this._fireTicket;
    if (animationTicket) {
        clearInterval(animationTicket);
        animationTicket = null;
    }
    this._points.clear();
    this._ready = true;
    //zr.modShape(this._missile.id, { invisible: true });
    zr.delShape(this._missile.id);
    //zr.refresh();
    //console.log('missile death:' + this._missile.id + ",source:" + this._source);
}

Missile.prototype.getLocation = function () {

    var p = {
        x: this._missile.style.x,
        y:this._missile.style.y,
        width: this._missile.style.width,
        height:this._missile.style.height,
        cx: this._missile.style.x + Math.round(this._missile.style.width / 2),
        cy: this._missile.style.y + Math.round(this._missile.style.height / 2)
    }
    return p;
}