import { KintaiInfo } from "./KintaiInfo";
export declare class DAO {
    private static readonly DB_NAME;
    private static readonly STORE_NAME;
    private static readonly KEY_NAME;
    private static _instance;
    constructor();
    static getInstance(): DAO;
    checkIndexedDB(): boolean;
    create(kintaiInfo: KintaiInfo): Promise<void>;
    selectById(key: string): Promise<KintaiInfo>;
    selectAll(): Promise<Array<KintaiInfo>>;
    update(kintaiInfo: KintaiInfo): Promise<void>;
    delete(key: string): Promise<void>;
}
