import { KintaiInfo } from "./KintaiInfo";
import { CheckUtil } from "./CheckUtil";
import { DayType } from "./DayType";
import { HolidayType } from "./HolidayType";
/**
 * 勤怠データテーブル作成クラス
 */
export class CreateKintaiTable {
    constructor() { }

    /**
     * 勤怠データテーブル作成処理
     * @param kintaiInfo 勤怠データ
     */
    public create(kintaiInfo: KintaiInfo): void {
        this._dateData(kintaiInfo);
        this._userData(kintaiInfo);
        this._ankenData(kintaiInfo);
        this._kintaiTable(kintaiInfo);
    }

    /**
     * 日付データ部作成
     * @param kintaiInfo 勤怠データ
     */
    private _dateData(kintaiInfo: KintaiInfo): void {
        const yearMonth = document.querySelector("span#year-month") as HTMLElement;
        yearMonth.textContent = `${kintaiInfo.kintaiId.substring(0, 4)}年${kintaiInfo.kintaiId.substring(4, 6)}月度`;
        const kintaiId = document.querySelector("span#kintai-id") as HTMLElement;
        kintaiId.textContent = kintaiInfo.kintaiId;
    }

    /**
     * ユーザーデータ部作成
     * @param kintaiInfo 勤怠データ
     */
    private _userData(kintaiInfo: KintaiInfo): void {
        // 会社名
        const company = document.querySelector("input#company") as HTMLInputElement;
        company.value = kintaiInfo.company;

        // 部署名
        const deploy = document.querySelector("input#deploy") as HTMLInputElement;
        deploy.value = kintaiInfo.deploy;

        // 氏名
        const name = document.querySelector("input#name") as HTMLInputElement;
        name.value = kintaiInfo.name;
    }

    /**
     * 案件データ部作成
     * @param kintaiInfo 勤怠データ
     */
    private _ankenData(kintaiInfo: KintaiInfo): void {
        // 案件名
        const anken = document.querySelector("input#anken") as HTMLInputElement;
        anken.value = kintaiInfo.anken;

        // 所定就業時間-開始
        const teiziStart = document.querySelector("input#teizi-start") as HTMLInputElement;
        teiziStart.value = kintaiInfo.teiziStart;
        teiziStart.addEventListener("change", () => {
            CheckUtil.inputCheck(teiziStart);
            // 行計算
            const rows = document.querySelectorAll("table tbody tr");
            for (let i = 0; i < rows.length; i++) {
                this._computeRow(i.toString());
            }
            // 合計値計算
            this._computeSum();
        });

        // 所定就業時間-終了
        const teiziEnd = document.querySelector("input#teizi-end") as HTMLInputElement;
        teiziEnd.value = kintaiInfo.teiziEnd;
        teiziEnd.addEventListener("change", () => {
            CheckUtil.inputCheck(teiziEnd);
            // 行計算
            const rows = document.querySelectorAll("table tbody tr");
            for (let i = 0; i < rows.length; i++) {
                this._computeRow(i.toString());
            }
            // 合計値計算
            this._computeSum();
        });

        // 所定就業時間-休憩
        const qk = document.querySelector("input#qk") as HTMLInputElement;
        qk.value = kintaiInfo.qk;
        qk.addEventListener("change", () => {
            CheckUtil.inputCheck(qk);
            // 行計算
            const rows = document.querySelectorAll("table tbody tr");
            for (let i = 0; i < rows.length; i++) {
                this._computeRow(i.toString());
            }
            // 合計値計算
            this._computeSum();
        });
    }

    /**
     * 勤怠テーブル部作成
     * @param kintaiInfo 勤怠データ
     */
    private _kintaiTable(kintaiInfo: KintaiInfo): void {
        const tableWrap = document.querySelector("div.kintai-table");
        // テーブルのクリア
        const child = tableWrap?.children;
        if (child) {
            for (let i = 0; i < child.length; i++) {
                child[i].remove();
            }
        }

        // テーブル作成
        const newTable = document.createElement("table");

        // テーブルヘッダ作成
        const newThead = this._thead();
        newTable.appendChild(newThead);

        // テーブルボティ作成
        const newTbody = this._tbody(kintaiInfo);
        newTable.appendChild(newTbody);

        // テーブルフッター作成
        const newTfoot = this._tfoot();
        newTable.appendChild(newTfoot);

        tableWrap?.appendChild(newTable);

        // 行計算
        const rows = document.querySelectorAll("table tbody tr");
        for (let i = 0; i < rows.length; i++) {
            this._computeRow(i.toString());
        }
        // 合計値計算
        this._computeSum();
    }

