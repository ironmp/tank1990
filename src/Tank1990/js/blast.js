

var Blast = function (pic, xx, yy) {
    this._id = require("zrender/tool/guid")();
    this._type = "blast";
    this._img = pic || IMG.blast;
    this._point = [xx, yy];
    this._startTicket;

    var ImageShape = require("zrender/shape/Image");
    this._blast = new ImageShape({
        scale: [1, 1],
        zlevel: 2,
        style: {
            x: xx - 65,
            y: yy - 55,
            width: 136,
            height: 107,
            image: IMG.blast.blast1
        },
        invisiable: true,
        draggable: false,
        hoverable: false
    });
    zr.addShape(this._blast);
    return this;
}

Blast.prototype.start = function () {
    var obj = this;
    var _blast = this._blast;
    var startTicket;
    if (startTicket)
        clearInterval(startTicket);
    zr.modShape(_blast.id, { invisiable: false });

    var count = 1;
    startTicket = setInterval(function () {
        _start(count++);
    }, 50);

    playMedia(Media.Blast); //media

    function _start(count) {
        try {
            if (count > 10 || count < 1) {
                //zr.modShape(_blast.id, { invisiable: true });
                clearInterval(startTicket);
                _destory();
            }
            zr.modShape(_blast.id, { invisiable: false, style: { image: obj._img["blast" + count]} });
            //zr.refreshShapes([_blast]);
        }
        catch (e) {
            console.log(e);
            clearInterval(startTicket);
            _destory();
        }
    }

    function _destory() {
        zr.delShape(_blast.id);
        //zr.refresh();
    }
}

