/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./comboBox', '../../view/boundList', 'underscore', 'backbone', 'taurus', '../../../lang/event', 'jquery.scrollIntoView'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./comboBox'), require('../../view/boundList'), require('underscore'), require('backbone'), require('taurus'), require('../../../lang/event'), require('jquery.scrollIntoView'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./comboBox'), require('../../view/boundList'), require('underscore'), require('backbone'), require('taurus'), require('../../../lang/event'), require('jquery.scrollIntoView'))
  }
}(this, function (ComboBox, BoundList, _, Backbone, taurus) {
  return ComboBox.extend({
    fieldSubTpl: '<div id="<%=id%>-listWrap" class="' + taurus.baseCSSPrefix + 'tagfield <%=fieldCls%>">\
      <ul class="' + taurus.baseCSSPrefix + 'tagfield-list">\
        <li id="<%=id%>-inputElCt" data-ref="inputElCt" class="' + taurus.baseCSSPrefix + 'tagfield-input">\
          <div id="<%=id%>-emptyEl" data-ref="emptyEl" class="<%=emptyCls%>"><%=emptyText%></div>\
          <input id="<%=id%>" type="<%=type%>" class="' + taurus.baseCSSPrefix + 'tagfield-input-field form-control"<%if(typeof(placeholder) !== "undefined"){%> placeholder="<%=placeholder%>"<%}%><%if(typeof(value) !== "undefined"){%> value="<%=value%>"<%}%><%if(typeof(checked) !== "undefined"){%> checked="<%=checked%>"<%}%><%if(readOnly){%> readonly="readonly"<%}%> name="<%=name%>"<%if(typeof(maxLength) !== "undefined"){%> maxLength="<%=maxLength%>"<%}%><%if(disabled){%> disabled="<%=disabled%>"<%}%> autocomplete="off" />\
        </li>\
      </ul>\
    </div>',
    emptyInputCls: taurus.baseCSSPrefix + 'tagfield-emptyinput',
    applyEmptyText: function () {
      var me = this
      var emptyText = me.emptyText
      if (me.rendered && emptyText) {
        isEmpty = _.isEmpty(me.value)
      }
    },
    getSubTplData: function () {
      var me = this
      var emptyInputCls = me.emptyInputCls
      var emptyText = me.emptyText
      var data = me._super()
      var isEmpty = emptyText && data.value.length < 1
      data.emptyCls = isEmpty ? me.emptyCls : emptyInputCls
      data.inputElCls = isEmpty ? emptyInputCls : ''
      return data
    }
  })
}))
