'use strict'

const fs = require('fs')
const chroma = require('chroma-js')
const _ = require('lodash/core')
const libraries = require('./libraries.json')

const getClosestColor = (color, baseColors) => {
  // Convert to RGB, then R, G, B
  var colorRGB = chroma(color).rgb()
  var colorR = colorRGB[0]
  var colorG = colorRGB[1]
  var colorB = colorRGB[2]

  // Create an emtyp array for the difference betwwen the colors
  var colorDiff = []

  // Convert the HEX color in the array to RGB colors, split them up to R-G-B, then find out the difference between the "color" and the colors in the array
  _.each(baseColors, function (value) {
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
  var lowest = _.min(colorDiff)

  // Get the index for that lowest number
  var index = colorDiff.indexOf(lowest)

  // Return the HEX code
  return baseColors[index]
}

const getLibraries = (filter) => {
  return _.reduce(libraries, (res, val, name) => {
    res = res || {}
    const filterOk = _.chain(filter).filter((fil) => {
      return name.indexOf(fil) !== -1
    }).size().value()
    if (filterOk) {
      res[name] = val
    }
    return res
  }, {})
}

const getClosestColors = (source, color) => {
  const matches = []
  _.each(source, (lib, name) => {
    const baseColors = _.keys(lib)
    const closestColor = getClosestColor(color, baseColors)
    const closestLibColor = lib[closestColor]
    closestLibColor.library = name
    matches.push(closestLibColor)
  })
  return matches
}

const color2lib = (options, callback) => {
  options = _.defaults(options, {
    color: '#ffffff',
    libraries: []
  })
  const libraries = getLibraries(options.libraries)
  callback(getClosestColors(libraries, options.color))
}

module.exports = color2lib