    /**
     * テーブルヘッダ作成
     * @returns thead要素
     */
    private _thead(): HTMLTableSectionElement {
        const newThead = document.createElement("thead");
        const newTheadTr = document.createElement("tr");
        // 日付列
        const newTheadThDate = document.createElement("th");
        newTheadThDate.classList.add("date");
        newTheadThDate.textContent = "日付";
        newTheadTr.appendChild(newTheadThDate);
        // 曜日列
        const newTheadThDay = document.createElement("th");
        newTheadThDay.classList.add("day");
        newTheadThDay.textContent = "曜日";
        newTheadTr.appendChild(newTheadThDay);
        // 休日祝日列
        const newTheadThHoly = document.createElement("th");
        newTheadThHoly.classList.add("type");
        newTheadThHoly.innerHTML = "休日<br>祝日";
        newTheadTr.appendChild(newTheadThHoly);
        // 開始時刻列
        const newTheadThStart = document.createElement("th");
        newTheadThStart.classList.add("start");
        newTheadThStart.textContent = "開始時刻";
        newTheadTr.appendChild(newTheadThStart);
        // 終了時刻列
        const newTheadThEnd = document.createElement("th");
        newTheadThEnd.classList.add("end");
        newTheadThEnd.textContent = "終了時刻";
        newTheadTr.appendChild(newTheadThEnd);
        // 休憩時間列
        const newTheadThBreak = document.createElement("th");
        newTheadThBreak.classList.add("break");
        newTheadThBreak.textContent = "休憩時間";
        newTheadTr.appendChild(newTheadThBreak);
        // 所定内時間列
        const newTheadThNormal = document.createElement("th");
        newTheadThNormal.classList.add("normal");
        newTheadThNormal.innerHTML = "所定内<br>時間";
        newTheadTr.appendChild(newTheadThNormal);
        // 時間外時間列
        const newTheadThOver = document.createElement("th");
        newTheadThOver.classList.add("over");
        newTheadThOver.innerHTML = "時間外<br>時間";
        newTheadTr.appendChild(newTheadThOver);
        // 休日時間列
        const newTheadThHoli = document.createElement("th");
        newTheadThHoli.classList.add("holi");
        newTheadThHoli.innerHTML = "休日<br>時間";
        newTheadTr.appendChild(newTheadThHoli);
        // 深夜時間列
        const newTheadThMid = document.createElement("th");
        newTheadThMid.classList.add("mid");
        newTheadThMid.innerHTML = "深夜<br>(内訳)";
        newTheadTr.appendChild(newTheadThMid);
        // コメント列
        const newTheadThComment = document.createElement("th");
        newTheadThComment.classList.add("comment");
        newTheadThComment.textContent = "コメント";
        newTheadTr.appendChild(newTheadThComment);
        newThead.appendChild(newTheadTr);
        return newThead;
    }

