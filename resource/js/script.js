/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BulkInput.ts":
/*!**************************!*\
  !*** ./src/BulkInput.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BulkInput": () => (/* binding */ BulkInput)
/* harmony export */ });
var BulkInput = (function () {
    function BulkInput() {
        this._addEventListener();
    }
    BulkInput.prototype._addEventListener = function () {
        var button = document.getElementById("bulk-data");
        button === null || button === void 0 ? void 0 : button.addEventListener("click", function (event) {
            var rows = document.querySelectorAll("table tbody tr");
            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].classList.contains("weekday") || rows[i].classList.contains("holiday")) {
                    continue;
                }
                var startElement = rows[i].querySelector("#start-" + i + " + button");
                startElement.click();
                var endElement = rows[i].querySelector("#end-" + i + " + button");
                endElement.click();
                var breakElement = rows[i].querySelector("#break-" + i + " + button");
                breakElement.click();
            }
        });
    };
    return BulkInput;
}());



/***/ }),

/***/ "./src/CheckUtil.ts":
/*!**************************!*\
  !*** ./src/CheckUtil.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckUtil": () => (/* binding */ CheckUtil)
/* harmony export */ });
var CheckUtil = (function () {
    function CheckUtil() {
    }
    CheckUtil.inputCheck = function (inputElement) {
        inputElement.classList.remove("error");
        inputElement.title = "";
        if (this.isInputError(inputElement.value)) {
            inputElement.classList.add("error");
            inputElement.title = "HH:MM形式かつMMは15分区切りで入力してください。";
            return false;
        }
        return true;
    };
    CheckUtil.isInputError = function (value) {
        if (this.isEmpty(value)) {
            return false;
        }
        var regex = /^([01][0-9]|2[0-9]):[0-5][0-9]$/;
        if (!regex.test(value)) {
            return true;
        }
        var min = value.split(":")[1];
        if (!(min === "00" || min === "15" || min === "30" || min === "45")) {
            return true;
        }
        return false;
    };
    CheckUtil.isEmpty = function (value) {
        if (value == null || value === "") {
            return true;
        }
        return false;
    };
    return CheckUtil;
}());



/***/ }),

/***/ "./src/CreateKintaiTable.ts":
/*!**********************************!*\
  !*** ./src/CreateKintaiTable.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateKintaiTable": () => (/* binding */ CreateKintaiTable)
