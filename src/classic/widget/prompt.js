/**
 * @author nttdocomo
 */
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./dialog', '../button/button', '../../i18n', 'underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./dialog'),require('../button/button'),require('../../i18n'), require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./dialog'),require('../button/button'),require('../../i18n'), require('underscore'));
	}
}(this, function(Dialog,Button,i18n,_) {
	return Dialog.extend({
		disabled:false,
		buttons:[{
			text:i18n.__('Cancel'),
			handler:'cancel',
			disabled:false
		},{
			text:i18n.__('Confirm'),
			handler:'confirm',
			ui:'primary',
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
			/*_.each(this.buttons,function(button,i){
				events['click .modal-footer > button:eq('+i+')'] = button.handler
			})
			events = $.extend({}, this.events, {
				'click .btn-cancel' : 'cancel'
			}, events);*/
			Dialog.prototype.delegateEvents.call(this, events)
		},
		getTplData : function() {
			var data = Dialog.prototype.getTplData.apply(this,arguments);
			return data
		},
		afterRender : function() {
			Dialog.prototype.afterRender.apply(this, arguments);
			this.footer = $('<div class="modal-footer"></div>').appendTo(this.content);
			this.renderButttons()
		},
		renderButttons:function(){
      var me = this
      var footer = me.footer
      me.buttons = _.map(me.buttons, function(button){
      	if(typeof(button.handler) === 'string'){
      		button.handler = me[button.handler]
      	}
      	if(button.handler){
      		button.handler = _.bind(button.handler, me)
      	}
      	
        var btn = new Button(button)
        btn.render(footer)
        return btn
      })
			/*return _.template('<%_.each(buttons,function(button){%><<%if(button.href){%>a href="<%=button.href%>"<%}else{%>button<%}%> class="btn<%if(button){%> <%=button.className%><%}%>"<%if(button.disabled){%> disabled="disabled"<%}%>><%=button.text%></<%if(button.href){%>a<%}else{%>button<%}%>><%})%>')({
				buttons:this.buttons
			});*/
		},
		disabledButtons:function(){
			this.disabled = true;
			this.renderButttons();
		},
		enabledButtons:function(){
			this.disabled = false;
			this.renderButttons();
		},
		show: function(){
			var me = this
			me._super.apply(me, arguments)
			if(!me.footerElHeight){
				me.footerElHeight = me.footer.outerHeight()
				me.content.css({
					'padding-bottom':me.footerElHeight
				})
				me.footer.css({
					'margin-bottom':-1*me.footerElHeight
				})
			}
		}
	});
}));
