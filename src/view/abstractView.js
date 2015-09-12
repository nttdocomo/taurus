define(function(require){
	var Base = require('./base')
	return Base.extend({
		initComponent:function(){
			var me = this;
			if (!me.itemSelector) {
                me.itemSelector = '.' + me.itemCls;
            }
            Base.prototype.initComponent.apply(this,arguments);
		}
	})
})