/* harmony export */ });
/* harmony import */ var _CheckUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckUtil */ "./src/CheckUtil.ts");
/* harmony import */ var _DayType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DayType */ "./src/DayType.ts");
/* harmony import */ var _HolidayType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HolidayType */ "./src/HolidayType.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var CreateKintaiTable = (function () {
    function CreateKintaiTable() {
    }
    CreateKintaiTable.prototype.create = function (kintaiInfo) {
        this._dateData(kintaiInfo);
        this._userData(kintaiInfo);
        this._ankenData(kintaiInfo);
        this._kintaiTable(kintaiInfo);
    };
    CreateKintaiTable.prototype._dateData = function (kintaiInfo) {
        var yearMonth = document.querySelector("span#year-month");
        yearMonth.textContent = kintaiInfo.kintaiId.substring(0, 4) + "\u5E74" + kintaiInfo.kintaiId.substring(4, 6) + "\u6708\u5EA6";
        var kintaiId = document.querySelector("span#kintai-id");
        kintaiId.textContent = kintaiInfo.kintaiId;
    };
    CreateKintaiTable.prototype._userData = function (kintaiInfo) {
        var company = document.querySelector("input#company");
        company.value = kintaiInfo.company;
        var deploy = document.querySelector("input#deploy");
        deploy.value = kintaiInfo.deploy;
        var name = document.querySelector("input#name");
        name.value = kintaiInfo.name;
    };
    CreateKintaiTable.prototype._ankenData = function (kintaiInfo) {
        var anken = document.querySelector("input#anken");
        anken.value = kintaiInfo.anken;
        var teiziStart = document.querySelector("input#teizi-start");
        teiziStart.value = kintaiInfo.teiziStart;
        teiziStart.addEventListener("change", function () {
            _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(teiziStart);
        });
        var teiziEnd = document.querySelector("input#teizi-end");
        teiziEnd.value = kintaiInfo.teiziEnd;
        teiziEnd.addEventListener("change", function () {
            _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(teiziEnd);
        });
        var qk = document.querySelector("input#qk");
        qk.value = kintaiInfo.qk;
        qk.addEventListener("change", function () {
            _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(qk);
        });
    };
    CreateKintaiTable.prototype._kintaiTable = function (kintaiInfo) {
        var tableWrap = document.querySelector("div.kintai-table");
        var child = tableWrap === null || tableWrap === void 0 ? void 0 : tableWrap.children;
        if (child) {
            for (var i = 0; i < child.length; i++) {
                child[i].remove();
            }
        }
        var newTable = document.createElement("table");
        var newThead = this._thead();
        newTable.appendChild(newThead);
        var newTbody = this._tbody(kintaiInfo);
        newTable.appendChild(newTbody);
        var newTfoot = this._tfoot();
        newTable.appendChild(newTfoot);
        tableWrap === null || tableWrap === void 0 ? void 0 : tableWrap.appendChild(newTable);
        var rows = document.querySelectorAll("table tbody tr");
        for (var i = 0; i < rows.length; i++) {
            this._computeRow(i.toString());
        }
        this._computeSum();
    };
    CreateKintaiTable.prototype._thead = function () {
        var newThead = document.createElement("thead");
        var newTheadTr = document.createElement("tr");
        var newTheadThDate = document.createElement("th");
        newTheadThDate.classList.add("date");
        newTheadThDate.textContent = "日付";
        newTheadTr.appendChild(newTheadThDate);
        var newTheadThDay = document.createElement("th");
        newTheadThDay.classList.add("day");
        newTheadThDay.textContent = "曜日";
        newTheadTr.appendChild(newTheadThDay);
        var newTheadThHoly = document.createElement("th");
        newTheadThHoly.classList.add("type");
        newTheadThHoly.innerHTML = "休日<br>祝日";
        newTheadTr.appendChild(newTheadThHoly);
        var newTheadThStart = document.createElement("th");
        newTheadThStart.classList.add("start");
        newTheadThStart.textContent = "開始時刻";
        newTheadTr.appendChild(newTheadThStart);
        var newTheadThEnd = document.createElement("th");
        newTheadThEnd.classList.add("end");
        newTheadThEnd.textContent = "終了時刻";
        newTheadTr.appendChild(newTheadThEnd);
        var newTheadThBreak = document.createElement("th");
        newTheadThBreak.classList.add("break");
        newTheadThBreak.textContent = "休憩時間";
        newTheadTr.appendChild(newTheadThBreak);
        var newTheadThNormal = document.createElement("th");
        newTheadThNormal.classList.add("normal");
        newTheadThNormal.innerHTML = "所定内<br>時間";
        newTheadTr.appendChild(newTheadThNormal);
        var newTheadThOver = document.createElement("th");
        newTheadThOver.classList.add("over");
        newTheadThOver.innerHTML = "時間外<br>時間";
        newTheadTr.appendChild(newTheadThOver);
        var newTheadThHoli = document.createElement("th");
        newTheadThHoli.classList.add("holi");
        newTheadThHoli.innerHTML = "休日<br>時間";
        newTheadTr.appendChild(newTheadThHoli);
        var newTheadThMid = document.createElement("th");
        newTheadThMid.classList.add("mid");
        newTheadThMid.innerHTML = "深夜<br>(内訳)";
        newTheadTr.appendChild(newTheadThMid);
        var newTheadThComment = document.createElement("th");
        newTheadThComment.classList.add("comment");
        newTheadThComment.textContent = "コメント";
        newTheadTr.appendChild(newTheadThComment);
        newThead.appendChild(newTheadTr);
        return newThead;
    };
    CreateKintaiTable.prototype._tbody = function (kintaiInfo) {
        var _this = this;
        var newTbody = document.createElement("tbody");
        var _loop_1 = function (i) {
            var dateData = kintaiInfo.dateList[i];
            var newTbodyTr = document.createElement("tr");
            var newTheadTdDate = document.createElement("td");
            newTheadTdDate.classList.add("date");
            newTheadTdDate.id = "date-" + i;
            newTheadTdDate.textContent = (dateData.date.getMonth() + 1).toString() + "/" + dateData.date.getDate().toString();
            newTbodyTr.appendChild(newTheadTdDate);
            var newTheadTdDay = document.createElement("td");
            newTheadTdDay.classList.add("day");
            newTheadTdDay.id = "day-" + i;
            switch (dateData.date.getDay()) {
                case _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.SUNDAY:
                    newTbodyTr.classList.add("sunday");
                    newTheadTdDay.textContent = "日";
                    break;
                case _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.MONDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "月";
                    break;
                case _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.TUESDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "火";
                    break;
                case _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.WEDNESDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "水";
                    break;
                case _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.THURSDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "木";
                    break;
                case _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.FRIDAY:
                    newTbodyTr.classList.add("weekday");
                    newTheadTdDay.textContent = "金";
                    break;
                case _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.SATURDAY:
                    newTbodyTr.classList.add("saturday");
                    newTheadTdDay.textContent = "土";
                    break;
            }
            newTbodyTr.appendChild(newTheadTdDay);
            var newTheadTdType = document.createElement("td");
            newTheadTdType.classList.add("type");
            if (dateData.date.getDay() !== _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.SUNDAY && dateData.date.getDay() !== _DayType__WEBPACK_IMPORTED_MODULE_1__.DayType.SATURDAY) {
                var newTheadTdSelect_1 = document.createElement("select");
                newTheadTdSelect_1.classList.add("type");
                newTheadTdSelect_1.id = "type-" + i;
                newTheadTdSelect_1.addEventListener("change", function (e) {
                    var _a;
                    var id = newTheadTdStartInput.id;
                    var num = id === null || id === void 0 ? void 0 : id.split("-")[1];
                    var row = (_a = document.querySelector("#date-" + num)) === null || _a === void 0 ? void 0 : _a.parentElement;
                    switch (newTheadTdSelect_1.value) {
                        case _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.YASUMI:
                        case _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.YUKYU:
                        case _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.SYUKUZITU:
                            row === null || row === void 0 ? void 0 : row.classList.add("holiday");
                            break;
                        default:
                            row === null || row === void 0 ? void 0 : row.classList.remove("holiday");
                            break;
                    }
                    _this._computeRow(num);
                    _this._computeSum();
                });
                var newTheadTdSelectOption = document.createElement("option");
                newTheadTdSelectOption.value = "";
                newTheadTdSelectOption.textContent = "　";
                newTheadTdSelect_1.appendChild(newTheadTdSelectOption);
                var newTheadTdSelectOption0 = document.createElement("option");
                newTheadTdSelectOption0.value = _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.YASUMI;
                newTheadTdSelectOption0.textContent = "休";
                newTheadTdSelect_1.appendChild(newTheadTdSelectOption0);
                var newTheadTdSelectOption1 = document.createElement("option");
                newTheadTdSelectOption1.value = _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.YUKYU;
                newTheadTdSelectOption1.textContent = "有";
                newTheadTdSelect_1.appendChild(newTheadTdSelectOption1);
                var newTheadTdSelectOption2 = document.createElement("option");
                newTheadTdSelectOption2.value = _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.SYUKUZITU;
                newTheadTdSelectOption2.textContent = "祝";
                newTheadTdSelect_1.appendChild(newTheadTdSelectOption2);
                switch (dateData.type) {
                    case _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.YASUMI:
                        newTbodyTr.classList.add("holiday");
                        newTheadTdSelectOption0.selected = true;
                        break;
                    case _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.YUKYU:
                        newTbodyTr.classList.add("holiday");
                        newTheadTdSelectOption1.selected = true;
                        break;
                    case _HolidayType__WEBPACK_IMPORTED_MODULE_2__.HolidayType.SYUKUZITU:
                        newTbodyTr.classList.add("holiday");
                        newTheadTdSelectOption2.selected = true;
                        break;
                }
                newTheadTdType.appendChild(newTheadTdSelect_1);
            }
            newTbodyTr.appendChild(newTheadTdType);
            var newTheadTdStart = document.createElement("td");
            newTheadTdStart.classList.add("start");
            var newTheadTdStartInput = document.createElement("input");
            newTheadTdStartInput.type = "text";
            newTheadTdStartInput.classList.add("start-time");
            newTheadTdStartInput.id = "start-" + i;
            newTheadTdStartInput.pattern = "^([01][0-9]|2[0-9]):[0-5][0-9]$";
            newTheadTdStartInput.maxLength = 5;
            newTheadTdStartInput.value = dateData.startTime;
            newTheadTdStartInput.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
                var id, num, normal, over, holi, mid;
                return __generator(this, function (_a) {
                    try {
                        id = newTheadTdStartInput.id;
                        num = id === null || id === void 0 ? void 0 : id.split("-")[1];
                        normal = document.querySelector("#normal-" + num);
                        over = document.querySelector("#over-" + num);
                        holi = document.querySelector("#holi-" + num);
                        mid = document.querySelector("#mid-" + num);
                        if (!_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(newTheadTdStartInput)) {
                            normal.textContent = "Error";
                            over.textContent = "Error";
                            holi.textContent = "Error";
                            mid.textContent = "Error";
                            this._computeSum();
                            return [2];
                        }
                        this._computeRow(num);
                        this._computeSum();
                    }
                    catch (e) {
                        console.error("error:" + e);
                    }
                    return [2];
                });
            }); });
            newTheadTdStart.appendChild(newTheadTdStartInput);
            var newTheadTdStartButton = document.createElement("button");
            newTheadTdStartButton.type = "button";
            newTheadTdStartButton.classList.add("user-button");
            newTheadTdStartButton.id = "start-button-" + i;
            newTheadTdStartButton.textContent = "定時";
            newTheadTdStartButton.tabIndex = -1;
            newTheadTdStartButton.addEventListener("click", function () {
                var teiziStart = document.querySelector("#teizi-start");
                newTheadTdStartInput.value = teiziStart.value;
                _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(newTheadTdStartInput);
                _this._computeRow(newTheadTdStartButton.id.split("-")[2]);
                _this._computeSum();
            });
            newTheadTdStart.appendChild(newTheadTdStartButton);
            newTbodyTr.appendChild(newTheadTdStart);
            var newTheadTdEnd = document.createElement("td");
            newTheadTdEnd.classList.add("end");
            var newTheadTdEndInput = document.createElement("input");
            newTheadTdEndInput.type = "text";
            newTheadTdEndInput.classList.add("end-time");
            newTheadTdEndInput.id = "end-" + i;
            newTheadTdEndInput.pattern = "^([01][0-9]|2[0-9]):[0-5][0-9]$";
            newTheadTdEndInput.maxLength = 5;
            newTheadTdEndInput.value = dateData.endTime;
            newTheadTdEndInput.addEventListener("change", function () {
                var id = newTheadTdEndInput.id;
                var num = id === null || id === void 0 ? void 0 : id.split("-")[1];
                var normal = document.querySelector("#normal-" + num);
                var over = document.querySelector("#over-" + num);
                var holi = document.querySelector("#holi-" + num);
                var mid = document.querySelector("#mid-" + num);
                if (!_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(newTheadTdEndInput)) {
                    normal.textContent = "Error";
                    over.textContent = "Error";
                    holi.textContent = "Error";
                    mid.textContent = "Error";
                    _this._computeSum();
                    return;
                }
                _this._computeRow(num);
                _this._computeSum();
            });
            newTheadTdEnd.appendChild(newTheadTdEndInput);
            var newTheadTdEndButton = document.createElement("button");
            newTheadTdEndButton.type = "button";
            newTheadTdEndButton.classList.add("user-button");
            newTheadTdEndButton.textContent = "定時";
            newTheadTdEndButton.tabIndex = -1;
            newTheadTdEndButton.addEventListener("click", function () {
                var teiziEnd = document.querySelector("#teizi-end");
                newTheadTdEndInput.value = teiziEnd === null || teiziEnd === void 0 ? void 0 : teiziEnd.value;
                _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(newTheadTdEndInput);
                _this._computeRow(newTheadTdStartButton.id.split("-")[2]);
                _this._computeSum();
            });
            newTheadTdEnd.appendChild(newTheadTdEndButton);
            newTbodyTr.appendChild(newTheadTdEnd);
            var newTheadTdBreak = document.createElement("td");
            newTheadTdBreak.classList.add("break");
            var newTheadTdBreakInput = document.createElement("input");
            newTheadTdBreakInput.type = "text";
            newTheadTdBreakInput.classList.add("break-time");
            newTheadTdBreakInput.id = "break-" + i;
            newTheadTdBreakInput.pattern = "^([01][0-9]|2[0-9]):[0-5][0-9]$";
            newTheadTdBreakInput.maxLength = 5;
            newTheadTdBreakInput.value = dateData.breakTime;
            newTheadTdBreakInput.addEventListener("change", function () {
                var id = newTheadTdBreakInput.id;
                var num = id === null || id === void 0 ? void 0 : id.split("-")[1];
                var normal = document.querySelector("#normal-" + num);
                var over = document.querySelector("#over-" + num);
                var holi = document.querySelector("#holi-" + num);
                var mid = document.querySelector("#mid-" + num);
                if (!_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(newTheadTdBreakInput)) {
                    normal.textContent = "Error";
                    over.textContent = "Error";
                    holi.textContent = "Error";
                    mid.textContent = "Error";
                    _this._computeSum();
                    return;
                }
                _this._computeRow(num);
                _this._computeSum();
            });
            newTheadTdBreak.appendChild(newTheadTdBreakInput);
            var newTheadTdBreakButton = document.createElement("button");
            newTheadTdBreakButton.type = "button";
            newTheadTdBreakButton.classList.add("user-button");
            newTheadTdBreakButton.textContent = "定時";
            newTheadTdBreakButton.tabIndex = -1;
            newTheadTdBreakButton.addEventListener("click", function () {
                var teiziBreak = document.querySelector("#qk");
                newTheadTdBreakInput.value = teiziBreak === null || teiziBreak === void 0 ? void 0 : teiziBreak.value;
                _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.inputCheck(newTheadTdBreakInput);
                _this._computeRow(newTheadTdStartButton.id.split("-")[2]);
                _this._computeSum();
            });
            newTheadTdBreak.appendChild(newTheadTdBreakButton);
            newTbodyTr.appendChild(newTheadTdBreak);
            var newTheadTdNormal = document.createElement("td");
            newTheadTdNormal.classList.add("normal");
            newTheadTdNormal.id = "normal-" + i;
            newTheadTdNormal.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdNormal);
            var newTheadTdOver = document.createElement("td");
            newTheadTdOver.classList.add("over");
            newTheadTdOver.id = "over-" + i;
            newTheadTdOver.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdOver);
            var newTheadTdHoli = document.createElement("td");
            newTheadTdHoli.classList.add("holi");
            newTheadTdHoli.id = "holi-" + i;
            newTheadTdHoli.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdHoli);
            var newTheadTdMid = document.createElement("td");
            newTheadTdMid.classList.add("mid");
            newTheadTdMid.id = "mid-" + i;
            newTheadTdMid.textContent = "00:00";
            newTbodyTr.appendChild(newTheadTdMid);
            var newTheadTdComment = document.createElement("td");
            newTheadTdComment.classList.add("comment");
            var newTheadTdCommentInput = document.createElement("input");
            newTheadTdCommentInput.type = "text";
            newTheadTdCommentInput.classList.add("comment");
            newTheadTdCommentInput.id = "comment-" + i;
            newTheadTdCommentInput.value = dateData.comment;
            newTheadTdComment.appendChild(newTheadTdCommentInput);
            newTbodyTr.appendChild(newTheadTdComment);
            newTbody.appendChild(newTbodyTr);
        };
        for (var i = 0; i < kintaiInfo.dateList.length; i++) {
            _loop_1(i);
        }
        return newTbody;
    };
    CreateKintaiTable.prototype._tfoot = function () {
        var newTfoot = document.createElement("tfoot");
        var newTfootTr = document.createElement("tr");
        var newTfootTdDate = document.createElement("td");
        newTfootTr.appendChild(newTfootTdDate);
        var newTfootTdDay = document.createElement("td");
        newTfootTr.appendChild(newTfootTdDay);
        var newTfootTdType = document.createElement("td");
        newTfootTr.appendChild(newTfootTdType);
        var newTfootTdSumData = document.createElement("td");
        newTfootTdSumData.classList.add("sum-data");
        newTfootTdSumData.colSpan = 2;
        newTfootTdSumData.textContent = "合計";
        newTfootTr.appendChild(newTfootTdSumData);
        var newTfootTdSum = document.createElement("td");
        newTfootTdSum.classList.add("sum-data");
        newTfootTdSum.id = "sum";
        newTfootTdSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdSum);
        var newTfootTdNormalSum = document.createElement("td");
        newTfootTdNormalSum.classList.add("sum-data");
        newTfootTdNormalSum.id = "normal-sum";
        newTfootTdNormalSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdNormalSum);
        var newTfootTdOverSum = document.createElement("td");
        newTfootTdOverSum.classList.add("sum-data");
        newTfootTdOverSum.id = "over-sum";
        newTfootTdOverSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdOverSum);
        var newTfootTdHoliSum = document.createElement("td");
        newTfootTdHoliSum.classList.add("sum-data");
        newTfootTdHoliSum.id = "holi-sum";
        newTfootTdHoliSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdHoliSum);
        var newTfootTdMidSum = document.createElement("td");
        newTfootTdMidSum.classList.add("sum-data");
        newTfootTdMidSum.id = "mid-sum";
        newTfootTdMidSum.textContent = "0.00";
        newTfootTr.appendChild(newTfootTdMidSum);
        var newTfootTdComment = document.createElement("td");
        newTfootTr.appendChild(newTfootTdComment);
        newTfoot.appendChild(newTfootTr);
        return newTfoot;
    };
    CreateKintaiTable.prototype._computeRow = function (num) {
        var _a;
        var row = (_a = document.querySelector("#date-" + num)) === null || _a === void 0 ? void 0 : _a.parentElement;
        var startElement = document.querySelector("#start-" + num);
        var startValue = startElement.value;
        var endElement = document.querySelector("#end-" + num);
        var endValue = endElement.value;
        var breakElement = document.querySelector("#break-" + num);
        var breakValue = breakElement.value;
        var normal = document.querySelector("#normal-" + num);
        var over = document.querySelector("#over-" + num);
        var holi = document.querySelector("#holi-" + num);
        var mid = document.querySelector("#mid-" + num);
        if (_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isEmpty(startValue) && _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isEmpty(endValue) && _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isEmpty(breakValue)) {
            normal.textContent = "00:00";
            over.textContent = "00:00";
            holi.textContent = "00:00";
            mid.textContent = "00:00";
        }
        else if (_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isInputError(startValue) || _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isInputError(endValue) || _CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isInputError(breakValue)) {
            normal.textContent = "Error";
            over.textContent = "Error";
            holi.textContent = "Error";
            mid.textContent = "Error";
        }
        else if (!_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isEmpty(startValue) && !_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isEmpty(endValue) && !_CheckUtil__WEBPACK_IMPORTED_MODULE_0__.CheckUtil.isEmpty(breakValue)) {
            var start = startValue.split(':');
            var end = endValue.split(':');
            var qk = breakValue.split(':');
            var sumTime = parseInt(end[0]) - parseInt(start[0]) - parseInt(qk[0]) + (parseInt(end[1]) - parseInt(start[1]) - parseInt(qk[1])) / 60;
            console.log("sumTime[" + sumTime + "]");
            console.log("h[" + Math.floor(sumTime) + "]");
            console.log("m[" + parseFloat("0." + (String(sumTime)).split(".")[1]) * 60 + "]");
            if (sumTime > 8 && (row === null || row === void 0 ? void 0 : row.classList.contains("weekday"))) {
                normal.textContent = "08:00";
                var h = Math.floor(sumTime - 8);
                var m = parseFloat("0." + (String(sumTime - 8)).split(".")[1]) * 60;
                over.textContent = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
                holi.textContent = "00:00";
            }
            else if (sumTime <= 8 && (row === null || row === void 0 ? void 0 : row.classList.contains("weekday"))) {
                var h = Math.floor(sumTime);
                var m = parseFloat("0." + (String(sumTime)).split(".")[1]) * 60;
                normal.textContent = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
                over.textContent = "00:00";
                holi.textContent = "00:00";
            }
            else if ((row === null || row === void 0 ? void 0 : row.classList.contains("saturday")) || (row === null || row === void 0 ? void 0 : row.classList.contains("sunday")) || (row === null || row === void 0 ? void 0 : row.classList.contains("holiday"))) {
                var h = Math.floor(sumTime);
                var m = parseFloat("0." + (String(sumTime)).split(".")[1]) * 60;
                normal.textContent = "00:00";
                over.textContent = "00:00";
                holi.textContent = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
            }
            if (parseInt(start[0]) >= 22 || parseInt(start[0]) < 6) {
                var midTime = parseInt(end[0]) - parseInt(start[0]) - parseInt(qk[0]) + (parseInt(end[1]) - parseInt(start[1]) - parseInt(qk[1])) / 60;
                var h = Math.floor(midTime);
                var m = parseFloat("0." + (String(midTime)).split(".")[1]) * 60;
                mid.textContent = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
            }
            else if (parseInt(end[0]) >= 22 || parseInt(end[0]) < 6) {
                var midTime = parseInt(end[0]) - 22 + parseInt(end[1]) / 60;
                var h = Math.floor(midTime);
                var m = parseFloat("0." + (String(midTime)).split(".")[1]) * 60;
                mid.textContent = h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
            }
        }
    };
    CreateKintaiTable.prototype._computeSum = function () {
        var _a, _b, _c, _d;
        var sumElement = document.querySelector("#sum");
        var normalSumElement = document.querySelector("#normal-sum");
        var overSumElement = document.querySelector("#over-sum");
        var holiSumElement = document.querySelector("#holi-sum");
        var midSumElement = document.querySelector("#mid-sum");
        var rows = document.querySelectorAll("table tbody tr");
        var normalSum = 0.00;
        var overSum = 0.00;
        var holiSum = 0.00;
        var midSum = 0.00;
        for (var i = 0; i < rows.length; i++) {
            var normalElement = rows[i].querySelector(".normal");
            var normalValue = (_a = normalElement === null || normalElement === void 0 ? void 0 : normalElement.textContent) === null || _a === void 0 ? void 0 : _a.split(":");
            if (normalValue) {
                normalSum += (parseInt(normalValue[0]) + parseInt(normalValue[1]) / 60);
            }
            var overElement = rows[i].querySelector(".over");
            var overValue = (_b = overElement === null || overElement === void 0 ? void 0 : overElement.textContent) === null || _b === void 0 ? void 0 : _b.split(":");
            if (overValue) {
                overSum += (parseInt(overValue[0]) + parseInt(overValue[1]) / 60);
            }
            var holiElement = rows[i].querySelector(".holi");
            var holiValue = (_c = holiElement === null || holiElement === void 0 ? void 0 : holiElement.textContent) === null || _c === void 0 ? void 0 : _c.split(":");
            if (holiValue) {
                holiSum += (parseInt(holiValue[0]) + parseInt(holiValue[1]) / 60);
            }
            var midElement = rows[i].querySelector(".mid");
            var midValue = (_d = midElement === null || midElement === void 0 ? void 0 : midElement.textContent) === null || _d === void 0 ? void 0 : _d.split(":");
            if (midValue) {
                midSum += (parseInt(midValue[0]) + parseInt(midValue[1]) / 60);
            }
        }
        normalSumElement.textContent = normalSum.toFixed(2);
        overSumElement.textContent = overSum.toFixed(2);
        holiSumElement.textContent = holiSum.toFixed(2);
        midSumElement.textContent = midSum.toFixed(2);
        sumElement.textContent = (normalSum + overSum + holiSum).toFixed(2);
    };
    return CreateKintaiTable;
}());



