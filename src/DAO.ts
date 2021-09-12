import { KintaiInfo } from "./KintaiInfo";
export class DAO {
    private static readonly DB_NAME = "kintai"
    private static readonly STORE_NAME = "month"
    private static readonly KEY_NAME = "kintaiId";
    private static _instance: DAO;
    constructor() { }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new DAO();
        }
        return this._instance;
    }
    public checkIndexedDB(): boolean {
        if (!window.indexedDB) {
            console.log("このブラウザーは安定版の IndexedDB を対応していません。IndexedDB の機能は利用できません。");
            return false;
        }
        return true;
    }
    public async create(kintaiInfo: KintaiInfo): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DAO.DB_NAME, 1);
            let db: IDBDatabase;

            request.onupgradeneeded = (event: Event) => {
                db = (<IDBRequest>event.target).result;

                // オブジェクトストア作成（インデックスのキーとして"kintaiId"を指定）
                const store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                // インデックスの作成
                store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                console.log(`success:DB接続作成完了`);
            };

            request.onsuccess = (event: Event) => {
                db = (<IDBRequest>event.target).result;
                console.log(`success:DB接続完了`);
                const trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                const store = trans.objectStore(DAO.STORE_NAME);

                // データ登録・更新
                var request = store.put(kintaiInfo.getObject());

                request.onsuccess = (event: Event) => {
                    console.log('success:登録成功');
                    resolve();
                };

                request.onerror = (event: Event) => {
                    console.log('error:登録失敗');
                    reject();
                };
            };

            request.onerror = (event: Event) => {
                console.log(`error:DB接続エラー`);
                reject();
            };
        });
    }
    public async selectById(key: string): Promise<KintaiInfo> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DAO.DB_NAME, 1);
            let db: IDBDatabase;

            request.onupgradeneeded = (event: Event) => {
                db = (<IDBRequest>event.target).result;

                // オブジェクトストア作成（インデックスのキーとして'isbn'を指定）
                const store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                // インデックスの作成
                store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                console.log(`success:DB接続作成完了`);
            };

            request.onsuccess = (event: Event) => {
                db = (<IDBRequest>event.target).result;
                console.log(`success:DB接続完了`);
                const trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                const store = trans.objectStore(DAO.STORE_NAME);

                // データ取得
                const request = store.get(key);

                const info = new KintaiInfo();
                request.onsuccess = (event: Event) => {
                    var result = <KintaiInfo>(<IDBRequest>event.target).result;
                    if (result) {
                        console.log('success:取得成功');
                        info.setObject(result);
                        resolve(info);
                    } else {
                        console.log('error:対象データは存在しません。');
                        resolve(info);
                    }
                };
            };

            request.onerror = (event: Event) => {
                console.log(`error:DB接続エラー`);
                reject();
            };
        });

    }
    public async selectAll(): Promise<Array<KintaiInfo>> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DAO.DB_NAME, 1);
            let db: IDBDatabase;

            request.onupgradeneeded = (event: Event) => {
                db = (<IDBRequest>event.target).result;

                // オブジェクトストア作成（インデックスのキーとして'isbn'を指定）
                const store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                // インデックスの作成
                store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                console.log(`success:DB接続作成完了`);
            };

            request.onsuccess = (event: Event) => {
                db = (<IDBRequest>event.target).result;
                console.log(`success:DB接続完了`);
                const trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                const store = trans.objectStore(DAO.STORE_NAME);

                // 全データ取得
                const request = store.openCursor();
                const list: Array<KintaiInfo> = [];
                request.onsuccess = (event: Event) => {
                    const cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result;
                    if (cursor) {
                        console.log('success:取得成功');
                        const info = new KintaiInfo();
                        info.setObject(cursor.value);
                        list.push(info);
                        cursor.continue();
                    } else {
                        resolve(list);
                    }
                };
            };

            request.onerror = (event: Event) => {
                console.log(`error:DB接続エラー`);
                reject();
            };
        });

    }
    public async update(kintaiInfo: KintaiInfo): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DAO.DB_NAME, 1);
            let db: IDBDatabase;
    
            request.onupgradeneeded = (event: Event) => {
                db = (<IDBRequest>event.target).result;
    
                // オブジェクトストア作成（インデックスのキーとして'isbn'を指定）
                const store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                // インデックスの作成
                store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                console.log(`success:DB接続作成完了`);
            };
    
            request.onsuccess = (event: Event) => {
                db = (<IDBRequest>event.target).result;
                console.log(`success:DB接続完了`);
                const trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                const store = trans.objectStore(DAO.STORE_NAME);
    
                // データ登録・更新
                var request = store.put(kintaiInfo.getObject());
    
                request.onsuccess = (event: Event) => {
                    console.log('success:更新成功');
                    resolve();
                };
    
                request.onerror = (event: Event) => {
                    console.log('error:更新失敗');
                    reject();
                };
            };
    
            request.onerror = (event: Event) => {
                console.log(`error:DB接続エラー`);
                reject();
            };
        });
    }
    public async delete(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(DAO.DB_NAME, 1);
            let db: IDBDatabase;
    
            request.onupgradeneeded = (event: Event) => {
                db = (<IDBRequest>event.target).result;
    
                // オブジェクトストア作成（インデックスのキーとして'isbn'を指定）
                const store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                // インデックスの作成
                store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                console.log(`success:DB接続作成完了`);
            };
    
            request.onsuccess = (event: Event) => {
                db = (<IDBRequest>event.target).result;
                console.log(`success:DB接続完了`);
                const trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                const store = trans.objectStore(DAO.STORE_NAME);
    
                // データ削除
                const request = store.delete(key);
    
                request.onsuccess = (event: Event) => {
                    console.log('success:削除成功');
                    resolve();
                };
    
                request.onerror = (event: Event) => {
                    console.log('error:削除失敗');
                    reject();
                };
            };
    
            request.onerror = (event: Event) => {
                console.log(`error:DB接続エラー`);
                reject();
            };
        });

    }
}