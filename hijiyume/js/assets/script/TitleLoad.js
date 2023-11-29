window.gLocalAssetContainer["TitleLoad"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var CONST = require('./CONST');
var Core = require('./Core');

module.exports.init = function () {
    module.exports.initSprites();
}

module.exports.initSprites = function () {
    var scene = g.game.title_scene;

    // 背景
    var back_a_sprite = Core.createSprite('/assets/image/back_a.jpg', scene);
    scene.layers.back.append(back_a_sprite);

    // 雲1番上
    var cloud1_sprite = Core.createSprite('/assets/image/cloud.png', scene);
    cloud1_sprite.x = CONST.cloud1_x;
    cloud1_sprite.y = CONST.cloud1_y;
    scene.layers.back.append(cloud1_sprite);

    // 雲2番目
    var cloud2_sprite = Core.createSprite('/assets/image/cloud.png', scene);
    cloud2_sprite.x = CONST.cloud2_x;
    cloud2_sprite.y = CONST.cloud2_y;
    cloud2_sprite.scaleX = CONST.cloud2_scale;
    cloud2_sprite.scaleY = CONST.cloud2_scale;
    scene.layers.back.append(cloud2_sprite);

    // 雲3番目
    var cloud3_sprite = Core.createSprite('/assets/image/cloud.png', scene);
    cloud3_sprite.x = CONST.cloud3_x;
    cloud3_sprite.y = CONST.cloud3_y;
    cloud3_sprite.scaleX = CONST.cloud3_scale;
    cloud3_sprite.scaleY = CONST.cloud3_scale;
    scene.layers.back.append(cloud3_sprite);

    // 雲4番目
    var cloud4_sprite = Core.createSprite('/assets/image/cloud.png', scene);
    cloud4_sprite.x = CONST.cloud4_x;
    cloud4_sprite.y = CONST.cloud4_y;
    cloud4_sprite.scaleX = CONST.cloud4_scale;
    cloud4_sprite.scaleY = CONST.cloud4_scale;
    scene.layers.back.append(cloud4_sprite);

    // 台
    var runway_sprite = Core.createSprite('/assets/image/runway.png', scene);
    runway_sprite.x = 110;
    runway_sprite.y = 625;
    scene.layers.back.append(runway_sprite);

    // ゆめゆめ
    var yume_sprite = new g.FrameSprite({
        scene: scene,
        src: scene.asset.getImage('/assets/image/yume.png'),
        anchorX: 0.5,
        anchorY: 0.5,
        // エンティティのサイズ
        width: CONST.yume_size,
        height: CONST.yume_size,
        // 初期座標
        x: CONST.yume_start_x,
        y: CONST.yume_start_y,
        // 元画像のフレーム1つのサイズ
        srcWidth: CONST.yume_size,
        srcHeight: CONST.yume_size,
        // アニメーションに利用するフレームのインデックス配列
        // インデックスは元画像の左上から右にsrcWidthとsrcHeightの矩形を並べて数え上げ、右端に達したら一段下の左端から右下に達するまで繰り返す
        frames: [0, 1],
        // アニメーションをループする（省略した場合ループする）
        loop: false,
        // フレームのインターバル
        interval: 130,
    });
    scene.layers.back.append(yume_sprite);

    // タイトル
    var title_sprite = Core.createSprite('/assets/image/title.png', scene);
    title_sprite.x = CONST.cx;
    title_sprite.y = 170;
    scene.layers.back.append(title_sprite);

    // スタート
    var button_start_sprite = Core.createSprite('/assets/image/button_start.png', scene);
    button_start_sprite.x = CONST.cx;
    button_start_sprite.y = 450;
    button_start_sprite.touchable = true;
    button_start_sprite.onPointDown.add(function (ev) {
        g.game.executeScene('game_scene', 'replaceScene', g.game.title_scene.param);
    });
    scene.layers.front.append(button_start_sprite);

    // Twitter
    var button_twitter_sprite = Core.createSprite('/assets/image/button_twitter.png', scene);
    button_twitter_sprite.scaleX = 0.75;
    button_twitter_sprite.scaleY = 0.75;
    button_twitter_sprite.x = 1120;
    button_twitter_sprite.y = 400;
    button_twitter_sprite.touchable = true;
    button_twitter_sprite.onPointDown.add(function (ev) {
        // ボタンを隠してからスクショを撮る
        scene.layers.front.hide();
        // スクショ呼び出し
        // window.RPGAtsumaru.screenshot.setTweetMessage({
        //     tweetText: '#エアーナルミヤ',
        // });
        // window.RPGAtsumaru.screenshot.displayModal();
        // 指定ミリ秒後に処理を実行
        var timer_identifier = scene.setTimeout(function () {
            // ボタン再表示
            scene.layers.front.show();
        }, 3500);
        
    });
    scene.layers.front.append(button_twitter_sprite);

}
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}