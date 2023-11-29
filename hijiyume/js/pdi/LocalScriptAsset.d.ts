interface Window {
    gLocalAssetContainer: {
        [key: string]: any;
    };
}
declare class LocalScriptAsset extends g.ScriptAsset {
    func: Function;
    constructor(id: string, path: string);
    _load(loader: g.AssetLoadHandler): void;
    execute(execEnv: g.ScriptAssetExecuteEnvironment): any;
}