/***/ }),

/***/ "./src/DAO.ts":
/*!********************!*\
  !*** ./src/DAO.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DAO": () => (/* binding */ DAO)
/* harmony export */ });
/* harmony import */ var _KintaiInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KintaiInfo */ "./src/KintaiInfo.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var DAO = (function () {
    function DAO() {
    }
    DAO.getInstance = function () {
        if (!this._instance) {
            this._instance = new DAO();
        }
        return this._instance;
    };
    DAO.prototype.checkIndexedDB = function () {
        if (!window.indexedDB) {
            console.log("このブラウザーは安定版の IndexedDB を対応していません。IndexedDB の機能は利用できません。");
            return false;
        }
        return true;
    };
    DAO.prototype.create = function (kintaiInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var request = window.indexedDB.open(DAO.DB_NAME, 1);
                        var db;
                        request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            var store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                            store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                            console.log("success:DB\u63A5\u7D9A\u4F5C\u6210\u5B8C\u4E86");
                        };
                        request.onsuccess = function (event) {
                            db = event.target.result;
                            console.log("success:DB\u63A5\u7D9A\u5B8C\u4E86");
                            var trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                            var store = trans.objectStore(DAO.STORE_NAME);
                            var request = store.put(kintaiInfo.getObject());
                            request.onsuccess = function (event) {
                                console.log('success:登録成功');
                                resolve();
                            };
                            request.onerror = function (event) {
                                console.log('error:登録失敗');
                                reject();
                            };
                        };
                        request.onerror = function (event) {
                            console.log("error:DB\u63A5\u7D9A\u30A8\u30E9\u30FC");
                            reject();
                        };
                    })];
            });
        });
    };
    DAO.prototype.selectById = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var request = window.indexedDB.open(DAO.DB_NAME, 1);
                        var db;
                        request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            var store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                            store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                            console.log("success:DB\u63A5\u7D9A\u4F5C\u6210\u5B8C\u4E86");
                        };
                        request.onsuccess = function (event) {
                            db = event.target.result;
                            console.log("success:DB\u63A5\u7D9A\u5B8C\u4E86");
                            var trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                            var store = trans.objectStore(DAO.STORE_NAME);
                            var request = store.get(key);
                            var info = new _KintaiInfo__WEBPACK_IMPORTED_MODULE_0__.KintaiInfo();
                            request.onsuccess = function (event) {
                                var result = event.target.result;
                                if (result) {
                                    console.log('success:取得成功');
                                    info.setObject(result);
                                    resolve(info);
                                }
                                else {
                                    console.log('error:対象データは存在しません。');
                                    resolve(info);
                                }
                            };
                        };
                        request.onerror = function (event) {
                            console.log("error:DB\u63A5\u7D9A\u30A8\u30E9\u30FC");
                            reject();
                        };
                    })];
            });
        });
    };
    DAO.prototype.selectAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var request = window.indexedDB.open(DAO.DB_NAME, 1);
                        var db;
                        request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            var store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                            store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                            console.log("success:DB\u63A5\u7D9A\u4F5C\u6210\u5B8C\u4E86");
                        };
                        request.onsuccess = function (event) {
                            db = event.target.result;
                            console.log("success:DB\u63A5\u7D9A\u5B8C\u4E86");
                            var trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                            var store = trans.objectStore(DAO.STORE_NAME);
                            var request = store.openCursor();
                            var list = [];
                            request.onsuccess = function (event) {
                                var cursor = event.target.result;
                                if (cursor) {
                                    console.log('success:取得成功');
                                    var info = new _KintaiInfo__WEBPACK_IMPORTED_MODULE_0__.KintaiInfo();
                                    info.setObject(cursor.value);
                                    list.push(info);
                                    cursor.continue();
                                }
                                else {
                                    resolve(list);
                                }
                            };
                        };
                        request.onerror = function (event) {
                            console.log("error:DB\u63A5\u7D9A\u30A8\u30E9\u30FC");
                            reject();
                        };
                    })];
            });
        });
    };
    DAO.prototype.update = function (kintaiInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var request = window.indexedDB.open(DAO.DB_NAME, 1);
                        var db;
                        request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            var store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                            store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                            console.log("success:DB\u63A5\u7D9A\u4F5C\u6210\u5B8C\u4E86");
                        };
                        request.onsuccess = function (event) {
                            db = event.target.result;
                            console.log("success:DB\u63A5\u7D9A\u5B8C\u4E86");
                            var trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                            var store = trans.objectStore(DAO.STORE_NAME);
                            var request = store.put(kintaiInfo.getObject());
                            request.onsuccess = function (event) {
                                console.log('success:更新成功');
                                resolve();
                            };
                            request.onerror = function (event) {
                                console.log('error:更新失敗');
                                reject();
                            };
                        };
                        request.onerror = function (event) {
                            console.log("error:DB\u63A5\u7D9A\u30A8\u30E9\u30FC");
                            reject();
                        };
                    })];
            });
        });
    };
    DAO.prototype.delete = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var request = window.indexedDB.open(DAO.DB_NAME, 1);
                        var db;
                        request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            var store = db.createObjectStore(DAO.STORE_NAME, { keyPath: DAO.KEY_NAME });
                            store.createIndex(DAO.KEY_NAME, DAO.KEY_NAME, { unique: true });
                            console.log("success:DB\u63A5\u7D9A\u4F5C\u6210\u5B8C\u4E86");
                        };
                        request.onsuccess = function (event) {
                            db = event.target.result;
                            console.log("success:DB\u63A5\u7D9A\u5B8C\u4E86");
                            var trans = db.transaction(DAO.STORE_NAME, 'readwrite');
                            var store = trans.objectStore(DAO.STORE_NAME);
                            var request = store.delete(key);
                            request.onsuccess = function (event) {
                                console.log('success:削除成功');
                                resolve();
                            };
                            request.onerror = function (event) {
                                console.log('error:削除失敗');
                                reject();
                            };
                        };
                        request.onerror = function (event) {
                            console.log("error:DB\u63A5\u7D9A\u30A8\u30E9\u30FC");
                            reject();
                        };
                    })];
            });
        });
    };
    DAO.DB_NAME = "kintai";
    DAO.STORE_NAME = "month";
    DAO.KEY_NAME = "kintaiId";
    return DAO;
}());



