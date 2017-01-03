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
}(this, function (_) { // Array Remove - By John Resig (MIT Licensed)
  /* if (!Array.prototype.remove) {
    Array.prototype.remove = function (from, to) {
      var rest = this.slice((to || from) + 1 || this.length)
      this.length = from < 0 ? this.length + from : from
      return this.push.apply(this, rest)
    }
  }*/
  return function (array, item) {
    var index = _.indexOf(array, item)

    if (index !== -1) {
      array.remove(index)
    }

    return array
  }
}))
