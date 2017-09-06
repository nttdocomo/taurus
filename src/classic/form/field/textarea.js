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
			define(["./text", 'taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
        return factory(require('./text'), require('taurus'))
     	})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require("./text"), require('taurus'));
	} else {
		root.myModule = factory();
	}
}(this, function(Base, taurus) {
	return Base.extend({
		inputCls: taurus.baseCSSPrefix + 'form-textarea',
		fieldSubTpl:'<textarea id="<%=id%>" name="<%=name%>" class="form-control <%=fieldCls%> <%=inputCls%>"<%if(typeof(placeholder) !== "undefined"){%> placeholder="<%=placeholder%>"<%}%><%if(readOnly){%> readonly="readonly"<%}%><%if(disabled){%> disabled="<%=disabled%>"<%}%>><%if(typeof(value) !== "undefined"){%><%=value%><%}%></textarea>'
	});
}));
