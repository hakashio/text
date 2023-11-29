window.gLocalAssetContainer["title_scene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var CONST = require('./CONST');
var Core = require('./Core');
var TitleLoad = require('./TitleLoad');

module.exports.create = function(param) {
    var scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        assetPaths: CONST.asset_paths,
    });
    g.game.title_scene = scene;
    
    // シーンのプロパティを定義
    scene.param = param;
    scene.images = {};
    scene.audios = {};
    scene.layers = {};

    // 表示順別ごとにエンティティをグループ化するための E を作成
    scene.layers.back = new g.E({ scene: scene });
    scene.layers.front = new g.E({ scene: scene });
    // シーンに表示順で追加しておく
    scene.append(scene.layers.back);
    scene.append(scene.layers.front);

    scene.onLoad.add(function () {
        // ここからゲーム内容を記述します
        TitleLoad.init();

        // タイトルに戻ったときに夕映えが再生されていたら止める
        scene.asset.getAudio('/assets/audio/yubae').stop();

        // BGM ロード直後は再生されなかったのでタイマーで鳴らす
        var timer_identifier_out = scene.setTimeout(function () {
            g.game.audio.sound.volume = 0.3;
            scene.asset.getAudio('/assets/audio/title').play();
            g.game.audio.sound.volume = 0.9;
        }, 500);

        var updateHandler = function () {
            // update
        };
        scene.onUpdate.add(updateHandler);
        // ここまでゲーム内容を記述します
    });
    return scene;
};
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}