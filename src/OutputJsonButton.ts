import { DAO } from "./DAO";
import { KintaiInfo } from "./KintaiInfo";
/**
 * 全データJSON出力ボタンクラス
 * 
 * indexedDBに登録されている勤怠データをJSONファイルとして作成してダウンロードする。
 */
export class OutputJsonButton {
    constructor() {
        this._addEventListener();
    }
    private _addEventListener(): void {
        const button = document.getElementById("output-data");
        button?.addEventListener("click", async (event: any) => {
            // DB接続 全件取得
            const dao = DAO.getInstance();
            const list: Array<KintaiInfo> = await dao.selectAll();
            // JSON変換
            const json = JSON.stringify(list);
            // ファイル作成
            const blob = new Blob([json], { type: "text/plain" });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            const now = new Date();
            const year = now.getFullYear().toString();
            const month = (now.getMonth() + 1).toString().padStart(2, "0");
            const date = now.getDate().toString().padStart(2, "0");
            const hour = now.getHours().toString().padStart(2, "0");
            const min = now.getMinutes().toString().padStart(2, "0");
            const sec = now.getSeconds().toString().padStart(2, "0");
            link.download = `kintai_${year}${month}${date}${hour}${min}${sec}.json`;
            // ダウンロード実行
            link.click();
        });
    }
}