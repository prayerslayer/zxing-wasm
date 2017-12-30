# zxing-wasm

It’s [zxing-cpp](https://github.com/glassechidna/zxing-cpp), but compiled to Web Assembly.

## Status

Mostly a research project, although it works ([Demo](https://prayerslayer.github.io/zxing-wasm/)).

## Performance

I haven't run extensive measurements yet, but it seems to be linearly proportional to the amount
of pixels in the input picture.

Numbers that I saw (Firefox 59, on Github pages):

* 1.3 Megapixel, 17 ms
* 12 MP, 125 ms
* 190K pixel, 2 ms

Unless I remove it accidentally, you can see the timing and image dimensions in your browser's console.

## TODO

Iff I have both time and interest:

* Get better perf numbers
* Distribute on npm
* Benchmark against asm.js version of zxing used in [instascan](https://github.com/schmich/instascan)

## License

MIT