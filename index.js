import wasmBinary from './zxing/build/zxing.wasm';
let MODULE = null;

function loadModule() {
  return new Promise(resolve =>
    import('./zxing/build/zxing.js').then(
      Module => (Module.postRun = [() => resolve(Module)])
    )
  ).then(m => (MODULE = m));
}
const perf = window.performance;

export function read(eightBitGrayPixelArray, imageWidth, imageHeight) {
  let preparation = Promise.resolve();
  if (MODULE === null) {
    preparation = loadModule();
  }
  return preparation.then(() => {
    var ptr = MODULE._malloc(eightBitGrayPixelArray.length);
    MODULE.HEAPU8.set(eightBitGrayPixelArray, ptr);
    // const t1 = perf.mark('t1');
    const result = MODULE.read_code(ptr, imageWidth, imageHeight);
    // const t2 = perf.mark('t2');
    MODULE._free(ptr);
    // perf.measure('read', 't1', 't2')
    // Get all of the measures out.
    // In this case there is only one.
    // var measures = perf.getEntriesByName('read');
    // var measure = measures[0];
    // console.log('perf milliseconds:', measure.duration);

    // Clean up the stored markers.
    // perf.clearMarks();
    // perf.clearMeasures();
    return result;
  });
}
