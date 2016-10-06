'use strict'

const fs = require('fs')
const _ = require('lodash/core')
const closestColor = require('./module/closestColor.js')
const libraries = require('./libraries.json')

const getLibraries = (filter) => {
  if (!(_.isArray(filter) && _.size(filter))) {
    return libraries
  }
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
    const foundColor = closestColor(color, baseColors)
    const closestLibColor = lib[foundColor]
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
