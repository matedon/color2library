'use strict'

const fs = require('fs')
const _ = require('lodash/core')
const targetJson = __dirname + '/libraries.json'
const pathOfLibraries = __dirname + '/node_modules/colorly/json'

const collectAvaliableLibraries = (cb) => {
  const data = fs.readdirSync(pathOfLibraries)
  const content = {}
  _.chain(data)
    .filter((fileName) => {
      return (fileName.indexOf('.json') !== -1)
    })
    .each((fileName) => {
      const lib = fileName.replace('.json', '')
      const data = fs.readFileSync(pathOfLibraries + '/' + fileName, 'utf8')
      content[lib] = _.reduce(JSON.parse(data), (res, val) => {
        res = res || {}
        res[val.hex] = {
          name: val.name,
          color: val.hex
        }
        return res
      }, {})
    })
    .value()
  cb(content)
}

const buildLibraries = () => {
  collectAvaliableLibraries((libraries) => {
    fs.writeFile(targetJson, JSON.stringify(libraries, null, 2), 'utf-8')
  })
}

buildLibraries()
