declare class LocalTextAsset extends g.TextAsset {
    data: string;
    constructor(id: string, path: string);
    _load(loader: g.AssetLoadHandler): void;
}
