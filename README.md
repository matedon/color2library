# color2library

What if you have a color but you need the closest one from a color library? For example Panonte?
You can find the most fitting color from a comprehensive library of color books from Pantone, ANPA, HKS, DIC, Focoltone, TOYO, and TRUMATCH.

This module compatible with browserify too.

## Usage

```js
const color2library = require("color2library")

color2library({
  libraries: ['pantone'],
  color: '#8faabd'
}, (colors) => {
  console.log(colors)
})
```

## Options

libraries: array of color books; you can give the part of the names for example ['anpa', 'hks', 'pantone', 'toyo', 'trumatch']
color: this is the color to search from color books

## Build

Colorly.js containts all of the required color books, but we need to merge them in one json file with some modifications.
You only have to run that if Colorly.js module updated.

```sh
npm build
```

## Test

This is not a feature test. Just a simple test for color matching, with console output.

```sh
npm test
```

## Dependencies

- [chroma-js](https://github.com/gka/chroma.js): JavaScript library for color conversions
- [colorly](https://github.com/jpederson/Colorly/): A comprehensive library of color books from Pantone, ANPA, HKS, DIC, Focoltone, TOYO, and TRUMATCH
- [lodash](https://github.com/lodash/lodash): Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.

## License

MIT

