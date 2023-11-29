window.gLocalAssetContainer["Core"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var CONST = require('./CONST');

module.exports.createSprite = function (path, scene) {
    var image = scene.asset.getImage(path);
    return new g.Sprite({
        scene: scene,
        src: image,
        width: image.width,
        height: image.height,
        anchorX: 0.5,
        anchorY: 0.5,
        x: CONST.cx,
        y: CONST.cy,
    });
}

module.exports.rand = function (min, max) {
    return Math.floor(g.game.random.generate() * (max - min + 1) + min);
};

module.exports.getRadianByDegree = function(degree) {
    return degree * Math.PI / 180;
};

module.exports.getRadianByPoints = function(ax, ay, bx, by) {
    return Math.atan2(by - ay, bx - ax);
};

module.exports.getMove = function(radian, speed) {
    var vx = Math.cos(radian) * speed;
    var vy = Math.sin(radian) * speed;
    return {vx, vy};
};

// 万以上の数値を4桁＋小数点以下の文字数に変換する
module.exports.convertToJapaneseFormat = function(bigint) {
    var units = ['', '万', '億', '兆', '京', '垓', '𥝱', '穣', '溝', '澗', '正', '載', '極', '恒河沙', '阿僧祇', '不可思議', '無量大数'];

    var unitIndex = 0n;
    var bigUnitSize = 10000n; // BigInt型の10000
    var origin = bigint;
    while (bigint >= bigUnitSize) {
        bigint /= bigUnitSize;
        unitIndex += 1n;
    }

    // 小数点以下3桁取得
    var string_3 = '';
    if (origin >= bigUnitSize) {
        var bigint_string_length = bigint.toString().length;
        string_3 = '.' + origin.toString().slice(bigint_string_length, bigint_string_length + 3);
        if (string_3 === '.000') string_3 = '';
    }

    return bigint.toString() + string_3 + ' ' + units[unitIndex];
}

// コスト計算
module.exports.calcCost = function(scene, number) {
    var cost = CONST.p.cost[number];
    var count = scene.p_count[number];
    var hosei = 1;
    
    for (var i = 1; i <= count; i++) {
        hosei = hosei * 1.15;
    }

    // BigIntに変換
    hosei = hosei * 1000;
    hosei = Math.round(hosei); // 最も近い整数に合わせる
    hosei = BigInt(hosei);

    return cost * hosei / 1000n;
}

// すこ表示
module.exports.showSuko = function(scene, power, x, y) {
    var text = this.convertToJapaneseFormat(power) + 'すこ'

    // 白
    var label = new g.Label({
        scene: scene,
        text: text,
        font: scene.font_monospace,
        x: x + 5,
        y: y + 5,
        fontSize: 48,
        textColor: 'white',
    });
    label.x -= label.width / 2;
    label.y -= label.height;
    label.frame = 90; // 生存フレーム
    label.onUpdate.add(function () {
        this.y -= 4;
        this.opacity -= 1 / 90;
        this.modified(); // 座標変更通知
        this.frame--;
        if (this.frame <= 0) this.destroy();
    }, label); // 第一引数functionのthisの指定
    scene.layers.front.append(label);

    // 黒
    var label = new g.Label({
        scene: scene,
        text: text,
        font: scene.font_monospace,
        x: x,
        y: y,
        fontSize: 48,
    });
    label.x -= label.width / 2;
    label.y -= label.height;
    label.frame = 90; // 生存フレーム
    label.onUpdate.add(function () {
        this.y -= 4;
        this.opacity -= 1 / 90;
        this.modified(); // 座標変更通知
        this.frame--;
        if (this.frame <= 0) this.destroy();
    }, label); // 第一引数functionのthisの指定
    scene.layers.front.append(label);
}

// すこる
module.exports.suko = function(scene) {
    scene.suko += scene.power;
    scene.asset.getAudio('/assets/audio/se1').play();
}

// p実行
module.exports.executeP = function(scene, number) {
    var cost = this.calcCost(scene, number);

    scene.suko -= cost;
    scene.fan += CONST.p.fan[number];
    scene.power += CONST.p.power[number];
    scene.p_count[number]++;

    this.updatePLabel(scene, number);
    scene.asset.getAudio('/assets/audio/se2').play();
}

// ボタン更新
module.exports.updateButton = function(scene, number) {
    // ボタン表示
    scene.sprites.p_button_sprite.hide();
    scene.p_cost_label.hide();
    if (number != 1) {
        scene.sprites.p_button_sprite.show();
        scene.p_cost_label.show();

        var cost = this.calcCost(scene, number);
        var set_cost = this.convertToJapaneseFormat(cost);
        scene.p_cost_label.text = String(set_cost);
        scene.p_cost_label.invalidate();

        // ボタンにパラメータ設定
        scene.sprites.p_button_sprite.cost = cost;
        scene.sprites.p_button_sprite.number = number;
    }
}

// p各ラベル更新
module.exports.updatePLabel = function(scene, number) {
    scene.p_fan_label.hide();
    scene.p_power_label.hide();
    scene.p_count_label.hide();
    if (number != 1) {
        scene.p_fan_label.text = this.convertToJapaneseFormat(CONST.p.fan[number]);
        scene.p_power_label.text = this.convertToJapaneseFormat(CONST.p.power[number]);
        scene.p_count_label.text = this.convertToJapaneseFormat(scene.p_count[number]);
        scene.p_fan_label.invalidate();
        scene.p_power_label.invalidate();
        scene.p_count_label.invalidate();
        scene.p_fan_label.show();
        scene.p_power_label.show();
        scene.p_count_label.show();
    }
}

// p切り替え
module.exports.changeP = function(scene, number) {
    for (var i = 1; i <= 15; i++) {
        scene.sprites.pi[i].hide();
    }
    scene.sprites.pi[number].show();

    this.updatePLabel(scene, number);
    scene.asset.getAudio('/assets/audio/se3').play();
}

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}