/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return taurus.view('taurus.views.Column',Base.extend({
		tpl:'<div class="column-header-inner"><%=text%><%if(sortable){%><span class="caret"></span><%}%></div>',
		className:'column-header',
		html:function(data){
			if(data.width){
				this.$el.css('width',data.width)
			}
			return Base.prototype.html.apply(this,[data])
		},
		afterRender:function(){
			Base.prototype.afterRender.apply(this,arguments)
			if(this.width){
				this.$el.width(this.width)
			}
		}
	}))
})
