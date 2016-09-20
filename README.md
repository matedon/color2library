# color2library

What if you have a color but you need the closest one from a color library? For example Panonte?
You can find the most fitting color from a comprehensive library of color books from Pantone, ANPA, HKS, DIC, Focoltone, TOYO, and TRUMATCH.

## Usage

```js
const color2lib = require("color2library")

color2lib({
  libraries: ['pantone'],
  color: '#8faabd'
}, (colors) => {
  console.log(colors)
})
```

## How it Works



## Dependencies

- [chroma-js](https://github.com/gka/chroma.js): JavaScript library for color conversions
- [colorly](https://github.com/jpederson/Colorly/): A comprehensive library of color books from Pantone, ANPA, HKS, DIC, Focoltone, TOYO, and TRUMATCH
- [lodash](https://github.com/lodash/lodash): Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.

## License

MIT

