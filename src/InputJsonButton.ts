import { DAO } from "./DAO";
import { KintaiInfo } from "./KintaiInfo";
import { DateInfo } from "./DateInfo";
import { DataSelectList } from "./DataSelectList";
export class InputJsonButton {
    constructor() {
        this._addEventListener();
    }
    private _addEventListener(): void {
        const button = document.getElementById("input-data");
        const file = document.getElementById("file") as HTMLInputElement;
        file.accept = ".json";
        button?.addEventListener("click", (event: any) => {
            const result = confirm(`既存のデータは上書きされます。ファイルを読み込みますか？`);
            if (result) {
                file.click();
                file.addEventListener("change", (event: any) => {
                    this._readFile(event);
                });
            }
        });
    }
    private _readFile(event: any) {
        if (event.target?.files.length > 0) {
            const file = event.target?.files[0];
            // DB接続
            const dao = DAO.getInstance();
            // ファイル読込
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = async () => {
                const json = fileReader.result as string;
                const jsonString = JSON.parse(json);
                for (let i = 0; i < jsonString.length; i++) {
                    console.log(jsonString[i]);
                    const kintaiInfo = new KintaiInfo();
                    kintaiInfo.kintaiId = jsonString[i]._kintaiId;
                    kintaiInfo.company = jsonString[i]._company;
                    kintaiInfo.deploy = jsonString[i]._deploy;
                    kintaiInfo.name = jsonString[i]._name;
                    kintaiInfo.anken = jsonString[i]._anken;
                    kintaiInfo.teiziStart = jsonString[i]._teiziStart;
                    kintaiInfo.teiziEnd = jsonString[i]._teiziEnd;
                    kintaiInfo.qk = jsonString[i]._qk;
                    const dateInfoList = [];
                    for (let j = 0; j < jsonString[i]._dateList.length; j++) {
                        const dateInfo = new DateInfo();
                        dateInfo.date = new Date(jsonString[i]._dateList[j]._date);
                        dateInfo.type = jsonString[i]._dateList[j]._type;
                        dateInfo.startTime = jsonString[i]._dateList[j]._startTime;
                        dateInfo.endTime = jsonString[i]._dateList[j]._endTime;
                        dateInfo.breakTime = jsonString[i]._dateList[j]._breakTime;
                        dateInfo.comment = jsonString[i]._dateList[j]._comment;
                        dateInfoList.push(dateInfo);
                    }
                    kintaiInfo.dateList = dateInfoList;
                    await dao.update(kintaiInfo);
                }

                // 勤怠データ選択リスト作成
                new DataSelectList("");

                alert(`ファイルの読込が完了しました。`);
            }
        }

    }
}