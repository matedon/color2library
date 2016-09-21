const color2lib = require('./index.js')

color2lib({
  libraries: ['pantone'],
  color: '#8faabd'
}, (colors) => {
  console.log(colors)
})
