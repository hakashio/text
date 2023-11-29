import * as types from "./content-storage-types";
import { KVSLike } from "./KVSLike";
export interface GameExternalStorageParameterObject {
    kvs: KVSLike;
    playId: string;
    gameCode: string;
}
interface GameExternalStorageDataTable {
    [playerId: string]: types.StorageData;
}
export declare class GameExternalStorage implements types.GameExternalStorageLike {
    apiVersion: number;
    protected static kvsPrefix: string;
    protected kvs: KVSLike;
    protected playId: string;
    protected gameCode: string;
    protected dataTable: GameExternalStorageDataTable;
    constructor({ kvs: storage, playId, gameCode }: GameExternalStorageParameterObject);
    read(req: types.GameExternalStorageReadRequest, callback: (error: Error | null, response: types.GameExternalStorageReadResponse | null) => void): void;
    write(req: types.GameExternalStorageWriteRequest, callback: (error: Error | null, response: types.GameExternalStorageWriteResponse | null) => void): void;
    private _readSync;
    private _writeSync;
    private getDataTableFromKVS;
    private setDataTableToKVS;
    private _resolvePlayId;
    private _locatorIdOf;
}
export {};
