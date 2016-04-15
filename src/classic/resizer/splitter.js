/**
 * @author nttdocomo
 */
/* # Example usage
 *
 * 		@example
 *		new taurus.form.field.Text({
 * 			name: 'name',
 * 			fieldLabel: 'Name',
 * 			inputType: 'password'
 * 		})
 */
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(["../view/base"], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
		        return factory(require('../view/base'));
		     })
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require("../view/base"));
	} else {
		root.myModule = factory();
	}
}(this, function(Base) {
	return Base.extend({
		baseCls: 'splitter',
		tpl:'<%if(typeof(text) !== "undefined"){%><%=text%><%}%>',
		getTplData:function(){
			return {
				text:this.text
			}
		}
	});
}));
