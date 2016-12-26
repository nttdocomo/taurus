/**
 * @author nttdocomo
 */
/*global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['underscore', 'jquery'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('underscore'), require('jquery'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('underscore'), require('jquery'))
  }
}(this, function (_, $) {
  var Tau = Tau || {}
  var body = $(document.body)
  _.extend(Tau, {
    enumerables: ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'],
    baseCSSPrefix: 't-',
    doc: $(document),
    emptyFn: function () {},
    getBody: function () {
      return body
    },
    getDom: function (el) {
      if (!el || !document) {
        return null
      }

      return el.$dom ? el.$dom : (typeof el === 'string' ? document.getElementById(el) : el)
    },

    /**
     * Returns `true` if the passed value is an HTMLElement.
     * @param {Object} value The value to test.
     * @return {Boolean}
     */
    isElement: function (value) {
      return value ? value.nodeType === 1 : false
    }
  })
  window.Tau = Tau
  return Tau
}))
