
var Map = function () {
    var ImageShape = require("zrender/shape/Image");
    this._width = Math.ceil(zr.getWidth());
    this._height = Math.ceil(zr.getHeight());

    this._shapes = ['wall', 'walls', 'water', 'grass', 'steel', 'steels'];

}

Map.prototype.create = function (x, y, t) {

    if (t == 'walls') {
        return new Shape(IMG.world.walls, 'walls', Constants.Base.width, Constants.Base.height, x, y); //土墙
    }
    else if (t == 'wall') {
        return new Shape(IMG.world.wall, 'wall', Constants.Wall.width, Constants.Wall.height, x, y);
    }
    else if (t == 'water') {
        return new Shape(IMG.world.water, 'water', Constants.Base.width, Constants.Base.height, x, y); //水
    }
    else if (t == 'steels') {
        return new Shape(IMG.world.steels, 'steels', Constants.Base.width, Constants.Base.height, x, y, 2); //水泥墙
    }
    else if (t == 'steel') {
        return new Shape(IMG.world.steel, 'steel', Constants.Wall.width, Constants.Wall.height, x, y, 2);
    }
    else if (t == 'boss') {
        return new Shape(IMG.world.symbol, 'boss', Constants.Boss.width, Constants.Boss.height, x, y);
    }
    else if (t == 'timer') {
        return new Shape(IMG.world.timer, 'timer', Constants.Star.width, Constants.Star.height, x, y); //加时器
    }
    else if (t == 'star') {
        return new Shape(IMG.world.star, 'star', Constants.Star.width, Constants.Star.height, x, y); //星星
    }
    else if (t == 'bomb') {
        return new Shape(IMG.world.bomb, 'bomb', Constants.Star.width, Constants.Star.height, x, y); //雷
    } 
    else if (t == 'grass') {
        return new Shape(IMG.world.grass, 'grass', Constants.Base.width, Constants.Base.height, x, y); //雷
    }
}

Map.prototype.init = function () {

    var shapes = [];
    //----------------------boss------------------------------
    var bx = Math.round(this._width / 2) - Math.round(Constants.Boss.width / 2);
    var by = this._height - Constants.Boss.height;
    _addShape(bx, by, 'boss');
    //-----------------------boss  wall----------------------------
    var p = {
        x: bx - Constants.Wall.width,
        y: this._height - Constants.Wall.height
    };
    _addShape(p.x, p.y, 'wall');
    _addShape(p.x, p.y - 30, 'wall');
    _addShape(p.x, p.y - 60, 'wall');
    _addShape(p.x + 30, p.y - 60, 'wall');
    _addShape(p.x + 60, p.y - 60, 'wall');
    _addShape(p.x + 90, p.y - 60, 'wall');
    _addShape(p.x + 90, p.y - 60, 'wall');
    _addShape(p.x + 90, p.y - 30, 'wall');
    _addShape(p.x + 90, p.y, 'wall');
    //---------------------wall------------------------------
    var startX = [60, 180, 300, 420, 540, 660, 780];
    var startY = [60, 360];
    for (var sx = 0; sx < startX.length; sx++) {
        for (var sy = 0; sy < startY.length; sy++) {
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 6; j++) {
                    var p = { x: startX[sx] + 30 * i, y: startY[sy] + 30 * j };
                    if (sy == 1 && (sx == 2 || sx == 3 || sx == 4) && j >= 3) continue;
                    _addShape(p.x, p.y, 'wall');
                }
            }
        }
    }

    _addShape(0, this._height / 2 - 30, 'wall');
    _addShape(30, this._height / 2 - 30, 'wall');

    _addShape(this._width - 60, this._height / 2 - 30, 'wall');
    _addShape(this._width - 30, this._height / 2 - 30, 'wall');

    for (var x = 240; x < 660; x += 30) {
        _addShape(x, this._height / 2, 'wall');
    }
    //---------------------steels------------------------------
        _addShape(360, 120, 'steels');
    _addShape(480, 120, 'steels');

    //---------------------steel------------------------------
    _addShape(0, this._height / 2, 'steel');
    _addShape(30, this._height / 2, 'steel');

    _addShape(this._width - 60, this._height / 2, 'steel');
    _addShape(this._width - 30, this._height / 2, 'steel');
    //----------------------grass-----------------------------
    _addShape(120, 360, 'grass');
    _addShape(120, 420, 'grass');

    _addShape(720, 360, 'grass');
    _addShape(720, 420, 'grass');

    _addShape(0, 480, 'grass');
    _addShape(0, 540, 'grass');
    _addShape(60, 540, 'grass');

    _addShape(840, 480, 'grass');
    _addShape(840, 540, 'grass');
    _addShape(780, 540, 'grass');
    //-----------------------water----------------------------
    _addShape(360, 360, 'water');
    _addShape(480, 360, 'water');
    //---------------------------------------------------
    //---------------------------------------------------
    //---------------------------------------------------
    //---------------------------------------------------
    function _addShape(xx, yy, t) {
        shapes.push({ x: xx, y: yy, type: t });
    }

    if (shapes.length > 0) {
        for (var i = 0; i < shapes.length; i++) {
            var s = shapes[i];
            var shape = this.create(s.x, s.y, s.type);
            zr.addShape(shape._shape);
            TNK.Shapes.add(shape._id, shape);
        }
        //zr.refresh();
    }
    //---------------------------------------------------

}