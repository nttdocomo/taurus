/*global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['underscore'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('underscore'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('underscore'))
  }
}(this, function (_) {
  var merge = function (source) {
    var i = 1
    var ln = arguments.length
    var mergeFn = merge
    var cloneFn = _.clone
    var object, key, value, sourceKey

    for (; i < ln; i++) {
      object = arguments[i]

      for (key in object) {
        value = object[key]
        if (value && value.constructor === Object) {
          sourceKey = source[key]
          if (sourceKey && sourceKey.constructor === Object) {
            mergeFn(sourceKey, value)
          } else {
            source[key] = cloneFn(value)
          }
        } else {
          source[key] = value
        }
      }
    }

    return source
  }
  Object.merge = merge
  return merge
}))
