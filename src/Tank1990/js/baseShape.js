

var Shape = function (img, type, w, h, xx, yy,level) {
    this._id = require("zrender/tool/guid")();
    this._type = type;
    this._img = img;
    this._level = level || 1;

    var ImageShape = require("zrender/shape/Image");
    this._shape = new ImageShape({
        _type: type,
        scale: [1, 1],
        zlevel: 0,
        style: {
            x: xx ? xx : 0,
            y: yy ? yy : 0,
            width: w ? w : Constants.Base.width,
            height: h ? h : Constants.Base.height,
            image: img
        },
        //invisible: true,
        draggable: false,
        hoverable: false
    });
    if (img == IMG.world.grass) {
        this._shape.zlevel = 1;
        this._shape.z = 1;
    }
}

Shape.prototype.getLocation = function () {

    var p = {
        x: this._shape.style.x,
        y: this._shape.style.y,
        width: this._shape.style.width,
        height: this._shape.style.height,
        cx: this._shape.style.x + Math.round(this._shape.style.width / 2),
        cy: this._shape.style.y + Math.round(this._shape.style.height / 2)
    }
    return p;
}

Shape.prototype.death = function (direction, mlevel) {

    var p = this.getLocation();
    var items2 = ['walls', 'steels']; //60*60
    var items3 = ['wall', 'steel']; //30*30
    var items4 = ['timer', 'star', 'bomb']; //40*40
    if (items4.contains(this._type) || items3.contains(this._type) || this._type == 'boss') {
        if (mlevel >= this._level) {
            if (TNK.Shapes.contains(this._id))
                TNK.Shapes.remove(this._id);

            zr.delShape(this._shape.id);
            //zr.refreshShapes([this._shape]);
        }
        if (this._type == 'boss') {
            _gameover(p.x, p.y, p.width, p.height);
            gameOver();
        }
        else if (this._type == 'star') {
            //action
        }
        else if (this._type == 'bomb') {

        }
    }
    if (items2.contains(this._type)) {
        switch (direction) {
            case "down":
            case "up":
            case "left":
            case "right":
            default:
                break;
        }
    }

    function _gameover(xx, yy, w, h) {
        var ImageShape = require("zrender/shape/Image");
        var gm = new ImageShape({
            scale: [1, 1],
            zlevel: 0,
            style: {
                x: xx ? xx : 0,
                y: yy ? yy : 0,
                width: w ? w : Constants.Base.width,
                height: h ? h : Constants.Base.height,
                image: IMG.world.destory,
                text: 'destory',
                textColor: 'white',
                textPosition: 'inside',
                textFont: 'bold 11px verdana'
            },
            //invisible: true,
            draggable: false,
            hoverable: false
        });
        zr.addShape(gm);      
    }
}