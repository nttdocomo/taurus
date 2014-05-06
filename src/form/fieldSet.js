/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base');
	return Base.extend({
		tagName : 'fieldset',
		baseCls: 'fieldset',
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click .caret' : 'toggle'
			});
			Base.prototype.delegateEvents.call(this, events);
		},
		tpl:'<legend><span class="caret"></span><%=title%></legend><div class="fieldset-body"></div>',
		getItemContainer:function(){
			return this.$el.find(' > div');
		},
		getTplData : function() {
			return {
				'title':this.title
			};
		},

	    /**
	     * Collapses the fieldset.
	     * @return {Ext.form.FieldSet} this
	     */
	    collapse : function() {
	        return this.setExpanded(false);
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
