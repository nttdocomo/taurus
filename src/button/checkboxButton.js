/**
 * @author nttdocomo
 */
define(function(require){
	var Button = require('./button');
	return taurus.view('taurus.button.CheckboxButton',Button.extend({
		tpl:'<button type="button" class="btn btn-default">&nbsp;</button><%=text%>',
		events:{
			'click':'switchStatus'
		},
		className:'btn-group checkbox-button',
		tagName:'button',
		status:true,
		onText:'on',
		offText:'off',
		getTplData : function() {
			return {
				status:this.status ? 'on':'off',
				text:this.status ? this.onText:this.offText,
			}
		},
		html:function(){
			var html = Button.prototype.html.apply(this,arguments);
			this.$el.toggleClass('checkbox-button-' + (this.status ? 'on':'off'))
			return html
		},
		switchStatus:function(){
			var status = this.status, events = status ? 'on':'off';
			this.$el.toggleClass('checkbox-button-' + events)
			this.status = status = !status;
			events = status ? 'on':'off';
			this.trigger(events)
			this.html()
		}
	}))
})
