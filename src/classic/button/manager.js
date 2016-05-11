/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['class','taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('class'),require('taurus'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('class'),require('taurus'));
	}
}(this, function(Class,taurus) {
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
}));
