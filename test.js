'use strict'

var test = require('tape')
var Struct = require('observ-struct')
var Observ = require('observ')
var update = require('./')

test(function (t) {
  var state = Struct({
    foo: Observ(1),
    bar: Observ(2)
  })
  update(state, {
    foo: 10,
    bar: 20
  })
  t.deepEqual(state(), {
    foo: 10,
    bar: 20
  })
  t.end()
})

test('recursive', function (t) {
  var state = Struct({
    shallow: Observ(1),
    deep: Struct({
      value: Struct({
        bottom: Observ('bottom'),
        barrel: Observ('barrel')
      })
    })
  })
  update(state, {
    deep: {
      value: {
        bottom: 'BOTTOM'
      }
    }
  })
  t.deepEqual(state.deep.value(), {
    bottom: 'BOTTOM',
    barrel: 'barrel'
  })
  t.end()
})
