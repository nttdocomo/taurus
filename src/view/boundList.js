/**
 * @author nttdocomo
 */

define(function(require) {
	var Base = require('./view');
	require('../jquery.ui.position');
	var BoundListItem = require('./boundListItem');
	return Base.extend({
		//tpl:'<%=content%>',
		id : 'listEl',
		tagName:'ul',
		className:'dropdown-menu boundlist',
		overItemCls : 'item-over',
		selectedItemCls:'boundlist-selected',
		listItemCls : '',
		itemCls: 'boundlist-item',
		childEls : ['listEl'],
		renderTo:$(document.body),
		itemSelector:'li',
		initialize:function(){
			this.$el.css('top',0);
			Base.prototype.initialize.apply(this,arguments);
			this.collection.on('reset',_.bind(this.refresh,this));
		},
		onItemSelect:function(record){
			var node = this.getNode(record);
			node.addClass(this.selectedItemCls);
		},
		onItemDeselect:function(record){
			if(record){
				this.getNode(record).removeClass(this.selectedItemCls);
			}
		},
		/**
	     * A method that returns the inner template for displaying items in the list.
	     * This method is useful to override when using a more complex display value, for example
	     * inserting an icon along with the text.
	     * @param {String} displayField The {@link #displayField} for the BoundList.
	     * @return {String} The inner template
	     */
	    getInnerTpl: function(displayField) {
	        return '<a href="#" class="boundlist-item"><%=item.' + displayField + '%></a>';
	    },
		getNode:function(model){
			return model ? this.getNodeByRecord(model):undefined;
		},
		getNodeByRecord:function(model){
			return this.$el.find('li').eq(this.collection.indexOf(model));
		},
		clearHighlight:function(){
			this.$el.find('li').removeClass(this.overItemCls);
		},
		highlightItem:function(item){
			this.clearHighlight();
			this.highlightedItem = item;
			item.addClass(this.selectedItemCls);
			this.trigger('highlightitem', this, item);
		},
		html:function(){
			var itemCls = this.itemCls;
			if (!this.tpl) {
	            // should be setting aria-posinset based on entire set of data
	            // not filtered set
	            this.tpl = ['<%_.each(results,function(item){%>',
	            '<li role="option" class="' + itemCls + '">' + this.getInnerTpl(this.displayField) + '</li>',
	            '<%})%>'].join('');
	        }
			return Base.prototype.html.call(this,{results:this.collection.toJSON()});/*
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
		refresh:function(){
			this.$el.empty();
			this.html();
			this.$el.css('height','auto');
			this.trigger('refresh');
		},
		alignTo : function(element, position, offsets) {
			this.$el.css('z-index','1051');
			return Base.prototype.alignTo.apply(this,arguments);
		},
		setHeight:function(height){
			return Base.prototype.setHeight.call(this,Math.min(height,this.$el.height()));
		}
	});
});