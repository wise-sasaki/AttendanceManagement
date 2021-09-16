/**
 * 日付別勤怠データリスト
 */
export class DateInfo {
    private _date: Date = new Date();
    private _type: string = "";
    private _startTime: string = "";
    private _endTime: string = "";
    private _breakTime: string = "";
    private _comment: string = "";
    set date(date: Date) {
        this._date = date;
    }
    get date(): Date {
        return this._date;
    }
    set type(type: string) {
        this._type = type;
    }
    get type(): string {
        return this._type;
    }
    set startTime(startTime: string) {
        if (startTime !== "") {
            const hour = startTime.split(":")[0].padStart(2, "0");
            const min = startTime.split(":")[1].padStart(2, "0");
            startTime = `${hour}:${min}`;
        }
        this._startTime = startTime;
    }
    get startTime(): string {
        return this._startTime;
    }
    set endTime(endTime: string) {
        if (endTime !== "") {
            const hour = endTime.split(":")[0].padStart(2, "0");
            const min = endTime.split(":")[1].padStart(2, "0");
            endTime = `${hour}:${min}`;
        }
        this._endTime = endTime;
    }
    get endTime(): string {
        return this._endTime;
    }
    set breakTime(breakTime: string) {
        if (breakTime !== "") {
            const hour = breakTime.split(":")[0].padStart(2, "0");
            const min = breakTime.split(":")[1].padStart(2, "0");
            breakTime = `${hour}:${min}`;
        }
        this._breakTime = breakTime;
    }
    get breakTime(): string {
        return this._breakTime;
    }
    set comment(comment: string) {
        this._comment = comment;
    }
    get comment(): string {
        return this._comment;
    }
}