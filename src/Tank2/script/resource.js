
var IMG;
if (!IMG) {
    IMG = {};
}

IMG.blast = {
    blast1: "./image/blast/blast1.gif",
    blast2: "./image/blast/blast2.gif",
    blast3: "./image/blast/blast3.gif",
    blast4: "./image/blast/blast4.gif",
    blast5: "./image/blast/blast5.gif",
    blast6: "./image/blast/blast6.gif",
    blast7: "./image/blast/blast7.gif",
    blast8: "./image/blast/blast8.gif",
    blast9: "./image/blast/blast7.gif",
    blast10: "./image/blast/blast4.gif"
};

IMG.born = {
    born1: "./image/born/born1.gif",
    born2: "./image/born/born2.gif",
    born3: "./image/born/born3.gif",
    born4: "./image/born/born4.gif"
}
//-------------------------------------------------
IMG.bomb = {
    bomb1: "./image/bomb.gif"
}

IMG.enemymissile = {
    missile1: "./image/enemymissile.gif"
}

IMG.tankmissile = {
    missile1: "./image/tankmissile.gif"
}

IMG.gameover = {
    over: "./image/over.gif"
}

IMG.world = {
    timer: "./image/timer.gif",
    symbol: "./image/symbol.gif",
    star: "./image/star.gif",
    grass: "./image/grass.gif",
    steel: "./image/steel.gif",
    steels: "./image/steels.gif",
    wall: "./image/wall.gif",
    walls: "./image/walls.gif",
    water: "./image/water.gif",
    bomb: "./image/bomb.gif",
    destory: "./image/destory.gif"
}
IMG.background = {
    bg:"./image/bg.jpg"
}
//-------------------------------------------------

IMG.player = {
    player1:
    {
        down: "./image/p1tankD.gif",
        left: "./image/p1tankL.gif",
        right: "./image/p1tankR.gif",
        up: "./image/p1tankU.gif"
    },
    player2:
    {
        down: "./image/p2tankD.gif",
        left: "./image/p2tankL.gif",
        right: "./image/p2tankR.gif",
        up: "./image/p2tankU.gif"
    }
}

//-------------------------------------------------

IMG.ememy = {
    enemy1: {
        down: "./image/enemy1D.gif",
        left: "./image/enemy1L.gif",
        right: "./image/enemy1R.gif",
        up: "./image/enemy1U.gif"
    },
    enemy2: {
        down: "./image/enemy2D.gif",
        left: "./image/enemy2L.gif",
        right: "./image/enemy2R.gif",
        up: "./image/enemy2U.gif"
    },
    enemy3: {
        down: "./image/enemy3D.gif",
        left: "./image/enemy3L.gif",
        right: "./image/enemy3R.gif",
        up: "./image/enemy3U.gif"
    }

};
//-------------------------------------------------

var Media;
if (!Media) {
    Media = {};
}

Media.Born = './media/add.wav';
Media.Blast = './media/blast.wav';
Media.Fire = './media/fire.wav';
Media.Hit = './media/hit.wav';
Media.Start = './media/start.wav';
Media.Over = './media/over.mp3';
Media.Move = './media/move.wav';


//-------------------------------------------------

var Constants;
if (!Constants) {
    Constants = {};
}

// Tank walls steels grass water born
Constants.Base = {
    width: 60,
    height: 60
}

Constants.Missile = {
    width:15,
    height:15
}

Constants.Blast = {
    width:136,
    height:107
}
//Boss Destory
Constants.Boss = {
    width:60,
    height:45
}
//Star timer bomb
Constants.Star = {
    width:40,
    height:40
}
//wall steel
Constants.Wall = {
    width:30,
    height:30
}