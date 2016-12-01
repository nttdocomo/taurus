/**
 * @author nttdocomo
 */
/* global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./column', 'underscore', 'taurus'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./column'), require('underscore'), require('taurus'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./column'), require('underscore'), require('taurus'))
  }
}(this, function (Column, _, taurus) {
  return Column.extend({
    tdCls: taurus.baseCSSPrefix + 'grid-cell-checkcolumn',
    innerCls: taurus.baseCSSPrefix + 'grid-cell-inner-checkcolumn',

    // Note: class names are not placed on the prototype bc renderer scope
    // is not in the header.
    defaultRenderer: function (value, cellValues) {
      var cssPrefix = taurus.baseCSSPrefix,
        cls = cssPrefix + 'grid-checkcolumn'

      if (this.disabled) {
        cellValues.tdCls += ' ' + this.disabledCls
      }
      if (value) {
        cls += ' ' + cssPrefix + 'grid-checkcolumn-checked'
      }
      return '<div class="' + cls + '" role="button" tabIndex="0"></div>'
    }
  })
}))
