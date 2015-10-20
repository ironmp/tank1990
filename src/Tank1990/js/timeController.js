

var Timer = function () {
    this._timerTicket;
    this._fps = 24;
    this._shapes = new Hashtable();
}

Timer.prototype.addShape = function (id, shape) {

    if (this._shapes.contains(id)) {
        this._shapes._hash[id] = shape;
    } else {
        this._shapes.add(id, shape);
    }
}

Timer.prototype.delShape = function (id) {

    if (this._shapes.contains(id)) {
        this._shapes.remove(id);
    }
}

Timer.prototype.run = function () {
    var timer = this;
    if (timer._timerTicket)
        clearInterval(timer._timerTicket);

    timer._timerTicket = setInterval(function () {

        if (timer._shapes.count() > 0) {
            for (key in timer._shapes._hash) {//遍历哈希表
                if (timer._shapes._hash[key].length != 0) {
                    var shape = timer._shapes._hash[key];

                    if (shape._death == true) {
                        timer.delShape(shape.id);
                        continue;
                    }

                    shape.run();
                }
            }
        }

    }, 1000 / timer._fps);
}

Timer.prototype.dispose = function () {

    if (timer._timerTicket)
        clearInterval(timer._timerTicket);

}