/***/ }),

/***/ "./src/DataSelectList.ts":
/*!*******************************!*\
  !*** ./src/DataSelectList.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSelectList": () => (/* binding */ DataSelectList)
/* harmony export */ });
/* harmony import */ var _DAO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DAO */ "./src/DAO.ts");
/* harmony import */ var _CreateKintaiTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateKintaiTable */ "./src/CreateKintaiTable.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var DataSelectList = (function () {
    function DataSelectList(kintaiId) {
        this._ListCreate(kintaiId);
        this._addEventListener();
    }
    DataSelectList.prototype._ListCreate = function (kintaiId) {
        return __awaiter(this, void 0, void 0, function () {
            var element, newOption, dao, list, i, kintaiOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = document.getElementById("list");
                        while (element.lastChild) {
                            element.removeChild(element.lastChild);
                        }
                        newOption = document.createElement("option");
                        newOption.value = "";
                        newOption.textContent = "新規作成";
                        element === null || element === void 0 ? void 0 : element.appendChild(newOption);
                        dao = _DAO__WEBPACK_IMPORTED_MODULE_0__.DAO.getInstance();
                        return [4, dao.selectAll()];
                    case 1:
                        list = _a.sent();
                        for (i = 0; i < list.length; i++) {
                            kintaiOption = document.createElement("option");
                            kintaiOption.value = list[i].kintaiId;
                            kintaiOption.textContent = list[i].kintaiId.substring(0, 4) + "\u5E74" + list[i].kintaiId.substring(5, 6) + "\u6708\u5EA6";
                            if (list[i].kintaiId === kintaiId) {
                                kintaiOption.selected = true;
                            }
                            element === null || element === void 0 ? void 0 : element.appendChild(kintaiOption);
                        }
                        return [2];
                }
            });
        });
    };
    DataSelectList.prototype._addEventListener = function () {
        var _this = this;
        var list = document.getElementById("list");
        var changeEvent = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var key, kintaiBox, newBox, dao, info, kintaiList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = e.target.value;
                        kintaiBox = document.getElementById("kintai-box");
                        newBox = document.getElementById("new-box");
                        if (!(key === "")) return [3, 1];
                        kintaiBox === null || kintaiBox === void 0 ? void 0 : kintaiBox.classList.add("element-hidden");
                        newBox === null || newBox === void 0 ? void 0 : newBox.classList.remove("element-hidden");
                        return [3, 3];
                    case 1:
                        kintaiBox === null || kintaiBox === void 0 ? void 0 : kintaiBox.classList.remove("element-hidden");
                        newBox === null || newBox === void 0 ? void 0 : newBox.classList.add("element-hidden");
                        dao = _DAO__WEBPACK_IMPORTED_MODULE_0__.DAO.getInstance();
                        return [4, dao.selectById(key)];
                    case 2:
                        info = _a.sent();
                        kintaiList = new _CreateKintaiTable__WEBPACK_IMPORTED_MODULE_1__.CreateKintaiTable();
                        kintaiList.create(info);
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        }); };
        list === null || list === void 0 ? void 0 : list.removeEventListener("change", changeEvent);
        list === null || list === void 0 ? void 0 : list.addEventListener("change", changeEvent);
    };
    return DataSelectList;
}());



