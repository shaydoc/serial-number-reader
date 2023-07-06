async function d(r) {
  if (!r)
    throw new Error("No file chosen");
  const t = await a(r), o = URL.createObjectURL(t), e = new Image();
  return e.src = o, await e.decode(), e;
}
async function i(r) {
  if (typeof BarcodeDetector > "u")
    throw new Error("Barcode Detector is not supported by this browser.");
  return (await s(r)).map((e) => e.rawValue);
}
function a(r) {
  return new Promise((t, o) => {
    const e = new FileReader();
    e.onloadend = () => {
      if (!e.result) {
        o(new Error("Expected FileReader result to be defined"));
        return;
      }
      const n = new Blob([e.result], { type: r.type });
      t(n);
    }, e.onerror = o, e.readAsArrayBuffer(r);
  });
}
function s(r, t = ["code_39", "codabar", "ean_13"]) {
  return new Promise((o, e) => {
    if (typeof BarcodeDetector > "u") {
      e(new Error("Barcode Detector is not supported by this browser."));
      return;
    }
    new BarcodeDetector(t).detect(r).then((c) => {
      o(c);
    }).catch(e);
  });
}
export {
  s as detectBarcodes,
  i as detectSerialNumbers,
  a as readFileAsBlob,
  d as readImageFile
};
