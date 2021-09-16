import { DAO } from "./DAO";
import { DataSelectList } from "./DataSelectList";
import { NewData } from "./NewData";
import { UpdateData } from "./UpdateData";
import { BulkInputButton } from "./BulkInputButton";
import { OutputJsonButton } from "./OutputJsonButton";
import { InputJsonButton } from "./InputJsonButton";
class Main {
    public main(): void {
        const dao = DAO.getInstance();
        if (!dao.checkIndexedDB()) {
            alert("このブラウザーは安定版の IndexedDB を対応していません。IndexedDB の機能は利用できません。");
            return;
        }
        /*
         * 画面の構成で動的に変更があるのは、
         * 勤怠データ選択リストと勤怠データテーブル部分だけでそれ以外の部分は静的資材のため、
         * 画面起動時に機能の読込を全て行う。
         */
        // 勤怠データ選択リスト作成
        new DataSelectList("");
        // 新規勤怠データ作成
        new NewData();
        // 勤怠データ更新
        new UpdateData();
        // 定時一括入力
        new BulkInputButton();
        // JSON出力
        new OutputJsonButton();
        // JSON読込
        new InputJsonButton();
    }
}
window.addEventListener('load', () => {
    // 画面load時に機能の呼び出しを行う
    new Main().main();
});