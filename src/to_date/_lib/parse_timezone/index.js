var patterns = {
  'Z': /^(Z)$/,
  'HH': /^([+-])(\d{2})$/,
  'HHMM': /^([+-])(\d{2}):?(\d{2})$/
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = patterns['Z'].exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = patterns['HH'].exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = patterns['HHMM'].exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

module.exports = parseTimezone
