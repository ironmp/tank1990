

var Tank = function (armor, missile) {
    this._id = require("zrender/tool/guid")();
    this._type = "player";
    this._born = 3;//出生倒计时
    this._direction = "up"; //方向
    this._turn = false; //转向
    this._move = false; //移动
    this._moveTicket;
    this._fire = false; //开火
    this._fireTicket;
    this._armor = armor; //装甲
    this._missile = missile; //导弹    
    TNK.Tanks.add(this._id, this);
    return this;
}
//初始化
Tank.prototype.born = function () {

    var width = Math.ceil(zr.getWidth());
    var height = Math.ceil(zr.getHeight());

    var img = this._armor[this._direction];
    var ImageShape = require("zrender/shape/Image");
    this._tank = new ImageShape({
        scale: [1, 1],
        zlevel: 1,
        style: {
            x: 330,
            y: 540,
            width: Constants.Base.width,
            height: Constants.Base.height,
            image: img
        },
        invisible: true,
        draggable: false,
        hoverable: false
    });
    zr.addShape(this._tank);
    this._Missile = new Missile(this._missile, this);
    new Born(IMG.born, this).start();//出生
}
//换弹
Tank.prototype.reload = function (missile) {
    if(missile)
        this._missile = missile; //导弹
}

Tank.prototype.turn = function (direction) {
    if (this._direction == direction || this._born != 0) return;
    this._direction = direction; //更新方位
    zr.modShape(this._tank.id, { style: { image: this._armor[direction]} });
}
//移动
Tank.prototype.move = function (direction) {
    if(this._born != 0) return;
    if (this._move == false)
        this._move = true;

    if (this._direction != direction) {//转向
        //this.ceasefire(); //停火
        this._direction = direction; //更新方位
        this.reload(); //重新装弹
    }

    var width = Math.ceil(zr.getWidth());
    var height = Math.ceil(zr.getHeight());
    var x = this._tank.style.x;
    var y = this._tank.style.y;

    switch (this._direction) {
        case "up":
            var yy = this._tank.style.y - 5;
            if (yy < 0) yy = 0;
            if (this.checkCollision(x, yy) == true) yy = this._tank.style.y;
            zr.modShape(this._tank.id, { style: { y: yy, image: this._armor[direction]} });
            break;
        case "down":
            var yy = this._tank.style.y + 5;
            if (yy > height - this._tank.style.width) yy = height - this._tank.style.width;
            if (this.checkCollision(x, yy) == true) yy = this._tank.style.y;
            zr.modShape(this._tank.id, { style: { y: yy, image: this._armor[direction]} });
            break;
        case "left":
            var xx = this._tank.style.x - 5;
            if (xx < 0) xx = 0;
            if (this.checkCollision(xx, y) == true) xx = this._tank.style.x;
            zr.modShape(this._tank.id, { style: { x: xx, image: this._armor[direction]} });
            break;
        case "right":
            var xx = this._tank.style.x + 5;
            if (xx > width - this._tank.style.height) xx = width - this._tank.style.height;
            if (this.checkCollision(xx, y) == true) xx = this._tank.style.x;
            zr.modShape(this._tank.id, { style: { x: xx, image: this._armor[direction]} });
            break;
        default:
            this._direction = "up";
            break;
    }
    //zr.refreshShapes([this._tank]);
}
//停止前进
Tank.prototype.stop = function () {
    if (this._born != 0) return;
    if (this._move == true)
        this._move = false;
    if (this._moveTicket) {
        clearInterval(this._moveTicket);
        this._moveTicket = null;
    }
}
//开火
Tank.prototype.fire = function () {
    if (this._born != 0) return;
    if (this._fire == false)
        this._fire = true;
    //TNK.Missiles.add(this._Missile._id, this._Missile);
    var postion = this._tank.style;
    var x = postion.x;
    var y = postion.y;
    switch (this._direction) {
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

    if (this._Missile._ready == true) {       
        this._Missile = new Missile(this._missile, this);
        this._Missile.reload(x, y, this._direction).fire();
    }

}
//停火
Tank.prototype.ceasefire = function () {
    if (this._born != 0) return;
    if (this._fire == true) {
        this._fire = false;
    }
    if (this._fireTicket) {
        clearInterval(this._fireTicket);
        this._fireTicket = null;
    }
}

Tank.prototype.death = function () {
    if (this._born != 0) return;
    if (this._moveTicket)
        clearInterval(this._moveTicket);

    if (TNK.Tanks.contains(this._id))
        TNK.Tanks.remove(this._id); //死掉后需删除,但canvas里只是隐藏

    zr.delShape(this._Missile._missile.id);
    zr.delShape(this._tank.id);
    //zr.modShape(this._tank.id, { invisible: true });
    //zr.refresh();
    PlayerTank = null;
    return true;

}

Tank.prototype.getLocation = function () {

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
Tank.prototype.checkCollision = function (x, y) {
    var tank = this;
    var cx = x + Math.round(this._tank.style.width / 2);
    var cy = y + Math.round(this._tank.style.height / 2);
    if (TNK.Tanks.count() > 0) {
        for (key in TNK.Tanks._hash) {//遍历哈希表
            if (TNK.Tanks._hash[key].length != 0) {
                var target = TNK.Tanks._hash[key];
                if (tank._id == target._id) continue;
                var targetLocation = target.getLocation();

                var xdiff = cx - targetLocation.cx;
                var ydiff = cy - targetLocation.cy;
                var d = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
                if (d <= 65) {//和敌军发生碰撞
                    //console.log("d:" + d);
                    playMedia(Media.Hit);
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
                //console.log("d:" + d);
                if (items2.contains(target._type) && d < 60) {
                    return true;
                }
                if (items3.contains(target._type) && d <= 44) {//
                    return true;
                }
                if (items4.contains(target._type) && d <= 50) {
                    return true;
                }
                if (target._type == 'boss' && d < 60) {
                    return true;
                }
            }
        }
    }

    return false;
}