/***/ }),

/***/ "./src/DateInfo.ts":
/*!*************************!*\
  !*** ./src/DateInfo.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateInfo": () => (/* binding */ DateInfo)
/* harmony export */ });
var DateInfo = (function () {
    function DateInfo() {
        this._date = new Date();
        this._type = "";
        this._startTime = "";
        this._endTime = "";
        this._breakTime = "";
        this._comment = "";
    }
    Object.defineProperty(DateInfo.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (date) {
            this._date = date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateInfo.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateInfo.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        set: function (startTime) {
            if (startTime !== "") {
                var hour = startTime.split(":")[0].padStart(2, "0");
                var min = startTime.split(":")[1].padStart(2, "0");
                startTime = hour + ":" + min;
            }
            this._startTime = startTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateInfo.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        set: function (endTime) {
            if (endTime !== "") {
                var hour = endTime.split(":")[0].padStart(2, "0");
                var min = endTime.split(":")[1].padStart(2, "0");
                endTime = hour + ":" + min;
            }
            this._endTime = endTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateInfo.prototype, "breakTime", {
        get: function () {
            return this._breakTime;
        },
        set: function (breakTime) {
            if (breakTime !== "") {
                var hour = breakTime.split(":")[0].padStart(2, "0");
                var min = breakTime.split(":")[1].padStart(2, "0");
                breakTime = hour + ":" + min;
            }
            this._breakTime = breakTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateInfo.prototype, "comment", {
        get: function () {
            return this._comment;
        },
        set: function (comment) {
            this._comment = comment;
        },
        enumerable: false,
        configurable: true
    });
    return DateInfo;
}());



/***/ }),

/***/ "./src/DayType.ts":
/*!************************!*\
  !*** ./src/DayType.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DayType": () => (/* binding */ DayType)
/* harmony export */ });
var DayType;
(function (DayType) {
    DayType[DayType["SUNDAY"] = 0] = "SUNDAY";
    DayType[DayType["MONDAY"] = 1] = "MONDAY";
    DayType[DayType["TUESDAY"] = 2] = "TUESDAY";
    DayType[DayType["WEDNESDAY"] = 3] = "WEDNESDAY";
    DayType[DayType["THURSDAY"] = 4] = "THURSDAY";
    DayType[DayType["FRIDAY"] = 5] = "FRIDAY";
    DayType[DayType["SATURDAY"] = 6] = "SATURDAY";
})(DayType || (DayType = {}));


