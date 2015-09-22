'use strict'

var partial = require('ap').partial
var forOwn = require('for-own')

module.exports = updateStruct

function updateStruct (struct, data) {
  if (arguments.length < 2) return partial(updateStruct, struct)
  forOwn(data, update)
  return struct

  function update (value, key) {
    if (struct[key]._type === 'observ-struct') {
      return updateStruct(struct[key], value)
    }
    struct[key].set(value)
  }
}
