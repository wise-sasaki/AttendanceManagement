import { DAO } from "./DAO";
import { KintaiInfo } from "./KintaiInfo";
import { CreateKintaiTable } from "./CreateKintaiTable";
/**
 * 勤怠データ選択リスト作成クラス
 */
export class DataSelectList {
    constructor(kintaiId: string) {
        this._ListCreate(kintaiId);
        this._addEventListener()
    }

    /**
     * 勤怠データ選択リスト作成処理
     * @param kintaiId 勤怠データ
     */
    private async _ListCreate(kintaiId: string): Promise<void> {
        // 勤怠データ一覧の削除
        const element = document.getElementById("list") as HTMLSelectElement;
        while (element.lastChild) {
            element.removeChild(element.lastChild);
        }
        // 勤怠データ一覧の作成
        const newOption = document.createElement("option");
        newOption.value = "";
        newOption.textContent = "新規作成";
        element?.appendChild(newOption);

        // DB接続
        const dao = DAO.getInstance();
        const list: Array<KintaiInfo> = await dao.findAll();

        for (let i = 0; i < list.length; i++) {
            const kintaiOption = document.createElement("option");
            kintaiOption.value = list[i].kintaiId;
            kintaiOption.textContent = `${list[i].kintaiId.substring(0, 4)}年${list[i].kintaiId.substring(4, 6)}月度`;
            if (list[i].kintaiId === kintaiId) {
                kintaiOption.selected = true;
            }
            element?.appendChild(kintaiOption);
        }
    }

    /**
     * イベントハンドラー登録
     */
    private _addEventListener(): void {
        // インスタンス生成ごとに画面のリストボックスのイベント登録を更新する。
        const list = document.getElementById("list");
        const changeEvent = async (e: any) => {
            const key = e.target.value;
            const kintaiBox = document.getElementById("kintai-box");
            const newBox = document.getElementById("new-box");
            if (key === "") {
                // 新規作成の場合、新規勤務データ作成パネルを表示して勤怠データパネルを非表示にする
                kintaiBox?.classList.add("element-hidden");
                newBox?.classList.remove("element-hidden");
            } else {
                // 新規作成じゃない場合、勤怠データパネルを表示して新規勤怠データパネルを非表示にする
                kintaiBox?.classList.remove("element-hidden");
                newBox?.classList.add("element-hidden");
                // DB接続
                const dao = DAO.getInstance();
                const info: KintaiInfo = await dao.findById(key);
                // テーブル作成
                const kintaiList = new CreateKintaiTable();
                kintaiList.create(info);
            }
        };
        list?.removeEventListener("change", changeEvent);
        list?.addEventListener("change", changeEvent);
    }
}