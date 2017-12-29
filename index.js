import wasmBinary from './zxing/build/zxing.wasm';
let MODULE = null;

function loadModule() {
  return import('./zxing/build/zxing.js').then(Module => (MODULE = Module));
}

export function read(eightBitGrayPixelArray, imageWidth, imageHeight) {
  return new Promise(resolve => {
    const preparation = Promise.resolve();
    if (MODULE === null) {
      preparation = loadModule();
    }
    return preparation.then(() => {
      var ptr = MODULE._malloc(eightBitGrayPixelArray.length);
      MODULE.HEAPU8.set(eightBitGrayPixelArray, ptr);
      const result = MODULE.read_code(ptr, imageWidth, imageHeight);
      MODULE._free(ptr);
      return result;
    });
  });
}
