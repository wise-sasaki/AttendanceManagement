import { DAO } from "./DAO";
import { DateInfo } from "./DateInfo";
import { KintaiInfo } from "./KintaiInfo";
import { CheckUtil } from "./CheckUtil";
/**
 * 勤怠データ更新クラス
 */
export class UpdateData {
    constructor() {
        this._addEventListener();
    }

    /**
     * イベントハンドラー登録処理
     */
    private _addEventListener(): void {
        const saveButton = document.querySelector("#save");
        saveButton?.addEventListener("click", async () => {
            // 更新データ作成
            const kintaiInfo: KintaiInfo = new KintaiInfo();
            try {
                const yearMonth = document.querySelector("span#kintai-id") as HTMLElement;
                kintaiInfo.kintaiId = `${yearMonth.textContent}`;

                const company = document.querySelector("input#company") as HTMLInputElement;
                kintaiInfo.company = company.value;
                const deploy = document.querySelector("input#deploy") as HTMLInputElement;
                kintaiInfo.deploy = deploy.value;
                const name = document.querySelector("input#name") as HTMLInputElement;
                kintaiInfo.name = name.value;

                const anken = document.querySelector("input#anken") as HTMLInputElement;
                kintaiInfo.anken = anken.value;
                const teiziStart = document.querySelector("input#teizi-start") as HTMLInputElement;
                kintaiInfo.teiziStart = teiziStart.value;
                const teiziEnd = document.querySelector("input#teizi-end") as HTMLInputElement;
                kintaiInfo.teiziEnd = teiziEnd.value;
                const qk = document.querySelector("input#qk") as HTMLInputElement;
                kintaiInfo.qk = qk.value;
                if (CheckUtil.isInputError(teiziStart.value) || CheckUtil.isInputError(teiziEnd.value) || CheckUtil.isInputError(qk.value)) {
                    alert("入力チェックエラーのある項目があります。更新を実行できません。");
                    return;
                }

                const rows = document.querySelectorAll("table tbody tr");
                const dataInfoList: Array<DateInfo> = [];
                for (let i = 0; i < rows.length; i++) {
                    const dateInfo = new DateInfo();
                    const year = parseInt(kintaiInfo.kintaiId.substring(0, 4));
                    const month = parseInt(kintaiInfo.kintaiId.substring(5, 6)) - 1;
                    dateInfo.date = new Date(year, month, i + 1);
                    const typeElement = rows[i].querySelector(`#type-${i}`) as HTMLOptionElement;
                    if (typeElement) {
                        dateInfo.type = typeElement.value;
                    }
                    const startElement = rows[i].querySelector(`#start-${i}`) as HTMLInputElement;
                    dateInfo.startTime = startElement.value;
                    const endElement = rows[i].querySelector(`#end-${i}`) as HTMLInputElement;
                    dateInfo.endTime = endElement.value;
                    const breakElement = rows[i].querySelector(`#break-${i}`) as HTMLInputElement;
                    dateInfo.breakTime = breakElement.value;
                    const commentElement = rows[i].querySelector(`#comment-${i}`) as HTMLInputElement;
                    dateInfo.comment = commentElement.value;
                    dataInfoList.push(dateInfo);
                    if (CheckUtil.isInputError(startElement.value) || CheckUtil.isInputError(endElement.value) || CheckUtil.isInputError(breakElement.value)) {
                        alert("入力チェックエラーのある項目があります。更新を実行できません。");
                        return;
                    }
                }
                kintaiInfo.dateList = dataInfoList;
            } catch (e) {
                alert("入力チェックエラーのある項目があります。更新を実行できません。");
                return;
            }

            // DB接続
            const dao = DAO.getInstance();
            await dao.update(kintaiInfo);
            alert("保存しました。");
        });
    }
}