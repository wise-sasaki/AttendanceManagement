export class CheckUtil {
    constructor() { }

    public static inputCheck(inputElement: HTMLInputElement): boolean {
        inputElement.classList.remove("error");
        inputElement.title = "";
        if (this.isInputError(inputElement.value)) {
            inputElement.classList.add("error");
            inputElement.title = "HH:MM形式かつMMは15分区切りで入力してください。";
            return false;
        }
        return true;
    }
    public static isInputError(value: string): boolean {
        // 未入力チェック
        if (this.isEmpty(value)) {
            return false;
        }

        // 正規表現チェック
        const regex = /^([01][0-9]|2[0-9]):[0-5][0-9]$/;
        if (!regex.test(value)) {
            return true;
        }

        // 分チェック
        const min = value.split(":")[1];
        if (!(min === "00" || min === "15" || min === "30" || min === "45")) {
            return true;
        }

        return false;
    }

    public static isEmpty(value: string) {
        if (value == null || value === "") {
            return true;
        }
        return false;
    }

}