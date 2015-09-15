/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./abstractView'),
	Backbone = require('backbone');
	require("../lang/event");
	return Base.extend({
		className:'row-fluid',
		selectedItemCls:'item-selected',
		keyEventRe: /^key/,
		onItemClick:function(e){
			var node = $(e.target).parents(this.itemSelector);
			var record = this.collection.at(this.$el.children().index(node));
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
		},
		delegateEvents:function(events){
			events = events || {};
			events['click'] = 'handleEvent';
			Base.prototype.delegateEvents.call(this,events)
		},
		getRecord: function(node){
	        return this.collection.find(function(model){
	        	return model.cid == node.attr('data-item-id')
	        });
	    },

	    handleEvent: function(e) {
	        var me = this,
	            isKeyEvent = me.keyEventRe.test(e.type);

	        e.view = me;

	        // Find the item from the event target.
	        e.item = e.getTarget(me.itemSelector);
	        if (e.item) {
	            e.record = me.getRecord(e.item);
	        }

	        if (me.processUIEvent(e) !== false) {
	            me.processSpecialEvent(e);
	        }
	        
	        // We need to prevent default action on navigation keys
	        // that can cause View element scroll unless the event is from an input field.
	        // We MUST prevent browser's default action on SPACE which is to focus the event's target element.
	        // Focusing causes the browser to attempt to scroll the element into view.
	        if (isKeyEvent && !Ext.fly(e.target).isInputField()) {
	            if (e.getKey() === e.SPACE || e.isNavKeyPress(true)) {
	                e.preventDefault();
	            }
	        }
	    },
	    processSpecialEvent: taurus.emptyFn,
	    processItemEvent: taurus.emptyFn,
	    processUIEvent:function(e){
	    	var me = this,
            item = e.item,
            record = e.record,
            index,
            type = e.type,
            newType = type;
            if (item) {
            	index = e.recordIndex = me.indexInStore ? me.indexInStore(record) : me.indexOf(item);
            	if (!record || me.processItemEvent(record, item, index, e) === false) {
	                return false;
	            }
	            me.trigger('item' + newType, me, record, item, index, e);
            }
	    }
	    /*,
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
	},{
        TouchEventMap: {
            touchstart: 'mousedown',
            touchend: 'mouseup',
            tap: 'click',
            doubletap: 'dblclick'
        }
	});
});
