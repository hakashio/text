window.gLocalAssetContainer["game_scene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var CONST = require('./CONST');
var Core = require('./Core');
var GameLoad = require('./GameLoad');

module.exports.create = function(param) {
    var scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        assetPaths: CONST.asset_paths,
    });
    g.game.game_scene = scene;
    scene.param = param;

    scene.onLoad.add(function () {
        // ここからゲーム内容を記述します
        GameLoad.init();

        var updateHandler = function () {
            // クリックですこってから処理を開始する
            if (scene.suko > 0n) {
                // カウント処理
                scene.all_frame++;
                scene.sec_count += 1 / g.game.fps;
                // 1秒経過判定
                if (scene.sec_count >= 1 - 1 / g.game.fps) {
                    // 1秒経過後の処理
                    scene.sec_count = 0;
                    scene.suko += scene.fan;
                    scene.all_sec++;
                    scene.day++;
                    // 1ヶ月経過判定
                    scene.end_of_month = 31;
                    if (scene.month === 2) {
                        scene.end_of_month = 28;
                        if (scene.year % 4 === 0) scene.end_of_month = 29;
                    }
                    if (scene.month === 4 ||
                        scene.month === 6 ||
                        scene.month === 9
                    ) scene.end_of_month = 30;
                    if (scene.day > scene.end_of_month) {
                        // 1ヶ月経過後の処理
                        scene.day = 1;
                        scene.month++;
                        // 1年経過判定
                        if (scene.month > 12) {
                            // 1年経過後の処理
                            scene.month = 1;
                            scene.year++;
                        }
                    }
                }
            }

            // すこ更新
            var set_suko = Core.convertToJapaneseFormat(scene.suko);
            scene.suko_label.text = String(set_suko);
            scene.suko_label.invalidate();

            // 日付更新
            var set_date = scene.year.toString() + '年目';
            set_date += String(scene.month.toString()).padStart(2, '0') + '月';
            set_date += String(scene.day.toString()).padStart(2, '0') + '日';
            scene.date_label.text = String(set_date);
            scene.date_label.invalidate();

            // ファン更新
            var set_fan = Core.convertToJapaneseFormat(scene.fan);
            set_fan = 'ファン ' + set_fan + '人'
            scene.fan_label.text = String(set_fan);
            scene.fan_label.invalidate();

            // 購入ボタン制御
            if (scene.suko >= scene.sprites.p_button_sprite.cost) {
                scene.sprites.p_button_sprite.touchable = true;
                scene.sprites.p_button_sprite.opacity = 1;
            } else {
                scene.sprites.p_button_sprite.touchable = false;
                scene.sprites.p_button_sprite.opacity = 0.5;
            }
            scene.sprites.p_button_sprite.modified();
        };
        scene.onUpdate.add(updateHandler);
        // ここまでゲーム内容を記述します
    });
    return scene;
};
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}