/***/ }),

/***/ "./src/HolidayType.ts":
/*!****************************!*\
  !*** ./src/HolidayType.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HolidayType": () => (/* binding */ HolidayType)
/* harmony export */ });
var HolidayType;
(function (HolidayType) {
    HolidayType["YASUMI"] = "0";
    HolidayType["YUKYU"] = "1";
    HolidayType["SYUKUZITU"] = "2";
})(HolidayType || (HolidayType = {}));


/***/ }),

/***/ "./src/InputJsonButton.ts":
/*!********************************!*\
  !*** ./src/InputJsonButton.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputJsonButton": () => (/* binding */ InputJsonButton)
/* harmony export */ });
/* harmony import */ var _DAO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DAO */ "./src/DAO.ts");
/* harmony import */ var _KintaiInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KintaiInfo */ "./src/KintaiInfo.ts");
/* harmony import */ var _DateInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DateInfo */ "./src/DateInfo.ts");
/* harmony import */ var _DataSelectList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataSelectList */ "./src/DataSelectList.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var InputJsonButton = (function () {
    function InputJsonButton() {
        this._addEventListener();
    }
    InputJsonButton.prototype._addEventListener = function () {
        var _this = this;
        var button = document.getElementById("input-data");
        var file = document.getElementById("file");
        file.accept = ".json";
        button === null || button === void 0 ? void 0 : button.addEventListener("click", function (event) {
            var result = confirm("\u65E2\u5B58\u306E\u30C7\u30FC\u30BF\u306F\u4E0A\u66F8\u304D\u3055\u308C\u307E\u3059\u3002\u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3059\u304B\uFF1F");
            if (result) {
                file.click();
                file.addEventListener("change", function (event) {
                    _this._readFile(event);
                });
            }
        });
    };
    InputJsonButton.prototype._readFile = function (event) {
        var _this = this;
        var _a, _b;
        if (((_a = event.target) === null || _a === void 0 ? void 0 : _a.files.length) > 0) {
            var file = (_b = event.target) === null || _b === void 0 ? void 0 : _b.files[0];
            var dao_1 = _DAO__WEBPACK_IMPORTED_MODULE_0__.DAO.getInstance();
            var fileReader_1 = new FileReader();
            fileReader_1.readAsText(file);
            fileReader_1.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                var json, jsonString, i, kintaiInfo, dateInfoList, j, dateInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            json = fileReader_1.result;
                            jsonString = JSON.parse(json);
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < jsonString.length)) return [3, 4];
                            console.log(jsonString[i]);
                            kintaiInfo = new _KintaiInfo__WEBPACK_IMPORTED_MODULE_1__.KintaiInfo();
                            kintaiInfo.kintaiId = jsonString[i]._kintaiId;
                            kintaiInfo.company = jsonString[i]._company;
                            kintaiInfo.deploy = jsonString[i]._deploy;
                            kintaiInfo.name = jsonString[i]._name;
                            kintaiInfo.anken = jsonString[i]._anken;
                            kintaiInfo.teiziStart = jsonString[i]._teiziStart;
                            kintaiInfo.teiziEnd = jsonString[i]._teiziEnd;
                            kintaiInfo.qk = jsonString[i]._qk;
                            dateInfoList = [];
                            for (j = 0; j < jsonString[i]._dateList.length; j++) {
                                dateInfo = new _DateInfo__WEBPACK_IMPORTED_MODULE_2__.DateInfo();
                                dateInfo.date = new Date(jsonString[i]._dateList[j]._date);
                                dateInfo.type = jsonString[i]._dateList[j]._type;
                                dateInfo.startTime = jsonString[i]._dateList[j]._startTime;
                                dateInfo.endTime = jsonString[i]._dateList[j]._endTime;
                                dateInfo.breakTime = jsonString[i]._dateList[j]._breakTime;
                                dateInfo.comment = jsonString[i]._dateList[j]._comment;
                                dateInfoList.push(dateInfo);
                            }
                            kintaiInfo.dateList = dateInfoList;
                            return [4, dao_1.update(kintaiInfo)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3, 1];
                        case 4:
                            new _DataSelectList__WEBPACK_IMPORTED_MODULE_3__.DataSelectList("");
                            alert("\u30D5\u30A1\u30A4\u30EB\u306E\u8AAD\u8FBC\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002");
                            return [2];
                    }
                });
            }); };
        }
    };
    return InputJsonButton;
}());



/***/ }),

/***/ "./src/KintaiInfo.ts":
/*!***************************!*\
  !*** ./src/KintaiInfo.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KintaiInfo": () => (/* binding */ KintaiInfo)
/* harmony export */ });
/* harmony import */ var _DateInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateInfo */ "./src/DateInfo.ts");

