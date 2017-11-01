(function (root, factory) {
    if(typeof define === "function") {
        if(define.amd){
            define(['../mixin/mixin'], factory);
        }
        if(define.cmd){
            define(function(require, exports, module){
                return factory(require('../mixin/mixin'));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        module.exports = factory(require('../mixin/mixin'));
    }
}(this, function(mixin){
	return mixin({
		initialize: function() {
	        var me = this;

	        if (!me.stateEvents) {
	            me.stateEvents = [];
	        }

	        if (me.stateful !== false) {
	            //me.addStateEvents(me.stateEvents);
	            me.initState();
	        }
	    },

	    /**
	     * Applies the state to the object. This should be overridden in subclasses to do
	     * more complex state operations. By default it applies the state properties onto
	     * the current object.
	     * @param {Object} state The state
	     */
	    applyState: function(state) {
	        if (state) {
	            Ext.apply(this, state);
	        }
	    },
	    initState:function(){
	    	var me = this,
	    	state;
	    	me.applyState(state);
	    }
	})
}))