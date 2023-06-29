export interface Barcode {
    rawValue: string;
}
export type BarcodeType = 'aztec' | 'code_128' | 'code_39' | 'code_93' | 'codabar' | 'data_matrix' | 'ean_13' | 'ean_8' | 'itf' | 'pdf417' | 'qr_code' | 'upc_a' | 'upc_e';
export declare class BarcodeDetector {
    constructor(formats: string[]);
    detect(imageBitmapSource: ImageBitmapSource): Promise<Barcode[]>;
}
export declare function readImageFile(file: File): Promise<HTMLImageElement>;
export declare function detectSerialNumbers(image: ImageBitmapSource): Promise<string[]>;
export declare function readFileAsBlob(file: File): Promise<Blob>;
export declare function detectBarcodes(image: ImageBitmapSource, barcodeTypes?: Array<BarcodeType>): Promise<Barcode[]>;
//# sourceMappingURL=barcodeDetector.d.ts.map