import { DateInfo } from "./DateInfo";
/**
 * 勤怠情報データクラス
 */
export class KintaiInfo {
    /** 勤怠ID */
    private _kintaiId: string = "";
    /** 会社名 */
    private _company: string = "";
    /** 部署名 */
    private _deploy: string = "";
    /** 氏名 */
    private _name: string = "";
    /** 案件名 */
    private _anken: string = "";
    /** 所定就業開始時間 */
    private _teiziStart: string = "";
    /** 所定就業終了時間 */
    private _teiziEnd: string = "";
    /** 所定就業休憩時間 */
    private _qk: string = "";
    /** 日付別勤怠データリスト */
    private _dateList: Array<DateInfo> = [];
    set kintaiId(kintaiId: string) {
        this._kintaiId = kintaiId;
    }
    get kintaiId(): string {
        return this._kintaiId;
    }
    set company(company: string) {
        this._company = company;
    }
    get company(): string {
        return this._company;
    }
    set deploy(deploy: string) {
        this._deploy = deploy;
    }
    get deploy(): string {
        return this._deploy;
    }
    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }
    set anken(anken: string) {
        this._anken = anken;
    }
    get anken(): string {
        return this._anken;
    }
    set teiziStart(teiziStart: string) {
        if (teiziStart !== "") {
            const hour = teiziStart.split(":")[0].padStart(2, "0");
            const min = teiziStart.split(":")[1].padStart(2, "0");
            teiziStart = `${hour}:${min}`;
        }
        this._teiziStart = teiziStart;
    }
    get teiziStart(): string {
        return this._teiziStart;
    }
    set teiziEnd(teiziEnd: string) {
        if (teiziEnd !== "") {
            const hour = teiziEnd.split(":")[0].padStart(2, "0");
            const min = teiziEnd.split(":")[1].padStart(2, "0");
            teiziEnd = `${hour}:${min}`;
        }
        this._teiziEnd = teiziEnd;
    }
    get teiziEnd(): string {
        return this._teiziEnd;
    }
    set qk(qk: string) {
        if (qk !== "") {
            const hour = qk.split(":")[0].padStart(2, "0");
            const min = qk.split(":")[1].padStart(2, "0");
            qk = `${hour}:${min}`;
        }
        this._qk = qk;
    }
    get qk(): string {
        return this._qk;
    }
    set dateList(dateList: Array<DateInfo>) {
        this._dateList = dateList;
    }
    get dateList(): Array<DateInfo> {
        return this._dateList;
    }
    public getObject(): any {
        const dateInfoList = [];
        for (let i = 0; i < this.dateList.length; i++) {
            const dateInfo = {
                date : this.dateList[i].date,
                type : this.dateList[i].type,
                startTime : this.dateList[i].startTime,
                endTime : this.dateList[i].endTime,
                breakTime : this.dateList[i].breakTime,
                comment : this.dateList[i].comment,
            };
            dateInfoList.push(dateInfo);
        }
        return {
            kintaiId : this.kintaiId,
            company : this.company,
            deploy : this.deploy,
            name : this.name,
            anken : this.anken,
            teiziStart : this.teiziStart,
            teiziEnd : this.teiziEnd,
            qk : this.qk,
            dateList : dateInfoList
        };
    }
    public setObject(object: any): void {
        this.kintaiId = object.kintaiId;
        this.company = object.company;
        this.deploy = object.deploy;
        this.name = object.name;
        this.anken = object.anken;
        this.teiziStart = object.teiziStart;
        this.teiziEnd = object.teiziEnd;
        this.qk = object.qk;
        for (let i = 0; i < object.dateList.length; i++) {
            const dateInfo = new DateInfo();
            dateInfo.date = object.dateList[i].date;
            dateInfo.type = object.dateList[i].type;
            dateInfo.startTime = object.dateList[i].startTime;
            dateInfo.endTime = object.dateList[i].endTime;
            dateInfo.breakTime = object.dateList[i].breakTime;
            dateInfo.comment = object.dateList[i].comment;
            this.dateList[i] = dateInfo;
        }
    }
}