var parse = require('../parse/index.js')

function minMaxHelper(minMaxFn) {
  return function (datesArray) {
    var dates = datesArray.map(function (dirtyDate) {
      return parse(dirtyDate)
    })
    var latestTimestamp = minMaxFn.apply(null, dates)
    return new Date(latestTimestamp)
  }
}

module.exports = {"minMaxHelper": minMaxHelper}
