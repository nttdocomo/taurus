/**
 * @author nttdocomo
 */
define(function(require){
	require("./trigger");
	return taurus.view("taurus.form.field.Picker", taurus.form.field.Trigger.extend({
		alignPicker:function(){
			var me = this, picker = me.getPicker(),position,
			heightAbove = taurus.getPositionAbove(this.$el),
			heightBelow = taurus.getPositionBelow(this.$el),
			space = Math.max(heightAbove, heightBelow);

			// Allow the picker to height itself naturally.
			/*if (picker.height) {
				delete picker.height;
				picker.updateLayout();
			}*/
			// Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
			if (picker.getHeight() > space - 5) {
				picker.setHeight(space - 5);
				// have some leeway so we aren't flush against
			}
			if(heightAbove > heightBelow){
				position = {
					"my" : "left bottom",
					"at" : "left top"
				};
			} else {
				position = {
					"my" : "left top",
					"at" : "left bottom"
				};
			}
			me.doAlign(position);
		},
		applyChildEls:function(childEls){
			childEls = $.extend({
				'triggerWrap':'.input-group',
				'triggerEl' : '.btn'
			}, childEls);
			taurus.form.field.Text.prototype.applyChildEls.call(this,childEls);
		},
		collapse:function(){
			if (this.isExpanded) {
				this.picker.hide();
				this.isExpanded = false;
				taurus.$doc.off('mousedown',this.onDocumentClick);
			}
		},
		doAlign:function(position){
			this.picker.alignTo(this.getAlignEl(), $.extend(this.pickerAlign,position), this.pickerOffset);
		},
		expand:function(){
			var picker;
			if (!this.isExpanded) {
				this.expanding = true;
				picker = this.getPicker();
				picker.show();
				this.isExpanded = true;
				this.alignPicker();
				this.onDocumentClick = _.bind(function(e){
					if(this.triggerWrap[0] != e.target && !this.triggerWrap.has(e.target).length && !this.picker.$el.has(e.target).length && !this.picker.$el.is(e.target)){
						this.collapse();
					}
				},this);
				taurus.$doc.on('mousedown',this.onDocumentClick,this);
				delete this.expanding;
			}
		},
		initialize:function(){
			taurus.form.field.Trigger.prototype.initialize.apply(this,arguments);
			var me = this;
		},
		getAlignEl:function(){
			return this.inputEl;
		},
		getPicker:function(){
			return this.picker || (this.picker = this.createPicker());
		},
		onItemClick:function(){
			this.collapse();
		},
		onTriggerClick : function(e) {
			if (this.isExpanded) {
				this.collapse();
			} else {
				this.expand();
			}
			//e.stopPropagation()
			this.inputEl.focus();
		},
		pickerAlign : {
			"my" : "left top",
			"at" : "left bottom",
			"collision" : "none none"
		}
	}));
});
