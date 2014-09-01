/**
 * @author nttdocomo
 */
define(function(require) {
	var Dialog = require('./dialog');
	return taurus.view("taurus.widget.Prompt", Dialog.extend({
		disabled:false,
		buttons:[{
			text:'Cancel',
			handler:'cancel',
			className:'btn-default',
			disabled:false
		},{
			text:'Confirm',
			handler:'confirm',
			className:'btn-primary',
			disabled:false
		}],
		getItemContainer:function(){
			return this.$el.find('.modal-body');
		},
		confirm : function() {
			this.close();
			this.trigger('confirm')
			return false;
		},
		cancel:function(){
			this.close();
			return false;
		},
		delegateEvents : function(events) {
			var events = events || {};
			_.each(this.buttons,function(button,i){
				events['click .modal-footer > button:eq('+i+')'] = button.handler
			})
			events = $.extend({}, this.events, {
				'click .btn-cancel' : 'cancel'
			}, events);
			Dialog.prototype.delegateEvents.call(this, events)
		},
		getTplData : function() {
			var data = Dialog.prototype.getTplData.apply(this,arguments);
			return $.extend(data,{
				'footer':'<div class="modal-footer">'+this.renderButttons()+'</div>'
			});
		},
		afterRender : function() {
			Dialog.prototype.afterRender.apply(this, arguments);
			//this.footer = $('<div class="modal-footer"></div>').appendTo(this.modal);
		},
		renderButttons:function(){
			return _.template('<%_.each(buttons,function(button){%><button class="btn<%if(button){%> <%=button.className%><%}%>"<%if(button.disabled){%> disabled="disabled"<%}%>><%=button.text%></button><%})%>', {
				buttons:this.buttons
			});
		},
		disabledButtons:function(){
			this.disabled = true;
			this.renderButttons();
		},
		enabledButtons:function(){
			this.disabled = false;
			this.renderButttons();
		}
	}));
});