var KintaiInfo = (function () {
    function KintaiInfo() {
        this._kintaiId = "";
        this._company = "";
        this._deploy = "";
        this._name = "";
        this._anken = "";
        this._teiziStart = "";
        this._teiziEnd = "";
        this._qk = "";
        this._dateList = [];
    }
    Object.defineProperty(KintaiInfo.prototype, "kintaiId", {
        get: function () {
            return this._kintaiId;
        },
        set: function (kintaiId) {
            this._kintaiId = kintaiId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "company", {
        get: function () {
            return this._company;
        },
        set: function (company) {
            this._company = company;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "deploy", {
        get: function () {
            return this._deploy;
        },
        set: function (deploy) {
            this._deploy = deploy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "anken", {
        get: function () {
            return this._anken;
        },
        set: function (anken) {
            this._anken = anken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "teiziStart", {
        get: function () {
            return this._teiziStart;
        },
        set: function (teiziStart) {
            if (teiziStart !== "") {
                var hour = teiziStart.split(":")[0].padStart(2, "0");
                var min = teiziStart.split(":")[1].padStart(2, "0");
                teiziStart = hour + ":" + min;
            }
            this._teiziStart = teiziStart;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "teiziEnd", {
        get: function () {
            return this._teiziEnd;
        },
        set: function (teiziEnd) {
            if (teiziEnd !== "") {
                var hour = teiziEnd.split(":")[0].padStart(2, "0");
                var min = teiziEnd.split(":")[1].padStart(2, "0");
                teiziEnd = hour + ":" + min;
            }
            this._teiziEnd = teiziEnd;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "qk", {
        get: function () {
            return this._qk;
        },
        set: function (qk) {
            if (qk !== "") {
                var hour = qk.split(":")[0].padStart(2, "0");
                var min = qk.split(":")[1].padStart(2, "0");
                qk = hour + ":" + min;
            }
            this._qk = qk;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KintaiInfo.prototype, "dateList", {
        get: function () {
            return this._dateList;
        },
        set: function (dateList) {
            this._dateList = dateList;
        },
        enumerable: false,
        configurable: true
    });
    KintaiInfo.prototype.getObject = function () {
        var dateInfoList = [];
        for (var i = 0; i < this.dateList.length; i++) {
            var dateInfo = {
                date: this.dateList[i].date,
                type: this.dateList[i].type,
                startTime: this.dateList[i].startTime,
                endTime: this.dateList[i].endTime,
                breakTime: this.dateList[i].breakTime,
                comment: this.dateList[i].comment,
            };
            dateInfoList.push(dateInfo);
        }
        return {
            kintaiId: this.kintaiId,
            company: this.company,
            deploy: this.deploy,
            name: this.name,
            anken: this.anken,
            teiziStart: this.teiziStart,
            teiziEnd: this.teiziEnd,
            qk: this.qk,
            dateList: dateInfoList
        };
    };
    KintaiInfo.prototype.setObject = function (object) {
        this.kintaiId = object.kintaiId;
        this.company = object.company;
        this.deploy = object.deploy;
        this.name = object.name;
        this.anken = object.anken;
        this.teiziStart = object.teiziStart;
        this.teiziEnd = object.teiziEnd;
        this.qk = object.qk;
        for (var i = 0; i < object.dateList.length; i++) {
            var dateInfo = new _DateInfo__WEBPACK_IMPORTED_MODULE_0__.DateInfo();
            dateInfo.date = object.dateList[i].date;
            dateInfo.type = object.dateList[i].type;
            dateInfo.startTime = object.dateList[i].startTime;
            dateInfo.endTime = object.dateList[i].endTime;
            dateInfo.breakTime = object.dateList[i].breakTime;
            dateInfo.comment = object.dateList[i].comment;
            this.dateList[i] = dateInfo;
        }
    };
    return KintaiInfo;
}());



/***/ }),

/***/ "./src/NewData.ts":
/*!************************!*\
  !*** ./src/NewData.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewData": () => (/* binding */ NewData)
/* harmony export */ });
/* harmony import */ var _DAO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DAO */ "./src/DAO.ts");
/* harmony import */ var _DateInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateInfo */ "./src/DateInfo.ts");
/* harmony import */ var _KintaiInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KintaiInfo */ "./src/KintaiInfo.ts");
/* harmony import */ var _CreateKintaiTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CreateKintaiTable */ "./src/CreateKintaiTable.ts");
/* harmony import */ var _DataSelectList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataSelectList */ "./src/DataSelectList.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var NewData = (function () {
    function NewData() {
        this.date = "";
        this._addEventListener();
    }
    NewData.prototype._addEventListener = function () {
        var _this = this;
        var month = document.getElementById("new-date");
        month === null || month === void 0 ? void 0 : month.addEventListener("change", function (event) {
            _this.date = event.target.value;
        });
        var kintaiBox = document.getElementById("kintai-box");
        var newBox = document.getElementById("new-box");
        var button = document.getElementById("create");
        button === null || button === void 0 ? void 0 : button.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var dao, year, month_1, cleck, kintaiInfo, info, kintaiList, result, kintaiInfo, info, kintaiList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.date !== "")) return [3, 9];
                        dao = _DAO__WEBPACK_IMPORTED_MODULE_0__.DAO.getInstance();
                        year = this.date.split("-")[0];
                        month_1 = this.date.split("-")[1];
                        return [4, dao.selectById("" + year + month_1)];
                    case 1:
                        cleck = _a.sent();
                        if (!(cleck.kintaiId == null || cleck.kintaiId === "")) return [3, 5];
                        kintaiInfo = this._newKintaiInfo(year, month_1);
                        return [4, dao.create(kintaiInfo)];
                    case 2:
                        _a.sent();
                        return [4, dao.selectById("" + year + month_1)];
                    case 3:
                        info = _a.sent();
                        kintaiList = new _CreateKintaiTable__WEBPACK_IMPORTED_MODULE_3__.CreateKintaiTable();
                        return [4, kintaiList.create(info)];
                    case 4:
                        _a.sent();
                        new _DataSelectList__WEBPACK_IMPORTED_MODULE_4__.DataSelectList("" + year + month_1);
                        kintaiBox === null || kintaiBox === void 0 ? void 0 : kintaiBox.classList.remove("element-hidden");
                        newBox === null || newBox === void 0 ? void 0 : newBox.classList.add("element-hidden");
                        return [3, 9];
                    case 5:
                        result = confirm(year + "\u5E74" + month_1 + "\u6708\u5EA6\u306E\u30C7\u30FC\u30BF\u306F\u5B58\u5728\u3057\u307E\u3059\u3002\u4E0A\u66F8\u304D\u3057\u307E\u3059\u304B\uFF1F");
                        if (!result) return [3, 9];
                        kintaiInfo = this._newKintaiInfo(year, month_1);
                        return [4, dao.create(kintaiInfo)];
                    case 6:
                        _a.sent();
                        return [4, dao.selectById("" + year + month_1)];
                    case 7:
                        info = _a.sent();
                        kintaiList = new _CreateKintaiTable__WEBPACK_IMPORTED_MODULE_3__.CreateKintaiTable();
                        return [4, kintaiList.create(info)];
                    case 8:
                        _a.sent();
                        new _DataSelectList__WEBPACK_IMPORTED_MODULE_4__.DataSelectList("" + year + month_1);
                        kintaiBox === null || kintaiBox === void 0 ? void 0 : kintaiBox.classList.remove("element-hidden");
                        newBox === null || newBox === void 0 ? void 0 : newBox.classList.add("element-hidden");
                        _a.label = 9;
                    case 9: return [2];
                }
            });
        }); });
    };
    NewData.prototype._newKintaiInfo = function (year, month) {
        var firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
        var lastDay = new Date(parseInt(year), parseInt(month), 0);
        var kintaiInfo = new _KintaiInfo__WEBPACK_IMPORTED_MODULE_2__.KintaiInfo();
        kintaiInfo.kintaiId = "" + year + month;
        var dateList = [];
        for (var i = 1; i <= lastDay.getDate(); i++) {
            var dateInfo = new _DateInfo__WEBPACK_IMPORTED_MODULE_1__.DateInfo();
            dateInfo.date = new Date(parseInt(year), parseInt(month) - 1, i);
            dateList.push(dateInfo);
        }
        kintaiInfo.dateList = dateList;
        return kintaiInfo;
    };
    return NewData;
}());



/***/ }),

/***/ "./src/OutputJsonButton.ts":
/*!*********************************!*\
  !*** ./src/OutputJsonButton.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutputJsonButton": () => (/* binding */ OutputJsonButton)
