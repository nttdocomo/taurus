/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base');
	return Base.extend({
		type : 'warning',
		tagName:'ul',
		className:'dropdown-menu',
		dismissable : false,
		text : '',
		hideDelay : 1000,
		initialize:function(){
			this.$el.css('top',0);
			Base.prototype.initialize.apply(this,arguments);
		},
		html:function(){
			if (!this.tpl) {
	            this.tpl = ['<%_.each(results,function(item){%>',
	            '<li role="option"><a href="#"><%=item.text%></a></li>',
	            '<%})%>'].join('');
	        }
			return Base.prototype.html.call(this,{results:this.menu});
		}
	});
});
