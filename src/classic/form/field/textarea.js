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
			define(["./text"], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
		        var Base = require('./text')
		        return factory(Base);
		     })
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require("./text"));
	} else {
		root.myModule = factory();
	}
}(this, function(Base) {
	return Base.extend({
		fieldSubTpl:'<textarea id="<%=id%>" type="<%=type%>" class="form-control <%=fieldCls%>"<%if(typeof(placeholder) !== "undefined"){%> placeholder="<%=placeholder%>"<%}%><%if(typeof(value) !== "undefined"){%> value="<%=value%>"<%}%><%if(typeof(checked) !== "undefined"){%> checked="<%=checked%>"<%}%><%if(readOnly){%> readonly="readonly"<%}%><%if(disabled){%> disabled="<%=disabled%>"<%}%>></textarea>'
	});
}));
