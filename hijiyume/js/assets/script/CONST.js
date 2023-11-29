window.gLocalAssetContainer["CONST"] = function(g) { (function(exports, require, module, __filename, __dirname) {
// 画面
module.exports.width = g.game.width;
module.exports.height = g.game.height;
module.exports.cx = g.game.width / 2;
module.exports.cy = g.game.height / 2;

// assets 読み込みパス
module.exports.audio_path = '/assets/audio/*';
module.exports.image_path = '/assets/image/*';
module.exports.font_path = '/assets/font/*';
module.exports.asset_paths = [
    module.exports.audio_path,
    module.exports.image_path,
    module.exports.font_path,
];

module.exports.p = {
    fan: [],
    power: [],
    cost: [],
};

// ファン
module.exports.p.fan = [];
module.exports.p.fan[1] = 0n;
module.exports.p.fan[2] = 10n;
module.exports.p.fan[3] = 100n;
module.exports.p.fan[4] = 500n;
module.exports.p.fan[5] = 1000n;
module.exports.p.fan[6] = 2500n;
module.exports.p.fan[7] = 10000n;
module.exports.p.fan[8] = 50000n;
module.exports.p.fan[9] = 50000n;
module.exports.p.fan[10] = 500000n;
module.exports.p.fan[11] = 1000000n;
module.exports.p.fan[12] = 5000000n;
module.exports.p.fan[13] = 10000000n;
module.exports.p.fan[14] = 50000000n;
module.exports.p.fan[15] = 100000000n;

// すこぢから
module.exports.p.power = [];
module.exports.p.power[1] = 0n;
module.exports.p.power[2] = 10n;
module.exports.p.power[3] = 100n;
module.exports.p.power[4] = 500n;
module.exports.p.power[5] = 1000n;
module.exports.p.power[6] = 2500n;
module.exports.p.power[7] = 10000n;
module.exports.p.power[8] = 50000n;
module.exports.p.power[9] = 50000n;
module.exports.p.power[10] = 500000n;
module.exports.p.power[11] = 1000000n;
module.exports.p.power[12] = 5000000n;
module.exports.p.power[13] = 10000000n;
module.exports.p.power[14] = 50000000n;
module.exports.p.power[15] = 100000000n;

// 必要すこ
module.exports.p.cost = [];
module.exports.p.cost[1] = 0n;
module.exports.p.cost[2] = 10n;
module.exports.p.cost[3] = 100n;
module.exports.p.cost[4] = 500n;
module.exports.p.cost[5] = 1000n;
module.exports.p.cost[6] = 2500n;
module.exports.p.cost[7] = 10000n;
module.exports.p.cost[8] = 50000n;
module.exports.p.cost[9] = 50000n;
module.exports.p.cost[10] = 500000n;
module.exports.p.cost[11] = 1000000n;
module.exports.p.cost[12] = 5000000n;
module.exports.p.cost[13] = 10000000n;
module.exports.p.cost[14] = 50000000n;
module.exports.p.cost[15] = 100000000n;
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}