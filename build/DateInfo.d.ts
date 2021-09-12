export declare class DateInfo {
    private _date;
    private _type;
    private _startTime;
    private _endTime;
    private _breakTime;
    private _comment;
    set date(date: Date);
    get date(): Date;
    set type(type: string);
    get type(): string;
    set startTime(startTime: string);
    get startTime(): string;
    set endTime(endTime: string);
    get endTime(): string;
    set breakTime(breakTime: string);
    get breakTime(): string;
    set comment(comment: string);
    get comment(): string;
}
