/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./text','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./text'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./text'),require('underscore'));
	}
}(this, function(Text,_){
	return Text.extend({
		editable:true,
		/**
		 * @cfg {Boolean} buttonOnly
		 * True to display the file upload field as a button with no visible text field. If true, all
		 * inherited Text members will still be available.
		 */
		buttonOnly : false,
		applyChildEls:function(childEls){
			childEls = $.extend(childEls || {},{
				'triggerEl':'.form-trigger'
			});
			Text.prototype.applyChildEls.call(this,childEls);
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click .form-trigger' : 'onTriggerClick'
			});
			Text.prototype.delegateEvents.call(this, events);
		},
		getSubTplMarkup:function(){
			var inputHtml = Text.prototype.getFieldHtml.apply(this,arguments);
			return _.template((this.buttonOnly ? '' : (this.hideTrigger ? '' : '<div class="input-group">') + Text.prototype.getSubTplMarkup.apply(this,arguments)) + (this.hideTrigger ? '' : this.getTriggerMarkup())+(this.hideTrigger || this.buttonOnly ? '' : '</div>'))({
				editableClass:(this.readOnly || !this.editable) ? 'trigger-noedit':'',
				readOnly: !this.editable || this.readOnly
			});
			//return this.getFieldHtml();
		},
		getFieldHtml : function() {
			var inputHtml = Text.prototype.getFieldHtml.apply(this,arguments);
			return _.template((this.buttonOnly ? '' : (this.hideTrigger ? '' : '<div class="input-group">') + Text.prototype.getSubTplMarkup.apply(this,arguments)) + (this.hideTrigger ? '' : this.getTriggerMarkup())+(this.hideTrigger || this.buttonOnly ? '' : '</div>'))({
				editableClass:(this.readOnly || !this.editable) ? 'trigger-noedit':'',
				readOnly: !this.editable || this.readOnly
			});
			/*return _.template('<div class="input-append"><input class="<%=editableClass%>" type="text"<%if(readOnly){%>  readonly="readonly"<%}%>>'+this.triggerTpl+'</div>',{
				editableClass:(this.readOnly || !this.editable) ? 'trigger-noedit':'',
				readOnly: !this.editable || this.readOnly
			});*/
		},
		getTriggerMarkup:function(){
			return this.triggerTpl;
		}
	});
}));