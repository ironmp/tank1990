

var BaseTank = function (armor, missile,type,direction,FPS) {
    this._id = require("zrender/tool/guid")();   
    this._born = 3;
    this._bornTicket;
    this._fps = 1000 / FPS;//每秒刷新频率  
    this._turn = false; //转向
    this._move = false; //移动
    this._moveTicket;
    this._fire = false; //开火
    this._fireTicket;

    this._type = "enemy";
    this._direction = "down"; //方向
    this._armor = armor; //装甲
    this._missile = missile; //导弹    

    TNK.Tanks.add(this._id, this);
    return this;
}