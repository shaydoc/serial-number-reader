"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var index_1 = require("./index");
// Mock URL.createObjectURL
global.URL.createObjectURL = vitest_1.vi.fn().mockImplementation(function () {
    return 'data:,';
});
// Mock for FileReader
var MockFileReader = /** @class */ (function () {
    function MockFileReader() {
        var _this = this;
        this.readAsArrayBuffer = vitest_1.vi.fn(function () {
            _this.result = 'data:,';
            _this.readyState = MockFileReader.LOADING;
            _this.onloadend();
        });
        this.result = 'data:,';
        this.readyState = MockFileReader.EMPTY;
        this.error = null;
        this.abort = vitest_1.vi.fn(function () { });
        this.addEventListener = vitest_1.vi.fn(function () { });
        this.dispatchEvent = vitest_1.vi.fn(function () { });
        this.onabort = vitest_1.vi.fn(function () { });
        this.onerror = vitest_1.vi.fn(function () { });
        this.onload = vitest_1.vi.fn(function () { });
        this.onloadend = vitest_1.vi.fn(function () { });
        this.onloadprogress = vitest_1.vi.fn(function () { });
    }
    MockFileReader.EMPTY = 0;
    MockFileReader.LOADING = 1;
    MockFileReader.DONE = 2;
    return MockFileReader;
}());
global.FileReader = MockFileReader;
// Mock for BarcodeDetector
global.BarcodeDetector = vitest_1.vi.fn().mockImplementation(function () {
    this.detect = vitest_1.vi.fn().mockResolvedValue([{ rawValue: "123456789" }]);
});
// Mock for Image
global.Image = vitest_1.vi.fn().mockImplementation(function () {
    this.decode = vitest_1.vi.fn().mockResolvedValue(function () { });
});
(0, vitest_1.describe)('Image File Reading and Barcode Detection', function () {
    (0, vitest_1.test)('readImageFile function', function () { return __awaiter(void 0, void 0, void 0, function () {
        var image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, index_1.readImageFile)(new Blob(['test'], { type: 'text/plain' }))];
                case 1:
                    image = _a.sent();
                    (0, vitest_1.expect)(image).toBeDefined();
                    (0, vitest_1.expect)(image.src).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('readFileAsBlob function', function () { return __awaiter(void 0, void 0, void 0, function () {
        var blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, index_1.readFileAsBlob)(new Blob(['test'], { type: 'text/plain' }))];
                case 1:
                    blob = _a.sent();
                    (0, vitest_1.expect)(blob).toBeDefined();
                    (0, vitest_1.expect)(blob.type).toBe('text/plain');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('detectSerialNumber function', function () { return __awaiter(void 0, void 0, void 0, function () {
        var image, serialNumbers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image = new Image();
                    image.src = 'data:,';
                    return [4 /*yield*/, (0, index_1.detectSerialNumbers)(image)];
                case 1:
                    serialNumbers = _a.sent();
                    (0, vitest_1.expect)(serialNumbers).toBeDefined();
                    (0, vitest_1.expect)(serialNumbers).toEqual(['123456789']);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('detectBarcodes function', function () { return __awaiter(void 0, void 0, void 0, function () {
        var image, barcodes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    image = new Image();
                    image.src = 'data:,';
                    return [4 /*yield*/, (0, index_1.detectBarcodes)(image)];
                case 1:
                    barcodes = _a.sent();
                    (0, vitest_1.expect)(barcodes).toBeDefined();
                    (0, vitest_1.expect)(barcodes).toEqual([{ rawValue: '123456789' }]);
                    return [2 /*return*/];
            }
        });
    }); });
});