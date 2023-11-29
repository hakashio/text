window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var game_scene = require('./game_scene');

g.game.executeScene = function (name, method, param) {
    if (name == 'title_scene' && method == 'pushScene') {
        g.game.pushScene(title_scene.create(param));
    }
    if (name == 'game_scene' && method == 'pushScene') {
        g.game.pushScene(game_scene.create(param));
    }

    if (name == 'title_scene' && method == 'replaceScene') {
        g.game.replaceScene(title_scene.create(param));
    }
    if (name == 'game_scene' && method == 'replaceScene') {
        g.game.replaceScene(game_scene.create(param));
    }
};

function main(param) {
    // マスター音量調整
    g.game.audio.music.volume = 0.1;
    g.game.audio.sound.volume = 0.1;

    g.game.executeScene('game_scene', 'pushScene', param);
}

exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}