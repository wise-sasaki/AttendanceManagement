export class BulkInput {
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