const color2library = require('./index.js')

color2library({
  libraries: ['pantone'],
  color: '#8faabd'
}, (colors) => {
  console.log(colors)
})
