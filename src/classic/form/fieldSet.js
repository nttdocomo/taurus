/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../../view/base');
	return Base.extend({
		tagName : 'fieldset',
		baseCls: 'fieldset',
		collapsable:false,
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click legend > .caret' : 'toggle'
			});
			Base.prototype.delegateEvents.call(this, events);
		},
		tpl:'<legend><%if(collapsable){%><span class="caret"></span><%}%><%=title%></legend><div class="fieldset-body"></div>',
		getTargetEl:function(){
			return this.$el.find(' > .fieldset-body');
		},
		getTplData : function() {
			return {
				'title':this.title,
				'collapsable':this.collapsable
			};
		},

	    /**
	     * Collapses the fieldset.
	     * @return {Ext.form.FieldSet} this
	     */
	    collapse : function() {
	        return this.setExpanded(false);
	    },
	    query:function(queryString){
	    	var query = queryString.match(/\[(.+?)\]/),
	    	items = [];
	    	_.each(this.items,function(item){
	    		if(item[query[1]]){
	    			items.push(item)
	    		} else {
		    		if(item.query){
		    			items = items.concat(item.query(queryString))
		    		}
	    		}
	    	})
	    	return items;
	    },

	    /**
	     * @private Collapse or expand the fieldset
	     */
	    setExpanded: function(expanded) {
	        var me = this,
	            checkboxCmp = me.checkboxCmp,
	            operation = expanded ? 'expand' : 'collapse';
	            expanded = !!expanded;
	
            if (checkboxCmp) {
                checkboxCmp.setValue(expanded);
            }

            if (expanded) {
                me.$el.removeClass(me.baseCls + '-collapsed');
            } else {
                me.$el.addClass(me.baseCls + '-collapsed');
            }
            me.collapsed = !expanded;
	        return me;
	    },

	    /**
	     * Toggle the fieldset's collapsed state to the opposite of what it is currently
	     */
	    toggle: function() {
	        this.setExpanded(!!this.collapsed);
	    }
	});
});
