/**
 * @author nttdocomo
 */
define(function(require) {
	var Date = require("./date"),
	DatePicker = require("../../picker/datetime");
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
});
