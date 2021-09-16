/**
 * 定時一括入力ボタンクラス
 * 
 * 勤怠データを所定就業時間および休憩時間に合わせて一括で入力する機能です。
 * すでに入力がある項目に対しても全て上書きで入力します。
 * 休日の日付に対しては入力が行われません。
 */
export class BulkInputButton {
    constructor() {
        this._addEventListener();
    }
    private _addEventListener(): void {
        const button = document.getElementById("bulk-data");
        button?.addEventListener("click", (event: any) => {
            const rows = document.querySelectorAll("table tbody tr");
            for(let i = 0; i < rows.length; i++) {
                if (!rows[i].classList.contains("weekday") || rows[i].classList.contains("holiday")) {
                    // 平日行以外は処理しない
                    continue;
                }
                const startElement = rows[i].querySelector(`#start-${i} + button`) as HTMLButtonElement;
                startElement.click();
                const endElement = rows[i].querySelector(`#end-${i} + button`) as HTMLButtonElement;
                endElement.click();
                const breakElement = rows[i].querySelector(`#break-${i} + button`) as HTMLButtonElement;
                breakElement.click();
            }
        });
    }
}