/**
 * @author nttdocomo
 */

define(function(require) {
	var Base = require('./base');
	return taurus.view("taurus.views.BoundListItem", Base.extend({
		tpl:'<a href="#"><%=displayField%></a>',
		tagName:'li',
		html:function(){
			var json = this.model.toJSON();
			json.displayField = json[this.displayField];
			delete json[this.displayField];
			return Base.prototype.html.call(this,json)
		}
	}));
});