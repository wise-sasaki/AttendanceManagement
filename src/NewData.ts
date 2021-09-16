import { DAO } from "./DAO";
import { DateInfo } from "./DateInfo";
import { KintaiInfo } from "./KintaiInfo";
import { CreateKintaiTable } from "./CreateKintaiTable";
import { DataSelectList } from "./DataSelectList";
/**
 * 勤怠データ新規作成クラス
 */
export class NewData {
    private date: string = "";

    constructor() {
        this._addEventListener();
    }

    /**
     * イベントハンドラー登録処理
     */
    private _addEventListener(): void {
        const month = document.getElementById("new-date");
        month?.addEventListener("change", (event: any) => {
            this.date = event.target.value;
        });
        const kintaiBox = document.getElementById("kintai-box");
        const newBox = document.getElementById("new-box");
        const button = document.getElementById("create");
        button?.addEventListener("click", async () => {
            if (this.date !== "") {
                // 新規勤怠データ登録
                // DB接続
                const dao = DAO.getInstance();

                // 存在チェック
                const year = this.date.split("-")[0];
                const month = this.date.split("-")[1];
                const cleck = await dao.selectById(`${year}${month}`);
                if (cleck.kintaiId == null || cleck.kintaiId === "") {
                    // 新規データ作成
                    const kintaiInfo = this._newKintaiInfo(year, month);

                    // 新規登録
                    await dao.create(kintaiInfo);

                    // 再取得
                    const info = await dao.selectById(`${year}${month}`);

                    // 勤怠表作成
                    const kintaiList = new CreateKintaiTable();
                    await kintaiList.create(info);

                    // 勤怠データ選択リスト作成
                    new DataSelectList(`${year}${month}`);

                    // エリアの表示非表示を切り替え
                    kintaiBox?.classList.remove("element-hidden");
                    newBox?.classList.add("element-hidden");
                } else {
                    const result = confirm(`${year}年${month}月度のデータは存在します。上書きしますか？`);
                    // 新規データ作成
                    if (result) {
                        const kintaiInfo = this._newKintaiInfo(year, month);

                        // 上書き登録
                        await dao.create(kintaiInfo);

                        // 再取得
                        const info = await dao.selectById(`${year}${month}`);

                        // 勤怠表作成
                        const kintaiList = new CreateKintaiTable();
                        await kintaiList.create(info);

                        // 勤怠データ選択リスト作成
                        new DataSelectList(`${year}${month}`);

                        // エリアの表示非表示を切り替え
                        kintaiBox?.classList.remove("element-hidden");
                        newBox?.classList.add("element-hidden");
                    }
                }
            }
        });
    }

    /**
     * 勤怠データ新規作成処理
     * @param year 年
     * @param month 月
     * @returns 勤怠データ
     */
    private _newKintaiInfo(year: string, month: string): KintaiInfo {
        const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
        const lastDay = new Date(parseInt(year), parseInt(month), 0);
        const kintaiInfo = new KintaiInfo();
        kintaiInfo.kintaiId = `${year}${month}`
        const dateList: Array<DateInfo> = [];
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dateInfo = new DateInfo();
            dateInfo.date = new Date(parseInt(year), parseInt(month) - 1, i);
            dateList.push(dateInfo);
        }
        kintaiInfo.dateList = dateList;
        return kintaiInfo;
    }
}