/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./date','../../picker/datetime'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./date'),require('../../picker/datetime'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./date'),require('../../picker/datetime'));
	}
}(this, function(Date,DatePicker) {
	return Date.extend({
		format : 'MM/DD/YYYY HH:mm:ss',
		createPicker : function() {
			var picker = new DatePicker({
				pickerField : this,
				format:this.format,
				renderTo : $(document.body)
			});
			picker.on('itemclick', this.onItemClick, this);
			return picker;
		},
		onItemClick:function(){
		}
	});
}));