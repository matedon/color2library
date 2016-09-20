'use strict'

const Promise = require('bluebird')
const fs = require('fs')
const chroma = require('chroma-js')
const readDir = Promise.promisify(fs.readdir, fs)
const readFile = Promise.promisify(fs.readFile, fs)
const _ = require('lodash/core')

const pathOfLibraries = __dirname + '/node_modules/colorly/json'

const getAvaliableLibraries = () => {
  return readDir(pathOfLibraries).then((data) => {
    const libs = _.chain(data)
      .filter((fileName) => {
        return (fileName.indexOf('.json') !== -1)
      })
      .map((val) => {
        return val.replace('.json', '')
      })
      .value()
    return Promise.resolve(libs)
  })
}

const getLibraries = (filter) => {
  return getAvaliableLibraries().then((libs) => {
    const filterList = _.isString(filter) ? [filter] : filter
    return _.chain(libs)
      .filter((libName) => {
        return _.chain(filterList).filter((fil) => {
          return libName.indexOf(fil) !== -1
        }).size().value()
      })
      .value()
  })
}

const getLibrariesSource = (libraries) => {
  const content = {}
  return Promise.map(libraries, (lib) => {
    const requiredLib = pathOfLibraries + '/' + lib + '.json'
    return readFile(requiredLib, 'utf8').then((data) => {
      content[lib] = _.reduce(JSON.parse(data), (res, val, key) => {
        res = res || {}
        res[val.hex] = val
        return res
      }, {})
    })
  }).then(() => {
    return content
  })
}

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

const getClosestColors = (source, color) => {
  const matches = []
  _.each(source, (lib, name) => {
    const baseColors = _.keys(lib)
    const closestColor = getClosestColor(color, baseColors)
    const closestLibColor = lib[closestColor]
    closestLibColor.library = name
    matches.push(closestLibColor)
  })
  return Promise.resolve(matches)
}

const color2lib = (options, callback) => {
  options = _.defaults(options, {
    color: '#ffffff',
    libraries: []
  })
  getLibraries(options.libraries).then((libraries) => {
    return getLibrariesSource(libraries).then((source) => {
      return getClosestColors(source, options.color)
    })
  }).then(callback)

}

module.exports = color2lib
