import { test, expect, describe, vi } from 'vitest'
import { readImageFile, detectSerialNumbers, readFileAsBlob, detectBarcodes } from './index';


// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn().mockImplementation(function () {
  return 'data:,';
});


// Mock for FileReader
class MockFileReader {
  static EMPTY = 0;
  static LOADING = 1;
  static DONE = 2;
  readAsArrayBuffer = vi.fn(() => { 
    this.result = 'data:,';
    this.readyState = MockFileReader.LOADING;
    this.onloadend();
  });
  result = 'data:,';
  readyState = MockFileReader.EMPTY;
  error = null;
  abort = vi.fn(() => { });
  addEventListener = vi.fn(() => { });
  dispatchEvent = vi.fn(() => { });
  onabort = vi.fn(() => { });
  onerror = vi.fn(() => { });
  onload = vi.fn(() => { });
  onloadend = vi.fn(() => { });
  onloadprogress = vi.fn(() => { });
}


global.FileReader = MockFileReader;

// Mock for BarcodeDetector
global.BarcodeDetector = vi.fn().mockImplementation(function() {
  this.detect = vi.fn().mockResolvedValue([{rawValue: "123456789"} as any]);
});

// Mock for Image
global.Image = vi.fn().mockImplementation(function() {
  this.decode = vi.fn().mockResolvedValue(() => { });
});

describe('Image File Reading and Barcode Detection', () => {
  test('readImageFile function', async () => {
    const image = await readImageFile(new Blob(['test'], {type: 'text/plain'}) as File);
    expect(image).toBeDefined();
    expect(image.src).toBeDefined();
  });

  test('readFileAsBlob function', async () => {
    const blob = await readFileAsBlob( new Blob(['test'], {type: 'text/plain'}) as File);
    expect(blob).toBeDefined();
    expect(blob.type).toBe('text/plain');
  });

  test('detectSerialNumber function', async () => {
    const image = new Image();
    image.src = 'data:,';
    const serialNumbers = await detectSerialNumbers(image);
    expect(serialNumbers).toBeDefined();
    expect(serialNumbers).toEqual(['123456789']);
  });

  test('detectBarcodes function', async () => {
    const image = new Image();
    image.src = 'data:,';
    const barcodes = await detectBarcodes(image);
    expect(barcodes).toBeDefined();
    expect(barcodes).toEqual([{rawValue: '123456789'}]);
  });
});
