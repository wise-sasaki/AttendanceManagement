import { DAO } from "./DAO";
import { DataSelectList } from "./DataSelectList";
import { NewData } from "./NewData";
import { UpdateData } from "./UpdateData";
import { BulkInput } from "./BulkInput";
import { OutputJsonButton } from "./OutputJsonButton";
import { InputJsonButton } from "./InputJsonButton";
class Main {
    public main(): void {
        const dao = DAO.getInstance();
        if (!dao.checkIndexedDB()) {
            alert("このブラウザーは安定版の IndexedDB を対応していません。IndexedDB の機能は利用できません。");
            return;
        }
        this._addEventListener();
        /* 勤怠データ一覧作成 */
        new DataSelectList("");
        /* 新規勤怠データ作成 */
        new NewData();
        /* 勤怠データ更新 */
        new UpdateData();
        /* 定時一括入力 */
        new BulkInput();
        /* JSON出力 */
        new OutputJsonButton();
        /* JSON読込 */
        new InputJsonButton();
    }
    private _addEventListener(): void {
    }

}
window.addEventListener('load', () => {
    new Main().main();
});