

var EnemyTank = function (armor, missile) {
    var width = Math.ceil(zr.getWidth());
    var height = Math.ceil(zr.getHeight());
    this._id = require("zrender/tool/guid")();
    this._type = "enemy";
    this._born = 3;
    this._bornTicket;
    this._speed = 50;
    this._direction = "down"; //方向
    this._turn = false; //转向
    this._move = false; //移动
    this._moveTicket;
    this._fire = false; //开火
    this._fireTicket;
    this._firstLeave = true;
    this._points = [[0, 0], [width / 2 - Constants.Base.height / 2, 0], [width - Constants.Base.height, 0]]; //可能出生地
    this._armor = armor || IMG.ememy.enemy1; //装甲
    this._missile = missile || IMG.enemymissile.missile1; //导弹    
    TNK.Tanks.add(this._id, this);
    return this;
}

EnemyTank.prototype.born = function () {

    var p = this._points[GetRandomNum(0, 2)]; //[GetRandomNum(1, 800), GetRandomNum(1, 200)]; //
    var img = this._armor[this._direction];
    var ImageShape = require("zrender/shape/Image");
    this._tank = new ImageShape({
        scale: [1, 1],
        zlevel: 1,
        style: {
            x: p[0],
            y: p[1],
            width: Constants.Base.width,
            height: Constants.Base.height,
            image: img
        },
        invisible: true,
        draggable: false,
        hoverable: false
    });
    zr.addShape(this._tank);

    if (this._armor == IMG.ememy.enemy1) {
        this._speed += 5;
    } else if (this._armor == IMG.ememy.enemy2) {
        this._speed += 15;
    } else if (this._armor == IMG.ememy.enemy3) {
        this._speed += 35;
    }
    this._Missile = new Missile(this._missile, this);
    new Born(IMG.born, this).start(); //出生
    return this;
}

EnemyTank.prototype.run = function () {

    var obj = this;
    //--------------------born------------------------
    //this.bornTime();
    //--------------------move-------------------------
    var _moveTicket;
    if (_moveTicket)
        clearInterval(_moveTicket);

    _moveTicket = setInterval(function () {
        if (TNK.Pause == false && obj._born == 0)
            _run();
    }, obj._speed);
    this._moveTicket = _moveTicket;

    var directions = ["down", "left", "up", "right"];
    var _direction = directions[parseInt(Math.random() * 100 / 25)];
    var _count = 0;
    function _run() {
        try {
            var needTurn = _move(_direction);

            if (needTurn && _count >= 10) {
                _count = 0;
                var ds = directions.concat();
                ds.remove(_direction);
                _direction = ds[parseInt(Math.random() * 75 / 25)];
            }
            _count++;
        } catch (e) {
            console.log(e);
            clearInterval(_moveTicket);
        }
    }

    function _move(direction) {
        if (obj._move == false)
            obj._move = true;

        if (direction != undefined && obj._direction != direction) {//转向
            obj._direction = direction; //更新方位
            //this.reload(); //重新装弹
        }

        var width = Math.ceil(zr.getWidth());
        var height = Math.ceil(zr.getHeight());
        var needTurn = false;
        zr.modShape(obj._tank.id, { style: { image: obj._armor[direction]} });
        var x = obj._tank.style.x;
        var y = obj._tank.style.y;

        switch (direction) {
            case "up":
                var yy = obj._tank.style.y - 5;
                if (yy < 0 || obj.checkCollision(x, yy) == true) {
                    yy = 0;
                    needTurn = true;
                    break;
                }
                zr.modShape(obj._tank.id, { style: { y: yy, image: obj._armor[direction]} });
                break;
            case "down":
                var yy = obj._tank.style.y + 5;
                if (yy > height - obj._tank.style.width || obj.checkCollision(x, yy) == true) {
                    yy = height - obj._tank.style.width;
                    needTurn = true;
                    break;
                }
                zr.modShape(obj._tank.id, { style: { y: yy, image: obj._armor[direction]} });
                break;
            case "left":
                var xx = obj._tank.style.x - 5;
                if (xx < 0 || obj.checkCollision(xx, y) == true) {
                    xx = 0;
                    needTurn = true;
                    break;
                }
                zr.modShape(obj._tank.id, { style: { x: xx, image: obj._armor[direction]} });
                break;
            case "right":
                var xx = obj._tank.style.x + 5;
                if (xx > width - obj._tank.style.height || obj.checkCollision(xx, y) == true) {
                    xx = width - obj._tank.style.height;
                    needTurn = true;
                    break;
                }
                zr.modShape(obj._tank.id, { style: { x: xx, image: obj._armor[direction]} });
                break;
            default:
                obj._direction = "down";
                break;
        }
        //zr.refreshShapes([obj._tank]);
        var rand = GetRandomNum(0, 100);

        if (needTurn == false && rand >= 99) {
            needTurn = true;
        }
        //console.log("postion(" + obj._tank.style.x + "," + obj._tank.style.y + ")");
        return needTurn;
    }

    //-----------------shoot----------------------
    if (this._fireTicket)
        clearInterval(this._fireTicket);

    this._fireTicket = setInterval(function () {
        if (TNK.Pause == false && obj._born == 0)
            _fire();
    }, 50);

    function _fire() {

        var postion = obj._tank.style;
        var x = postion.x;
        var y = postion.y;
        switch (obj._direction) {
            case "up":
                x += postion.width / 2;
                break;
            case "down":
                x += postion.width / 2;
                y += postion.height;
                break;
            case "left":
                y += postion.height / 2;
                break;
            case "right":
                x += postion.width;
                y += postion.height / 2;
                break;
            default:
                break;
        }
        var rand = GetRandomNum(0, 100);
        if (obj._Missile._ready == true && rand >= 99) {
            obj._Missile = new Missile(obj._missile, obj);
            obj._Missile.reload(x, y, obj._direction).fire();
        }
    }

}

