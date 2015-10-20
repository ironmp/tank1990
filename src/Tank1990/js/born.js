

var Born = function (pic, tank) {
    this._id = require("zrender/tool/guid")();
    this._type = "born";
    this._img = pic || IMG.born;
    this._tank = tank;
    this._startTicket;
    var tankLocation = tank.getLocation();
    var ImageShape = require("zrender/shape/Image");
    this._born = new ImageShape({
        scale: [1, 1],
        zlevel: 2,
        style: {
            x: tankLocation.x,
            y: tankLocation.y,
            width: tankLocation.width,
            height: tankLocation.height,
            image: IMG.born.born1
        },
        invisiable: true,
        draggable: false,
        hoverable: false
    });
    zr.addShape(this._born);
    return this;
}

Born.prototype.start = function () {

    var obj = this;
    if (obj._startTiceky)
        clearInterval(obj._startTicket);

    var count = 1;
    obj._startTicket = setInterval(function () {
        _start(count++);
    }, 80);

    if(obj._tank._type == 'player')
        playMedia(Media.Born);

    function _start(count) {

        try {
            if (count >= 4) {
                clearInterval(obj._startTicket);
                _destory();
            }
            //console.log("Born Count: " + count);
            if (obj._tank._born > 0)
                obj._tank._born -= 1;
            else
                obj._tank._born = 0;

            zr.modShape(obj._born.id, { invisiable: false, style: { image: obj._img["born" + count]} });
            //zr.refreshShapes([obj._born]);

        } catch (e) {
            console.log(e);
            clearInterval(obj._startTicket);
            _destory();
        }
    }

    function _destory() {
        obj._tank._born = 0;
        zr.modShape(obj._tank._tank.id, { invisible: false });
        zr.delShape(obj._born.id);
        //zr.refresh();
    }

}