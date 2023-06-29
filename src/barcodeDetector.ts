export interface Barcode {
  rawValue: string;
}

export type BarcodeType = 'aztec' | 'code_128' | 'code_39' | 'code_93' | 'codabar' | 'data_matrix' | 'ean_13' | 'ean_8' | 'itf' | 'pdf417' | 'qr_code' | 'upc_a' | 'upc_e';

export declare class BarcodeDetector {
  constructor(formats: string[]);
  detect(imageBitmapSource: ImageBitmapSource): Promise<Barcode[]>;
}




export async function readImageFile(file: File): Promise<HTMLImageElement> {
  if (!file) {
    throw new Error('No file chosen');
  }

  const imgBlob = await readFileAsBlob(file);
  const blobUrl = URL.createObjectURL(imgBlob);

  const image = new Image();
  image.src = blobUrl;
  await image.decode();

  return image;
}

export async function detectSerialNumbers(image: ImageBitmapSource): Promise<string[]> {
  if (typeof BarcodeDetector === 'undefined') {
    throw new Error("Barcode Detector is not supported by this browser.");
  }

  const barcodes = await detectBarcodes(image);
  const serialNumbers = barcodes.map((barcode) => barcode.rawValue);

  return serialNumbers;
}

export function readFileAsBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result) {
        reject(new Error('Expected FileReader result to be defined'));
        return;
      }
      const imgBlob = new Blob([reader.result], { type: file.type });
      resolve(imgBlob);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function detectBarcodes(image: ImageBitmapSource, barcodeTypes: Array<BarcodeType> = ['code_39', 'codabar', 'ean_13']): Promise<Barcode[]> {
  return new Promise((resolve, reject) => {
    if (typeof BarcodeDetector === 'undefined') { 
      reject(new Error("Barcode Detector is not supported by this browser."));
      return;
    }
    const barcodeDetector = new BarcodeDetector(barcodeTypes);
    barcodeDetector
      .detect(image)
      .then((barcodes) => {
        resolve(barcodes);
      })
      .catch(reject);
  });
}