/* harmony export */ });
/* harmony import */ var _DAO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DAO */ "./src/DAO.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var OutputJsonButton = (function () {
    function OutputJsonButton() {
        this._addEventListener();
    }
    OutputJsonButton.prototype._addEventListener = function () {
        var _this = this;
        var button = document.getElementById("output-data");
        button === null || button === void 0 ? void 0 : button.addEventListener("click", function (event) { return __awaiter(_this, void 0, void 0, function () {
            var dao, list, json, blob, link, now, year, month, date, hour, min, sec;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dao = _DAO__WEBPACK_IMPORTED_MODULE_0__.DAO.getInstance();
                        return [4, dao.selectAll()];
                    case 1:
                        list = _a.sent();
                        json = JSON.stringify(list);
                        blob = new Blob([json], { type: "text/plain" });
                        link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        now = new Date();
                        year = now.getFullYear().toString();
                        month = (now.getMonth() + 1).toString().padStart(2, "0");
                        date = now.getDate().toString().padStart(2, "0");
                        hour = now.getHours().toString().padStart(2, "0");
                        min = now.getMinutes().toString().padStart(2, "0");
                        sec = now.getSeconds().toString().padStart(2, "0");
                        link.download = "kintai_" + year + month + date + hour + min + sec + ".json";
                        link.click();
                        return [2];
                }
            });
        }); });
    };
    return OutputJsonButton;
}());



/***/ }),

/***/ "./src/UpdateData.ts":
/*!***************************!*\
  !*** ./src/UpdateData.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UpdateData": () => (/* binding */ UpdateData)
/* harmony export */ });
/* harmony import */ var _DAO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DAO */ "./src/DAO.ts");
/* harmony import */ var _DateInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateInfo */ "./src/DateInfo.ts");
/* harmony import */ var _KintaiInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KintaiInfo */ "./src/KintaiInfo.ts");
/* harmony import */ var _CheckUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CheckUtil */ "./src/CheckUtil.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var UpdateData = (function () {
    function UpdateData() {
        this._addEventListener();
    }
    UpdateData.prototype._addEventListener = function () {
        var _this = this;
        var saveButton = document.querySelector("#save");
        saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var kintaiInfo, yearMonth, company, deploy, name_1, anken, teiziStart, teiziEnd, qk, rows, dataInfoList, i, dateInfo, year, month, typeElement, startElement, endElement, breakElement, commentElement, dao;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kintaiInfo = new _KintaiInfo__WEBPACK_IMPORTED_MODULE_2__.KintaiInfo();
                        try {
                            yearMonth = document.querySelector("span#kintai-id");
                            kintaiInfo.kintaiId = "" + yearMonth.textContent;
                            company = document.querySelector("input#company");
                            kintaiInfo.company = company.value;
                            deploy = document.querySelector("input#deploy");
                            kintaiInfo.deploy = deploy.value;
                            name_1 = document.querySelector("input#name");
                            kintaiInfo.name = name_1.value;
                            anken = document.querySelector("input#anken");
                            kintaiInfo.anken = anken.value;
                            teiziStart = document.querySelector("input#teizi-start");
                            kintaiInfo.teiziStart = teiziStart.value;
                            teiziEnd = document.querySelector("input#teizi-end");
                            kintaiInfo.teiziEnd = teiziEnd.value;
                            qk = document.querySelector("input#qk");
                            kintaiInfo.qk = qk.value;
                            if (_CheckUtil__WEBPACK_IMPORTED_MODULE_3__.CheckUtil.isInputError(teiziStart.value) || _CheckUtil__WEBPACK_IMPORTED_MODULE_3__.CheckUtil.isInputError(teiziEnd.value) || _CheckUtil__WEBPACK_IMPORTED_MODULE_3__.CheckUtil.isInputError(qk.value)) {
                                alert("入力チェックエラーのある項目があります。更新を実行できません。");
                                return [2];
                            }
                            rows = document.querySelectorAll("table tbody tr");
                            dataInfoList = [];
                            for (i = 0; i < rows.length; i++) {
                                dateInfo = new _DateInfo__WEBPACK_IMPORTED_MODULE_1__.DateInfo();
                                year = parseInt(kintaiInfo.kintaiId.substring(0, 4));
                                month = parseInt(kintaiInfo.kintaiId.substring(5, 6)) - 1;
                                dateInfo.date = new Date(year, month, i + 1);
                                typeElement = rows[i].querySelector("#type-" + i);
                                if (typeElement) {
                                    dateInfo.type = typeElement.value;
                                }
                                startElement = rows[i].querySelector("#start-" + i);
                                dateInfo.startTime = startElement.value;
                                endElement = rows[i].querySelector("#end-" + i);
                                dateInfo.endTime = endElement.value;
                                breakElement = rows[i].querySelector("#break-" + i);
                                dateInfo.breakTime = breakElement.value;
                                commentElement = rows[i].querySelector("#comment-" + i);
                                dateInfo.comment = commentElement.value;
                                dataInfoList.push(dateInfo);
                                if (_CheckUtil__WEBPACK_IMPORTED_MODULE_3__.CheckUtil.isInputError(startElement.value) || _CheckUtil__WEBPACK_IMPORTED_MODULE_3__.CheckUtil.isInputError(endElement.value) || _CheckUtil__WEBPACK_IMPORTED_MODULE_3__.CheckUtil.isInputError(breakElement.value)) {
                                    alert("入力チェックエラーのある項目があります。更新を実行できません。");
                                    return [2];
                                }
                            }
                            kintaiInfo.dateList = dataInfoList;
                        }
                        catch (e) {
                            alert("入力チェックエラーのある項目があります。更新を実行できません。");
                            return [2];
                        }
                        dao = _DAO__WEBPACK_IMPORTED_MODULE_0__.DAO.getInstance();
                        return [4, dao.update(kintaiInfo)];
                    case 1:
                        _a.sent();
                        alert("保存しました。");
                        return [2];
                }
            });
        }); });
    };
    return UpdateData;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DAO__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DAO */ "./src/DAO.ts");
/* harmony import */ var _DataSelectList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataSelectList */ "./src/DataSelectList.ts");
/* harmony import */ var _NewData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewData */ "./src/NewData.ts");
/* harmony import */ var _UpdateData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UpdateData */ "./src/UpdateData.ts");
/* harmony import */ var _BulkInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BulkInput */ "./src/BulkInput.ts");
/* harmony import */ var _OutputJsonButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OutputJsonButton */ "./src/OutputJsonButton.ts");
/* harmony import */ var _InputJsonButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InputJsonButton */ "./src/InputJsonButton.ts");







var Main = (function () {
    function Main() {
    }
    Main.prototype.main = function () {
        var dao = _DAO__WEBPACK_IMPORTED_MODULE_0__.DAO.getInstance();
        if (!dao.checkIndexedDB()) {
            alert("このブラウザーは安定版の IndexedDB を対応していません。IndexedDB の機能は利用できません。");
            return;
        }
        this._addEventListener();
        new _DataSelectList__WEBPACK_IMPORTED_MODULE_1__.DataSelectList("");
        new _NewData__WEBPACK_IMPORTED_MODULE_2__.NewData();
        new _UpdateData__WEBPACK_IMPORTED_MODULE_3__.UpdateData();
        new _BulkInput__WEBPACK_IMPORTED_MODULE_4__.BulkInput();
        new _OutputJsonButton__WEBPACK_IMPORTED_MODULE_5__.OutputJsonButton();
        new _InputJsonButton__WEBPACK_IMPORTED_MODULE_6__.InputJsonButton();
    };
    Main.prototype._addEventListener = function () {
    };
    return Main;
}());
window.addEventListener('load', function () {
    new Main().main();
});

})();

/******/ })()
;
//# sourceMappingURL=script.js.map