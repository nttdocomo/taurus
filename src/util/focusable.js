define(function(require){
	var Focusable = function(){};
	Focusable.prototype = {
        beforeFocus:function(){},
        /**
         * @private
         */
        onFocus: function(e) {
            var me = this;
            me.beforeFocus(e);
        }
	}
	return Focusable;
})
