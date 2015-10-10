/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./dialog','../i18n/zh-cn'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./dialog'),require('../i18n/zh-cn'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./dialog'),require('../i18n/zh-cn'));
	}
}(this, function(Dialog,i18n) {
	return Dialog.extend({
		disabled:false,
		buttons:[{
			text:i18n.__('Cancel'),
			handler:'cancel',
			className:'btn-default',
			disabled:false
		},{
			text:i18n.__('Confirm'),
			handler:'confirm',
			className:'btn-primary',
			disabled:false
		}],
		getItemContainer:function(){
			return this.$el.find('.modal-body');
		},
		confirm : function() {
			this.close();
			this.trigger('confirm',this)
			return false;
		},
		cancel:function(){
			this.close();
			this.trigger('cancel',this)
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
			return _.template('<%_.each(buttons,function(button){%><button class="btn<%if(button){%> <%=button.className%><%}%>"<%if(button.disabled){%> disabled="disabled"<%}%>><%=button.text%></button><%})%>')({
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
	});
}));