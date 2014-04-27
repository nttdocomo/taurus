/**
 * @author nttdocomo
 */
define(function(require){
	var Picker = require('../form/field/picker');
	var BoundList = require("../view/boundList");
	taurus.augmentString('taurus.templates.button.buttondropdown', 'Action <span class="caret"></span>');
	return taurus.view('taurus.button.ButtonDropdown',Picker.extend({
		className:'btn dropdown-toggle',
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click' : 'onTriggerClick'
			});
			Picker.prototype.delegateEvents.call(this, events)
		},
		applyChildEls:function(childEls){
			Picker.prototype.applyChildEls.call(this,childEls);
			this.triggerWrap = this.$el;
		},
		getAlignEl:function(){
			return this.$el
		},
		createPicker:function(){
			var picker = this.picker = new BoundList({
				displayField:this.displayField,
				collection:this.collection
			})
			picker.on('itemclick', this.onItemClick, this);
			return picker;
		}
	}))
})