    /**
     * テーブルボディ部作成
     * @param kintaiInfo 勤怠データ
     * @returns tbody要素
     */
    private _tbody(kintaiInfo: KintaiInfo): HTMLTableSectionElement {
        const newTbody = document.createElement("tbody");
        for (let i = 0; i < kintaiInfo.dateList.length; i++) {
            const dateData = kintaiInfo.dateList[i];
            const newTbodyTr = document.createElement("tr");
            // 日付列
            const newTheadTdDate = document.createElement("td");
            newTheadTdDate.classList.add("date");
            newTheadTdDate.id = `date-${i}`;
            newTheadTdDate.textContent = `${(dateData.date.getMonth() + 1).toString()}/${dateData.date.getDate().toString()}`;
            newTbodyTr.appendChild(newTheadTdDate);
            // 曜日列
            const newTheadTdDay = document.createElement("td");
            newTheadTdDay.classList.add("day");
            newTheadTdDay.id = `day-${i}`;
            switch (dateData.date.getDay()) {
                case DayType.SUNDAY:
                    newTbodyTr.classList.add("sunday");
                    newTheadTdDay.textContent = "日";
                    break;
                case DayType.MONDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "月";
                    break;
                case DayType.TUESDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "火";
                    break;
                case DayType.WEDNESDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "水";
                    break;
                case DayType.THURSDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "木";
                    break;
                case DayType.FRIDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "金";
                    break;
                case DayType.SATURDAY:
                    newTbodyTr.classList.add("saturday");
                    newTheadTdDay.textContent = "土";
                    break;
            }
            newTbodyTr.appendChild(newTheadTdDay);
            // 休日祝日列
            const newTheadTdType = document.createElement("td");
            newTheadTdType.classList.add("type");
            if (dateData.date.getDay() !== DayType.SUNDAY && dateData.date.getDay() !== DayType.SATURDAY) {
                const newTheadTdSelect = document.createElement("select");
                newTheadTdSelect.classList.add("type");
                newTheadTdSelect.id = `type-${i}`;
                newTheadTdSelect.addEventListener("change", (e: Event) => {
                    const id = newTheadTdStartInput.id;
                    const num = id?.split("-")[1];
                    const row = document.querySelector(`#date-${num}`)?.parentElement;
                    switch (newTheadTdSelect.value) {
                        case HolidayType.YASUMI:
                        case HolidayType.YUKYU:
                        case HolidayType.SYUKUZITU:
                            row?.classList.add("holiday");
                            break;
                        default:
                            row?.classList.remove("holiday");
                            break;
                    }

                    // 行計算
                    this._computeRow(num);
                    // 合計値計算
                    this._computeSum();
                });
                const newTheadTdSelectOption = document.createElement("option");
                newTheadTdSelectOption.value = "";
                newTheadTdSelectOption.textContent = "　";
                newTheadTdSelect.appendChild(newTheadTdSelectOption);
                const newTheadTdSelectOption0 = document.createElement("option");
                newTheadTdSelectOption0.value = HolidayType.YASUMI;
                newTheadTdSelectOption0.textContent = "休";
                newTheadTdSelect.appendChild(newTheadTdSelectOption0);
                const newTheadTdSelectOption1 = document.createElement("option");
                newTheadTdSelectOption1.value = HolidayType.YUKYU;
                newTheadTdSelectOption1.textContent = "有";
                newTheadTdSelect.appendChild(newTheadTdSelectOption1);
                const newTheadTdSelectOption2 = document.createElement("option");
                newTheadTdSelectOption2.value = HolidayType.SYUKUZITU;
                newTheadTdSelectOption2.textContent = "祝";
                newTheadTdSelect.appendChild(newTheadTdSelectOption2);
                switch (dateData.type) {
                    case HolidayType.YASUMI:
                        newTbodyTr.classList.add("holiday");
                        newTheadTdSelectOption0.selected = true;
                        break;
                    case HolidayType.YUKYU:
                        newTbodyTr.classList.add("holiday");
                        newTheadTdSelectOption1.selected = true;
                        break;
                    case HolidayType.SYUKUZITU:
                        newTbodyTr.classList.add("holiday");
                        newTheadTdSelectOption2.selected = true;
                        break;
                }
                newTheadTdType.appendChild(newTheadTdSelect);
            }
            newTbodyTr.appendChild(newTheadTdType);
            // 開始時刻列
            const newTheadTdStart = document.createElement("td");
            newTheadTdStart.classList.add("start");
            const newTheadTdStartInput = document.createElement("input");
            newTheadTdStartInput.type = "text";
            newTheadTdStartInput.classList.add("start-time");
            newTheadTdStartInput.id = `start-${i}`;
            newTheadTdStartInput.pattern = "^([01][0-9]|2[0-9]):[0-5][0-9]$";
            newTheadTdStartInput.maxLength = 5;
            newTheadTdStartInput.value = dateData.startTime;
            newTheadTdStartInput.addEventListener("change", async () => {
                try {
                    // 対象行取得
                    const id = newTheadTdStartInput.id;
                    const num = id?.split("-")[1];
                    const normal = document.querySelector(`#normal-${num}`) as HTMLTableCellElement;
                    const over = document.querySelector(`#over-${num}`) as HTMLTableCellElement;
                    const holi = document.querySelector(`#holi-${num}`) as HTMLTableCellElement;
                    const mid = document.querySelector(`#mid-${num}`) as HTMLTableCellElement;
                    // 入力チェック
                    if (!CheckUtil.inputCheck(newTheadTdStartInput)) {
                        normal.textContent = "Error";
                        over.textContent = "Error";
                        holi.textContent = "Error";
                        mid.textContent = "Error";

                        // 合計値計算
                        this._computeSum();
                        return;
                    }

                    // 行合計
                    this._computeRow(num);
                    // 合計値計算
                    this._computeSum();
                } catch (e) {
                    console.error(`error:${e}`);
                }

            });
            newTheadTdStart.appendChild(newTheadTdStartInput);
            const newTheadTdStartButton = document.createElement("button");
            newTheadTdStartButton.type = "button";
            newTheadTdStartButton.classList.add("user-button");
            newTheadTdStartButton.id = `start-button-${i}`;
            newTheadTdStartButton.textContent = "定時";
            newTheadTdStartButton.tabIndex = -1;
            newTheadTdStartButton.addEventListener("click", () => {
                const teiziStart = document.querySelector("#teizi-start") as HTMLInputElement;
                // 値コピー
                newTheadTdStartInput.value = teiziStart.value;
                // 入力チェック
                CheckUtil.inputCheck(newTheadTdStartInput);
                // 行合計
                this._computeRow(newTheadTdStartButton.id.split("-")[2]);
                // 合計値計算
                this._computeSum();
            });
            newTheadTdStart.appendChild(newTheadTdStartButton);
            newTbodyTr.appendChild(newTheadTdStart);
            // 終了時刻列
            const newTheadTdEnd = document.createElement("td");
            newTheadTdEnd.classList.add("end");
            const newTheadTdEndInput = document.createElement("input");
            newTheadTdEndInput.type = "text";
            newTheadTdEndInput.classList.add("end-time");
            newTheadTdEndInput.id = `end-${i}`;
            newTheadTdEndInput.pattern = "^([01][0-9]|2[0-9]):[0-5][0-9]$";
            newTheadTdEndInput.maxLength = 5;
            newTheadTdEndInput.value = dateData.endTime;
            newTheadTdEndInput.addEventListener("change", () => {
                // 対象行取得
                const id = newTheadTdEndInput.id;
                const num = id?.split("-")[1];
                const normal = document.querySelector(`#normal-${num}`) as HTMLTableCellElement;
                const over = document.querySelector(`#over-${num}`) as HTMLTableCellElement;
                const holi = document.querySelector(`#holi-${num}`) as HTMLTableCellElement;
                const mid = document.querySelector(`#mid-${num}`) as HTMLTableCellElement;
                // 入力チェック
                if (!CheckUtil.inputCheck(newTheadTdEndInput)) {
                    normal.textContent = "Error";
                    over.textContent = "Error";
                    holi.textContent = "Error";
                    mid.textContent = "Error";

                    // 合計値計算
                    this._computeSum();
                    return;
                }

                // 行合計
                this._computeRow(num);
                // 合計値計算
                this._computeSum();
            });
            newTheadTdEnd.appendChild(newTheadTdEndInput);
            const newTheadTdEndButton = document.createElement("button");
            newTheadTdEndButton.type = "button";
            newTheadTdEndButton.classList.add("user-button");
            newTheadTdEndButton.textContent = "定時";
            newTheadTdEndButton.tabIndex = -1;
            newTheadTdEndButton.addEventListener("click", () => {
                const teiziEnd = document.querySelector("#teizi-end") as HTMLInputElement;
                // 値コピー
                newTheadTdEndInput.value = teiziEnd?.value;
                // 入力チェック
                CheckUtil.inputCheck(newTheadTdEndInput);
                // 行合計
                this._computeRow(newTheadTdStartButton.id.split("-")[2]);
                // 合計値計算
                this._computeSum();
            });
            newTheadTdEnd.appendChild(newTheadTdEndButton);
            newTbodyTr.appendChild(newTheadTdEnd);
            const newTheadTdBreak = document.createElement("td");
            newTheadTdBreak.classList.add("break");
            const newTheadTdBreakInput = document.createElement("input");
            newTheadTdBreakInput.type = "text";
            newTheadTdBreakInput.classList.add("break-time");
            newTheadTdBreakInput.id = `break-${i}`;
            newTheadTdBreakInput.pattern = "^([01][0-9]|2[0-9]):[0-5][0-9]$";
            newTheadTdBreakInput.maxLength = 5;
            newTheadTdBreakInput.value = dateData.breakTime;
            newTheadTdBreakInput.addEventListener("change", () => {
                // 対象行取得
                const id = newTheadTdBreakInput.id;
                const num = id?.split("-")[1];
                const normal = document.querySelector(`#normal-${num}`) as HTMLTableCellElement;
                const over = document.querySelector(`#over-${num}`) as HTMLTableCellElement;
                const holi = document.querySelector(`#holi-${num}`) as HTMLTableCellElement;
                const mid = document.querySelector(`#mid-${num}`) as HTMLTableCellElement;
                // 入力チェック
                if (!CheckUtil.inputCheck(newTheadTdBreakInput)) {
                    normal.textContent = "Error";
                    over.textContent = "Error";
                    holi.textContent = "Error";
                    mid.textContent = "Error";

                    // 合計値計算
                    this._computeSum();
                    return;
                }

                // 行合計
                this._computeRow(num);
                // 合計値計算
                this._computeSum();
            });
            newTheadTdBreak.appendChild(newTheadTdBreakInput);
            const newTheadTdBreakButton = document.createElement("button");
            newTheadTdBreakButton.type = "button";
            newTheadTdBreakButton.classList.add("user-button");
            newTheadTdBreakButton.textContent = "定時";
            newTheadTdBreakButton.tabIndex = -1;
            newTheadTdBreakButton.addEventListener("click", () => {
                const teiziBreak = document.querySelector("#qk") as HTMLInputElement;
                // 値コピー
                newTheadTdBreakInput.value = teiziBreak?.value;
                // 入力チェック
                CheckUtil.inputCheck(newTheadTdBreakInput);
                // 行合計
                this._computeRow(newTheadTdStartButton.id.split("-")[2]);
                // 合計値計算
                this._computeSum();
            });
            newTheadTdBreak.appendChild(newTheadTdBreakButton);
            newTbodyTr.appendChild(newTheadTdBreak);
            // 所定内時間列
            const newTheadTdNormal = document.createElement("td");
            newTheadTdNormal.classList.add("normal");
            newTheadTdNormal.id = `normal-${i}`;
            newTheadTdNormal.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdNormal);
            // 時間外時間列
            const newTheadTdOver = document.createElement("td");
            newTheadTdOver.classList.add("over");
            newTheadTdOver.id = `over-${i}`;
            newTheadTdOver.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdOver);
            // 休日時間列
            const newTheadTdHoli = document.createElement("td");
            newTheadTdHoli.classList.add("holi");
            newTheadTdHoli.id = `holi-${i}`;
            newTheadTdHoli.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdHoli);
            // 深夜時間列
            const newTheadTdMid = document.createElement("td");
            newTheadTdMid.classList.add("mid");
            newTheadTdMid.id = `mid-${i}`;
            newTheadTdMid.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdMid);
            // コメント列
            const newTheadTdComment = document.createElement("td");
            newTheadTdComment.classList.add("comment");
            const newTheadTdCommentInput = document.createElement("input");
            newTheadTdCommentInput.type = "text";
            newTheadTdCommentInput.classList.add("comment");
            newTheadTdCommentInput.id = `comment-${i}`;
            newTheadTdCommentInput.value = dateData.comment;
            newTheadTdComment.appendChild(newTheadTdCommentInput);
            newTbodyTr.appendChild(newTheadTdComment);
            newTbody.appendChild(newTbodyTr);
        }
        return newTbody;
    }

    /**
     * テーブルフッター作成
     * @returns tfoot要素
     */
    private _tfoot(): HTMLTableSectionElement {
        const newTfoot = document.createElement("tfoot");
        const newTfootTr = document.createElement("tr");
        const newTfootTdDate = document.createElement("td");
        newTfootTr.appendChild(newTfootTdDate);
        const newTfootTdDay = document.createElement("td");
        newTfootTr.appendChild(newTfootTdDay);
        const newTfootTdType = document.createElement("td");
        newTfootTr.appendChild(newTfootTdType);
        // 合計時間
        const newTfootTdSumData = document.createElement("td");
        newTfootTdSumData.classList.add("sum-data");
        newTfootTdSumData.colSpan = 2;
        newTfootTdSumData.textContent = "合計";
        newTfootTr.appendChild(newTfootTdSumData);
        const newTfootTdSum = document.createElement("td");
        newTfootTdSum.classList.add("sum-data");
        newTfootTdSum.id = "sum";
        newTfootTdSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdSum);
        // 合計所定内時間
        const newTfootTdNormalSum = document.createElement("td");
        newTfootTdNormalSum.classList.add("sum-data");
        newTfootTdNormalSum.id = "normal-sum";
        newTfootTdNormalSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdNormalSum);
        // 合計時間外時間
        const newTfootTdOverSum = document.createElement("td");
        newTfootTdOverSum.classList.add("sum-data");
        newTfootTdOverSum.id = "over-sum";
        newTfootTdOverSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdOverSum);
        // 合計休日時間
        const newTfootTdHoliSum = document.createElement("td");
        newTfootTdHoliSum.classList.add("sum-data");
        newTfootTdHoliSum.id = "holi-sum";
        newTfootTdHoliSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdHoliSum);
        // 合計深夜時間
        const newTfootTdMidSum = document.createElement("td");
        newTfootTdMidSum.classList.add("sum-data");
        newTfootTdMidSum.id = "mid-sum";
        newTfootTdMidSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdMidSum);
        const newTfootTdComment = document.createElement("td");
        newTfootTr.appendChild(newTfootTdComment);
        newTfoot.appendChild(newTfootTr);
        return newTfoot;
    }

    /**
     * 行合計計算
     * @param num 行番号
     */
    private _computeRow(num: string): void {
        const row = document.querySelector(`#date-${num}`)?.parentElement;

        // 開始時刻の値取得
        const startElement = document.querySelector(`#start-${num}`) as HTMLInputElement;
        const startValue = startElement.value;
        // 終了時刻の値取得
        const endElement = document.querySelector(`#end-${num}`) as HTMLInputElement;
        const endValue = endElement.value;
        // 休憩時間の値取得
        const breakElement = document.querySelector(`#break-${num}`) as HTMLInputElement;
        const breakValue = breakElement.value;

        // 所定内時間
        const normal = document.querySelector(`#normal-${num}`) as HTMLTableCellElement;
        // 時間外時間
        const over = document.querySelector(`#over-${num}`) as HTMLTableCellElement;
        // 休日時間
        const holi = document.querySelector(`#holi-${num}`) as HTMLTableCellElement;
        // 深夜時間
        const mid = document.querySelector(`#mid-${num}`) as HTMLTableCellElement;

        if (CheckUtil.isEmpty(startValue) || CheckUtil.isEmpty(endValue) || CheckUtil.isEmpty(breakValue)) {
            // いずれかが未入力の場合
            normal.textContent = "00:00";
            over.textContent = "00:00";
            holi.textContent = "00:00";
            mid.textContent = "00:00";
        } else if (CheckUtil.isInputError(startValue) || CheckUtil.isInputError(endValue) || CheckUtil.isInputError(breakValue)) {
            // いずれかが入力チェックエラーの場合
            normal.textContent = "Error";
            over.textContent = "Error";
            holi.textContent = "Error";
            mid.textContent = "Error";
        } else if (!CheckUtil.isEmpty(startValue) && !CheckUtil.isEmpty(endValue) && !CheckUtil.isEmpty(breakValue)) {
            // 全て入力がされている場合
            const start = startValue.split(':');
            const end = endValue.split(':');
            const qk = breakValue.split(':');
            let sumTime = parseInt(end[0]) - parseInt(start[0]) - parseInt(qk[0]) + (parseInt(end[1]) - parseInt(start[1]) - parseInt(qk[1])) / 60;
            if (sumTime > 8 && row?.classList.contains("weekday")) {
                // 8時間以上 && 平日
                normal.textContent = "08:00";
                const h = Math.floor(sumTime - 8);
                const m = parseFloat("0." + (String(sumTime - 8)).split(".")[1]) * 60;
                over.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
                holi.textContent = "00:00";
            } else if (sumTime <= 8 && row?.classList.contains("weekday")) {
                // 8時間未満 && 平日
                const h = Math.floor(sumTime);
                const m = parseFloat("0." + (String(sumTime)).split(".")[1]) * 60;
                normal.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
                over.textContent = "00:00";
                holi.textContent = "00:00";
            } else if (row?.classList.contains("saturday") || row?.classList.contains("sunday") || row?.classList.contains("holiday")) {
                // 休日
                const h = Math.floor(sumTime);
                const m = parseFloat("0." + (String(sumTime)).split(".")[1]) * 60;
                normal.textContent = "00:00";
                over.textContent = "00:00";
                holi.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
            }

            if (parseInt(start[0]) >= 22 || parseInt(start[0]) < 6) {
                // 深夜作業が深夜時間以降に開始の場合
                const midTime = parseInt(end[0]) - parseInt(start[0]) - parseInt(qk[0]) + (parseInt(end[1]) - parseInt(start[1]) - parseInt(qk[1])) / 60;
                const h = Math.floor(midTime);
                const m = parseFloat("0." + (String(midTime)).split(".")[1]) * 60;
                mid.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
            } else if (parseInt(end[0]) >= 22 || parseInt(end[0]) < 6) {
                // 深夜作業が深夜時間以前に開始の場合
                const midTime = parseInt(end[0]) - 22 + parseInt(end[1]) / 60;
                const h = Math.floor(midTime);
                const m = parseFloat("0." + (String(midTime)).split(".")[1]) * 60;
                mid.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
            }
        }
    }

    /**
     * 列合計計算処理
     */
    private _computeSum(): void {
        const sumElement = document.querySelector(`#sum`) as HTMLTableCellElement;
        const normalSumElement = document.querySelector(`#normal-sum`) as HTMLTableCellElement;
        const overSumElement = document.querySelector(`#over-sum`) as HTMLTableCellElement;
        const holiSumElement = document.querySelector(`#holi-sum`) as HTMLTableCellElement;
        const midSumElement = document.querySelector(`#mid-sum`) as HTMLTableCellElement;

        const rows = document.querySelectorAll("table tbody tr");
        let normalSum = 0.00;
        let overSum = 0.00;
        let holiSum = 0.00;
        let midSum = 0.00;
        for (let i = 0; i < rows.length; i++) {
            // 合計所定内時間の計算
            const normalElement = rows[i].querySelector(`.normal`);
            const normalValue = normalElement?.textContent?.split(":");
            if (normalValue) {
                normalSum += (parseInt(normalValue[0]) + parseInt(normalValue[1]) / 60);
            }
            // 合計時間外時間の計算
            const overElement = rows[i].querySelector(`.over`);
            const overValue = overElement?.textContent?.split(":");
            if (overValue) {
                overSum += (parseInt(overValue[0]) + parseInt(overValue[1]) / 60);
            }
            // 合計休日時間の計算
            const holiElement = rows[i].querySelector(`.holi`);
            const holiValue = holiElement?.textContent?.split(":");
            if (holiValue) {
                holiSum += (parseInt(holiValue[0]) + parseInt(holiValue[1]) / 60);
            }
            // 合計深夜時間の計算
            const midElement = rows[i].querySelector(`.mid`);
            const midValue = midElement?.textContent?.split(":");
            if (midValue) {
                midSum += (parseInt(midValue[0]) + parseInt(midValue[1]) / 60);
            }
        }
        // 所定内時間の値設定
        normalSumElement.textContent = normalSum.toFixed(2);
        // 合計時間外時間の値設定
        overSumElement.textContent = overSum.toFixed(2);
        // 合計休日時間の値設定
        holiSumElement.textContent = holiSum.toFixed(2);
        // 合計深夜時間の値設定
        midSumElement.textContent = midSum.toFixed(2);

        sumElement.textContent = (normalSum + overSum + holiSum).toFixed(2);
    }
}