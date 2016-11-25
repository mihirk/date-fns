var patterns = {
  'YY': /^(\d{2})$/,
  'YYY': [
    /^([+-]\d{2})$/, // 0 additional digits
    /^([+-]\d{3})$/, // 1 additional digit
    /^([+-]\d{4})$/ // 2 additional digits
  ],
  'YYYY': /^(\d{4})/,
  'YYYYY': [
    /^([+-]\d{4})/, // 0 additional digits
    /^([+-]\d{5})/, // 1 additional digit
    /^([+-]\d{6})/ // 2 additional digits
  ]
}

function parseYear (dateString, additionalDigits) {
  var patternYYY = patterns['YYY'][additionalDigits]
  var patternYYYYY = patterns['YYYYY'][additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = patterns['YYYY'].exec(dateString) || patternYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = patterns['YY'].exec(dateString) || patternYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

module.exports = parseYear
