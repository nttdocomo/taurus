/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return Base.extend({
		className:'row-fluid',
		itemSelector:'.item-selector',
		selectedItemCls:'item-selected',
		delegateEvents : function(events) {
			events = events || {};
			events['click ' + this.itemSelector] = 'onItemClick';
			var events = $.extend({}, this.events, events);
			Base.prototype.delegateEvents.call(this, events);
			this.selection = new Backbone.Collection;
		},
		onItemClick:function(e){
			var node = $(e.target).closest(this.itemSelector);
			var record = this.collection.at(this.$el.children().index((node)));
			/*if(e.ctrlKey){
				if(this.selection.contains(record)){
					node.removeClass(this.selectedItemCls);
					this.selection.remove(record);
				} else {
					node.addClass(this.selectedItemCls);
					this.selection.add(record);
				}
			} else {
				if(this.selection.length){
					this.getNodeByRecord(this.selection.at(0)).removeClass(this.selectedItemCls);
				}
				if(!this.selection.contains(record)){
					node.addClass(this.selectedItemCls);
					this.selection.set([record]);
				}
			}
			//console.log(this.selection)*/
			this.trigger('itemclick',e,record);
			return false;
		}/*,
		html:function(){
			var me = this;
			return Base.prototype.html.call(this,{
				html:this.collection.map(function(model){
					return (new me.view({
						model:model
					})).html()
				}).join('')
			})
		}*/
	});
});
