/**
 * 入力チェッククラス
 */
export class CheckUtil {
    constructor() { }

    /**
     * input要素に対して入力チェック結果を反映する処理
     * @param inputElement 入力チェック対象要素
     * @returns true:チェックOK false:チェックNG
     */
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

    /**
     * 各種入力チェックを判定する処理
     * @param value 入力値
     * @returns true:チェックNG false:チェックOK
     */
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

    /**
     * 未入力チェックを判定する処理
     * @param value 
     * @returns 
     */
    public static isEmpty(value: string) {
        if (value == null || value === "") {
            return true;
        }
        return false;
    }
}