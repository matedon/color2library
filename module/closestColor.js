'use strict'

const chroma = require('chroma-js')
const _each = require('lodash/each')
const _min = require('lodash/min')

const closestColor = (color, baseColors) => {
  // Convert to RGB, then R, G, B
  var colorRGB = chroma(color).rgb()
  var colorR = colorRGB[0]
  var colorG = colorRGB[1]
  var colorB = colorRGB[2]

  // Create an emtyp array for the difference betwwen the colors
  var colorDiff = []

  // Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
  _each(baseColors, function (value) {
    var baseColorRGB = chroma(value).rgb()
    var baseColorR = baseColorRGB[0]
    var baseColorG = baseColorRGB[1]
    var baseColorB = baseColorRGB[2]

    // Add the difference to the difference array
    colorDiff.push(Math.sqrt(
      (colorR - baseColorR) * (colorR - baseColorR)
      + (colorG - baseColorG) * (colorG - baseColorG)
      + (colorB - baseColorB) * (colorB - baseColorB)
    ))
  })

  // Get the lowest number from the difference array
  var lowest = _min(colorDiff)

  // Get the index for that lowest number
  var index = colorDiff.indexOf(lowest)

  // Return the HEX code
  return baseColors[index]
}

module.exports = closestColor
