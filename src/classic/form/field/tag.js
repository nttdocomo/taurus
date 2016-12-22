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
      <ul id="<%=id%>-itemList" class="' + taurus.baseCSSPrefix + 'tagfield-list">\
        <li id="<%=id%>-inputElCt" data-ref="inputElCt" class="' + taurus.baseCSSPrefix + 'tagfield-input">\
          <div id="<%=id%>-emptyEl" data-ref="emptyEl" class="<%=emptyCls%>"><%=emptyText%></div>\
          <input id="<%=id%>" type="<%=type%>" class="' + taurus.baseCSSPrefix + 'tagfield-input-field form-control"<%if(typeof(placeholder) !== "undefined"){%> placeholder="<%=placeholder%>"<%}%><%if(typeof(value) !== "undefined"){%> value="<%=value%>"<%}%><%if(typeof(checked) !== "undefined"){%> checked="<%=checked%>"<%}%><%if(readOnly){%> readonly="readonly"<%}%> name="<%=name%>"<%if(typeof(maxLength) !== "undefined"){%> maxLength="<%=maxLength%>"<%}%><%if(disabled){%> disabled="<%=disabled%>"<%}%> autocomplete="off" />\
        </li>\
      </ul>\
    </div>',
    emptyInputCls: taurus.baseCSSPrefix + 'tagfield-emptyinput',
    applyChildEls: function (childEls) {
      childEls = _.extend(childEls || {}, {
        'itemList': '[id$="itemList"]',
        'inputElCt': '[id$="inputElCt"]'
      })
      this._super.call(this, childEls)
    },

    /**
     * Initiate auto-sizing for height based on {@link #grow}, if applicable.
     */
    autoSize: function() {
      var me = this;

      if (me.grow && me.rendered) {
        me.autoSizing = true;
        //me.updateLayout();
      }

      return me;
    },
    applyEmptyText: function () {
      var me = this
      var emptyText = me.emptyText
      if (me.rendered && emptyText) {
        isEmpty = _.isEmpty(me.value)
      }
    },

    /**
     * Update the labeled items rendering
     * @private
     */
    applyMultiselectItemMarkup: function () {
      var me = this,
        itemList = me.itemList

      if (itemList) {
        itemList.find('.' + taurus.baseCSSPrefix + 'tagfield-item').remove()
        me.inputElCt.before(me.getMultiSelectItemMarkup())
        me.autoSize()
      }
    },

    /**
     * Build the markup for the labeled items. Template must be built on demand due to ComboBox initComponent
     * life cycle for the creation of on-demand stores (to account for automatic valueField/displayField setting)
     * @private
     */
    getMultiSelectItemMarkup: function () {
      var me = this
      var childElCls = (me._getChildElCls && me._getChildElCls()) || '' // hook for rtl cls

      if (!me.multiSelectItemTpl) {
        if (!me.labelTpl) {
          me.labelTpl = '{' + me.displayField + '}'
        }
        me.labelTpl = me.getTpl('labelTpl')

        if (me.tipTpl) {
          me.tipTpl = me.getTpl('tipTpl')
        }
        var tpl = [
          '<%_.each(valueCollection, function(item, i){%>',
          '<li data-selectionIndex="<%=i%>" data-recordId="<%=item.cid%>" class="' + me.tagItemCls + childElCls,
          '<%if(isSelected(item)){%>',
          ' ' + me.tagSelectedCls,
          '<%}%>',
          //me.tipTpl ? '" data-qtip="{[this.getTip(values)]}">' : '">',
          '<div class="' + me.tagItemTextCls + '"><%getItemLabel(values)%></div>',
          '<div class="' + me.tagItemCloseCls + childElCls + '"></div>' ,
          '</li>' ,
          '<%})%>'
        ].join('')
        me.multiSelectItemTpl = _.template(tpl)
      }
      /*if (!me.multiSelectItemTpl.isTemplate) {
        me.multiSelectItemTpl = this.getTpl('multiSelectItemTpl')
      }*/
      return me.multiSelectItemTpl(_.extend({
        valueCollection: me.valueCollection.toJSON()
      }, {
        isSelected: _.bind(function (rec) {
          return me.selectionModel.isSelected(rec)
        }, me),
        getItemLabel: _.bind(function (values) {
          return Ext.String.htmlEncode(me.labelTpl.apply(values))
        }, me),
        getTip: _.bind(function (values) {
          return Ext.String.htmlEncode(me.tipTpl.apply(values))
        }, me),
        strict: true
      }))
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
    },
    onValueCollectionEndUpdate: function(){
      var me = this
      var pickedRecords = me.valueCollection.models
      var valueStore = me.valueStore
    },
    updateValue: function () {
      var me = this
      me.applyMultiselectItemMarkup()
    }
  })
}))