define(function(require){
	var Base = require('taurus/view/base')
	return Base.extend({
		renderTo:$('.main'),
		title:'',
		className:'bs-docs-section',
		tpl:'<h1 class="page-header"><%=title%></h1>',
		getTplData: function(){
			return {
				title: this.title
			}
		},
		render:function(){
			this.renderTo.empty()
			this._super.apply(this, arguments)
		}
	})
})