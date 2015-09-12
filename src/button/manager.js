/**
 * @author nttdocomo
 */
define(function(require) {
	var Class = require('../class'),
	taurus = require('../taurus');
	return new (Class.extend({
		groups: {},
		init: function() {
	        var me = this;
	        if (!me.initialized) {
	            taurus.$doc.on({
	                keydown: me.onDocumentKeyDown,
	                mouseup: me.onDocumentMouseUp
	            });
	            me.initialized = true;
	        }
	    },

	    // @private
	    register: function(btn) {
	        var me = this,
	            groups = this.groups,
	            group = groups[btn.toggleGroup];

	        me.init();
	        if (!btn.toggleGroup) {
	            return;
	        }

	        if (!group) {
	            group = groups[btn.toggleGroup] = [];
	        }
	        group.push(btn);
	        btn.on('toggle', me.toggleGroup, me);
	    },

	    toggleGroup: function(btn, state) {
	        if (state) {
	            var g = this.groups[btn.toggleGroup],
	                length = g.length,
	                i;

	            for (i = 0; i < length; i++) {
	                if (g[i] !== btn) {
	                    g[i].toggle(false);
	                }
	            }
	        }
	    }
	}));
});
