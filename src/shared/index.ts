export const extend = Object.assign

export const isObject = function (val) {
  return val !== null && typeof val === 'object'
}

export const haChange = function (val, newValue) {
  return !Object.is(val, newValue)
}
