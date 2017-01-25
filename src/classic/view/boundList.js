/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../define', './view', 'underscore', 'backbone', 'taurus', 'jquery.lazyload'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../define'), require('./view'), require('underscore'), require('backbone'), require('taurus'), require('jquery.lazyload'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../define'), require('./view'), require('underscore'), require('backbone'), require('taurus'), require('jquery.lazyload'))
  }
}(this, function (define, Base, _, Backbone, taurus) {
  return define(Base, {
    // tpl:'<%=content%>',
    config:{
      childEls: [
        'listWrap', 'listEl'
      ]
    },
    id: 'listEl',
    tagName: 'ul',
    className: 'dropdown-menu boundlist',
    overItemCls: 'item-over',
    selectedItemCls: 'boundlist-selected',
    listItemCls: '',
    itemCls: 'boundlist-item',
    renderTo: $(document.body),
    itemSelector: 'li',
    initialize: function () {
      var me = this
      me.$el.css('top', 0)
      Base.prototype.initialize.apply(me, arguments)
      me.collection.on('sync', _.bind(me.refresh, me))
      //me.collection.on('reset', _.bind(me.refresh, me))
    },
    indexOf: function (node) {
      return this.$el.find('.boundlist-item').index(node)
    },
    getRecord: function (node) {
      return this.collection.at(this.indexOf(node))
    },
    initComponent: function () {
      var me = this,
        itemCls = me.itemCls
      me.itemSelector = '.' + itemCls
      Base.prototype.initComponent.apply(this, arguments)
    },
    delegateEvents: function (events) {
      events = events || {}
      /*events['click ' + this.itemSelector] = 'onItemClick';*/
      var events = $.extend({}, this.events, events)
      Base.prototype.delegateEvents.call(this, events)
      this.selection = new Backbone.Collection
    },
    onItemSelect: function (record) {
      var node = this.getNode(record)
      node.addClass(this.selectedItemCls)
    },
    onItemDeselect: function (record) {
      if (record) {
        this.getNode(record).removeClass(this.selectedItemCls)
      }
    },
    /**
	     * A method that returns the inner template for displaying items in the list.
	     * This method is useful to override when using a more complex display value, for example
	     * inserting an icon along with the text.
	     * @param {String} displayField The {@link #displayField} for the BoundList.
	     * @return {String} The inner template
	     */
    getInnerTpl: function (displayField) {
      return '<a href="#"><%=item.' + displayField + '%></a>'
    },
    getNode: function (model) {
      return model ? this.getNodeByRecord(model) : undefined
    },
    getNodeByRecord: function (model) {
      return this.$el.find('li').eq(this.collection.indexOf(model))
    },
    clearHighlight: function () {
      this.$el.find('li').removeClass(this.overItemCls)
    },

    handleEvent: function (e) {
      this._super.apply(this, arguments)
      return false
    },
    highlightItem: function (item) {
      this.clearHighlight()
      this.highlightedItem = item
      item.addClass(this.selectedItemCls)
      this.trigger('highlightitem', this, item)
    },
    renderHtml: function () {
      var itemCls = this.itemCls
      if (!this.tpl) {
        // should be setting aria-posinset based on entire set of data
        // not filtered set
        this.tpl = ['<%_.each(results,function(item){%>',
          '<li role="option" class="' + itemCls + '">' + this.getInnerTpl(this.displayField) + '</li>',
          '<%})%>'].join('')
      }
      return Base.prototype.renderHtml.call(this, {results: this.collection.toJSON()})
    /*
    return taurus.views.Base.prototype.html.call(this,{
    	content:this.collection.map(function(model){
    		var boundListItem = new BoundListItem({
    			displayField:me.displayField,
    			model:model
    		})
    		return boundListItem.html()
    	}).join('')
    })*/
    },
    clearViewEl: function () {
      this.$el.empty()
      this.emptyEl = null
    },
    refresh: function () {
      var me = this
      me.clearViewEl()
      if (me.collection.length < 1) {
        // Process empty text unless the store is being cleared.
        if (me.emptyText) {
          me.emptyEl = $('<li>').text(me.emptyText).appendTo(me.getTargetEl())
          me.$el.addClass('boundlist-empty')
        }
      } else {
        me.$el.removeClass('boundlist-empty')
        me.renderHtml()
      }
      this.$el.css('height', 'auto')
      me.trigger('refresh')
    },
    alignTo: function (element, position, offsets) {
      var me = this
      //this.$el.css('z-index', '1051')
      if (this.lazyload) {
        me.$el.find('img.lazy').lazyload({
          container: me.$el
        })
      }
      return Base.prototype.alignTo.apply(this, arguments)
    },
    setHeight: function (height) {
      return Base.prototype.setHeight.call(this, Math.min(height, this.$el.height()))
    },
    show: function () {
      Base.prototype.show.apply(this, arguments)
    }
  })
}))