EnemyTank.prototype.death = function () {  
    if (this._moveTicket)
        clearInterval(this._moveTicket);

    if (this._fireTicket)
        clearInterval(this._fireTicket); //已经发射导弹不用管，这里停止的是预发射

    zr.delShape(this._Missile._missile.id);
    zr.delShape(this._tank.id);

    if (TNK.Tanks.contains(this._id))
        TNK.Tanks.remove(this._id);

    //zr.refresh();

    //console.log('enemy death ' + this._id);
    return true;
}

EnemyTank.prototype.getLocation = function () {

    var p = {
        x: this._tank.style.x,
        y: this._tank.style.y,
        width: this._tank.style.width,
        height: this._tank.style.height,
        cx: this._tank.style.x + Math.round(this._tank.style.width / 2),
        cy: this._tank.style.y + Math.round(this._tank.style.height / 2)
    }
    return p;
}

//碰撞检测
EnemyTank.prototype.checkCollision = function (x, y) {
    var tank = this;
    var cx = x + Math.round(this._tank.style.width / 2);
    var cy = y + Math.round(this._tank.style.height / 2);

    //检测是否已经不在出生地
    var flag = true;
    if (this._firstLeave == true) {
        for (var i = 0; i < this._points.length; i++) {
            var p = this._points[i];
            var tx = p[0] + Math.round(this._tank.style.width / 2);
            var ty = p[1] + Math.round(this._tank.style.height / 2);
            var xdiff = cx - tx;
            var ydiff = cy - ty;
            var d = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
            if (d <= 65) {
                flag = false;
                break;
            }
        }
    }

    if (flag && TNK.Tanks.count() > 0) {
        for (key in TNK.Tanks._hash) {//遍历哈希表
            if (TNK.Tanks._hash[key].length != 0) {
                var target = TNK.Tanks._hash[key];
                if (tank._id == target._id) continue;
                var targetLocation = target.getLocation();

                var xdiff = cx - targetLocation.cx;
                var ydiff = cy - targetLocation.cy;
                var d = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
                if (d <= 65) {//发生碰撞
                    //console.log("d:" + d);
                    return true;
                }
            }
        }
    }

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

                var xdiff = cx - targetLocation.cx;
                var ydiff = cy - targetLocation.cy;
                var d = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);

                if (items2.contains(target._type) && d < 60) {
                    return true;
                }
                if (items3.contains(target._type) && d <= 44) {//
                    return true;
                }
                if (items4.contains(target._type) && d <= 50) {
                }
                if (target._type == 'boss' && d < 60) {
                    return true;
                }
            }
        }
    }

    return false;
}
//无敌时间 隐身状态
EnemyTank.prototype.bornTime = function () {
    var tank = this;
    if (this._bornTicket)
        clearInterval(this._bornTicket);

    this._bornTicket = setInterval(function () {
        if (tank._born != 0) {
            tank._born--;
            zr.modShape(tank._tank.id, { style: { text: tank._born} });
        } else {
            zr.modShape(tank._tank.id, { style: { text: ''} });
            clearInterval(tank._bornTicket);
        }
    }, 1000);

}













