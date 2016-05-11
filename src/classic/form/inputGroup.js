define(function(require){
	var Base = require('./label');
	return Base.extend({
		className:'input-group',
		childEls:{
			'frameBody':'> div'
		},
		getValue:function(){
			var value = {};
			_.each(this.items,function(item){
				value[item.getName()] = item.getSubmitValue()
			});
			return value;
		}
	})
})