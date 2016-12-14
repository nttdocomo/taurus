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
			var me = this;
            me.fieldSubTpl = (me.buttonOnly ? '' : (me.hideTrigger ? '' : '<div class="input-group">') + me.fieldSubTpl) + (me.hideTrigger ? '' : me.getTriggerMarkup())+(me.hideTrigger || me.buttonOnly ? '' : '</div>');
			return me._super.apply(me,arguments);
			//return this.getFieldHtml();
		},
        getSubTplData: function() {
            var me = this;
            return _.extend(me._super.apply(me,arguments),{
				editableClass:(me.readOnly || !me.editable) ? 'trigger-noedit':'',
				readOnly: !me.editable || me.readOnly,
				disabled:me.disabled
			})
	    },
		getFieldHtml : function() {
			var me = this,inputHtml = Text.prototype.getFieldHtml.apply(this,arguments);
			return _.template((me.buttonOnly ? '' : (me.hideTrigger ? '' : '<div class="input-group">') + Text.prototype.getSubTplMarkup.apply(me,arguments)) + (me.hideTrigger ? '' : me.getTriggerMarkup())+(me.hideTrigger || me.buttonOnly ? '' : '</div>'))({
				editableClass:(me.readOnly || !me.editable) ? 'trigger-noedit':'',
				readOnly: !me.editable || me.readOnly,
				disabled:me.disabled
			});
		},
		getTriggerMarkup:function(){
			return this.triggerTpl;
		},
		disable:function(){
			this._super.apply(this,arguments)
			this.triggerEl.attr('disabled',true)
		},
		enable:function(){
			this._super.apply(this,arguments)
			this.triggerEl.attr('disabled',false)
   	}
	});
}));
