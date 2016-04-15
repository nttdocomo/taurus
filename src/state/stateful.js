define(function(require){
	var Stateful = function(){};
	Stateful.prototype = {
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
	}
	return Stateful;
})