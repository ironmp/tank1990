//自定义hashtable
function Hashtable()
{
    this._hash = new Object();
    this.add = function(key, value) {
        if (typeof (key) != "undefined") {
            if (this.contains(key) == false) {
                this._hash[key] = typeof (value) == "undefined" ? null : value;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    this.remove = function(key) { delete this._hash[key]; };
    this.count = function() { var i = 0; for (var k in this._hash) { i++; } return i; };
    this.items = function(key) { return this._hash[key]; };
    this.contains = function(key) { return typeof (this._hash[key]) != "undefined"; };
    this.clear = function() { for (var k in this._hash) { delete this._hash[k]; } };
}


/*
*	扩展内置Array对象
*  
*/
Array.prototype.clear = function () {
    this.length = 0;
};

Array.prototype.insertAt = function (index, obj) {
    this.splice(index, 0, obj);
};

Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

Array.prototype.remove = function (obj) {
    var index = this.indexOf(obj);
    if (index >= 0) {

        this.removeAt(index);
    }
};

Array.prototype.contains = function (elem) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] == elem) {
            return true;
        }
    }
    return false;
};

Array.prototype.in_array = function (e) {
    var len = this.length;
    for (var i = 0; i < len; i++) {
        if (this[i] == e)
            return i;
    }
    return -1;
};