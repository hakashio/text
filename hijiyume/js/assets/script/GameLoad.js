window.gLocalAssetContainer["GameLoad"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var CONST = require('./CONST');
var Core = require('./Core');


module.exports.init = function () {
    module.exports.initSprites();
}

module.exports.initSprites = function () {
    var scene = g.game.game_scene;

    // シーンのプロパティを定義
    scene.images = {};
    scene.audios = {};
    scene.layers = {};
    scene.sprites = {};
    scene.suko = 99999990n;
    scene.power = 100000n;
    scene.fan = 10000000n;
    scene.all_frame = 0; // 経過フレーム
    scene.sec_count = 0; // 1秒検出用
    scene.all_sec = 0; // 経過秒数
    scene.year = 1;
    scene.month = 1;
    scene.day = 1;
    scene.end_of_month = 31;
    scene.p_count = [];
    for (var i = 1; i <= 15; i++) {
        scene.p_count[i] = 0n;
    }

    // 表示順別ごとにエンティティをグループ化するための E を作成
    scene.layers.back = new g.E({ scene: scene });
    scene.layers.front = new g.E({ scene: scene });
    // シーンに表示順で追加しておく
    scene.append(scene.layers.back);
    scene.append(scene.layers.front);

    // 背景
    var back_sprite = Core.createSprite('/assets/image/back.png', scene);
    scene.sprites.back_sprite = back_sprite;
    scene.layers.back.append(back_sprite);
    back_sprite.touchable = true;
    back_sprite.onPointDown.add(function (ev) {
        Core.suko(scene);
        Core.showSuko(scene, scene.power, ev.point.x, ev.point.y);
    }, back_sprite);

    // フォント
    var font_monospace = new g.DynamicFont({
        game: g.game,
        fontFamily: 'monospace',
        size: 72, // デフォルトサイズ指定必須
    });
    scene.font_monospace = font_monospace;

    // すこラベル
    var suko_label = new g.Label({
        scene: scene,
        text: '0',
        font: font_monospace,
        textAlign: 'right',
        widthAutoAdjust: false, // textAlign を変更する場合はfalseにする https://akashic-games.github.io/akashic-engine/v3/classes/Label.html#widthAutoAdjust
        width: g.game.width,
        x: -80,
        y: 80,
        fontSize: 72,
    });
    scene.suko_label = suko_label;
    scene.layers.front.append(suko_label);

    // 日付ラベル
    var date_label = new g.Label({
        scene: scene,
        text: '1年目01月01日',
        font: font_monospace,
        width: g.game.width,
        x: 70,
        y: 20,
        fontSize: 48,
    });
    scene.date_label = date_label;
    scene.layers.front.append(date_label);

    // ファンラベル
    var fan_label = new g.Label({
        scene: scene,
        text: 'ファン 1 人',
        font: font_monospace,
        textAlign: 'right',
        widthAutoAdjust: false, // textAlign を変更する場合はfalseにする https://akashic-games.github.io/akashic-engine/v3/classes/Label.html#widthAutoAdjust
        width: g.game.width,
        x: -45,
        y: 12,
        fontSize: 54,
    });
    scene.fan_label = fan_label;
    scene.layers.front.append(fan_label);

    // ファン＋ラベル
    var p_fan_label = new g.Label({
        scene: scene,
        text: '5000 兆人',
        font: font_monospace,
        textAlign: 'right',
        widthAutoAdjust: false, // textAlign を変更する場合はfalseにする https://akashic-games.github.io/akashic-engine/v3/classes/Label.html#widthAutoAdjust
        width: g.game.width,
        x: -565,
        y: 928,
        fontSize: 48,
    });
    scene.p_fan_label = p_fan_label;
    scene.layers.front.append(p_fan_label);
    p_fan_label.hide();

    // すこぢから＋ラベル
    var p_power_label = new g.Label({
        scene: scene,
        text: '5000 兆',
        font: font_monospace,
        textAlign: 'right',
        widthAutoAdjust: false, // textAlign を変更する場合はfalseにする https://akashic-games.github.io/akashic-engine/v3/classes/Label.html#widthAutoAdjust
        width: g.game.width,
        x: -470,
        y: 985,
        fontSize: 48,
    });
    scene.p_power_label = p_power_label;
    scene.layers.front.append(p_power_label);
    p_power_label.hide();

    // 回数ラベル
    var p_count_label = new g.Label({
        scene: scene,
        text: '5000',
        font: font_monospace,
        textAlign: 'right',
        widthAutoAdjust: false, // textAlign を変更する場合はfalseにする https://akashic-games.github.io/akashic-engine/v3/classes/Label.html#widthAutoAdjust
        width: g.game.width,
        x: -85,
        y: 985,
        fontSize: 48,
    });
    scene.p_count_label = p_count_label;
    scene.layers.front.append(p_count_label);
    p_count_label.hide();

    // p1〜15
    scene.sprites.p = [];
    for (var i = 1; i <= 15; i++) {
        var sprite = Core.createSprite('/assets/image/p_' + i + '.png', scene);
        sprite.number = i;
        scene.sprites.p[i] = sprite;
        scene.layers.back.append(sprite);
        sprite.touchable = true;
        sprite.onPointDown.add(function (ev) {
            Core.changeP(scene, this.number);
            Core.updateButton(scene, this.number);
        }, sprite);
    }
    scene.sprites.p[1].x = 140; scene.sprites.p[1].y = 1300;
    scene.sprites.p[2].x = 340; scene.sprites.p[2].y = 1300;
    scene.sprites.p[3].x = 540; scene.sprites.p[3].y = 1300;
    scene.sprites.p[4].x = 740; scene.sprites.p[4].y = 1300;
    scene.sprites.p[5].x = 940; scene.sprites.p[5].y = 1300;
    scene.sprites.p[6].x = 140; scene.sprites.p[6].y = 1500;
    scene.sprites.p[7].x = 340; scene.sprites.p[7].y = 1500;
    scene.sprites.p[8].x = 540; scene.sprites.p[8].y = 1500;
    scene.sprites.p[9].x = 740; scene.sprites.p[9].y = 1500;
    scene.sprites.p[10].x = 940; scene.sprites.p[10].y = 1500;
    scene.sprites.p[11].x = 140; scene.sprites.p[11].y = 1700;
    scene.sprites.p[12].x = 340; scene.sprites.p[12].y = 1700;
    scene.sprites.p[13].x = 540; scene.sprites.p[13].y = 1700;
    scene.sprites.p[14].x = 740; scene.sprites.p[14].y = 1700;
    scene.sprites.p[15].x = 940; scene.sprites.p[15].y = 1700;

    // pi1〜15
    scene.sprites.pi = [];
    for (var i = 1; i <= 15; i++) {
        var sprite = Core.createSprite('/assets/image/pi_' + i + '.png', scene);
        scene.sprites.pi[i] = sprite;
        scene.layers.back.append(sprite);
        sprite.touchable = true;
        sprite.onPointDown.add(function (ev) {
            Core.suko(scene);
            Core.showSuko(scene, scene.power, ev.point.x, ev.point.y);
        }, sprite);
        sprite.hide();
        sprite.y = 600;
    }
    scene.sprites.pi[1].show();

    // 購入ボタン
    var p_button_sprite = Core.createSprite('/assets/image/p_button.png', scene);
    scene.sprites.p_button_sprite = p_button_sprite;
    scene.layers.back.append(p_button_sprite);
    p_button_sprite.touchable = true;
    p_button_sprite.onPointDown.add(function (ev) {
        Core.executeP(scene, this.number);
        Core.updateButton(scene, this.number);
    }, p_button_sprite);
    p_button_sprite.y = 1112;
    p_button_sprite.hide();

    // コスト
    var p_cost_label = new g.Label({
        scene: scene,
        text: '5000.000 兆',
        font: font_monospace,
        textAlign: 'center',
        widthAutoAdjust: false, // textAlign を変更する場合はfalseにする https://akashic-games.github.io/akashic-engine/v3/classes/Label.html#widthAutoAdjust
        width: g.game.width,
        textColor: 'white',
        scaleY: 1.27,
        x: 45,
        y: 1070,
        fontSize: 48,
    });
    scene.p_cost_label = p_cost_label;
    scene.layers.front.append(p_cost_label);
    p_cost_label.hide();

}

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}