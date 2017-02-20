/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./trigger'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./trigger'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./trigger'));
	}
}(this, function(Trigger){
  /**
   * A namespace.
   * @namespace form
   */
  /**
   * A namespace.
   * @namespace field
   * @memberof form
   */
	/**
   * An abstract class for fields that have a single trigger which opens a "picker" popup below the field, e.g. a combobox
   * needed by all form field types.
   *
   * @constructor Picker
   * @param {Object} config
   * @memberof field
   */
	return Trigger.extend({
		/**
     * @property {Boolean} matchFieldWidth
     * Whether the picker dropdown's width should be explicitly set to match the width of the field. Defaults to true.
     * @memberof field.Trigger#
     */
    matchFieldWidth: true,
		alignPicker:function(){
			var me = this, picker = me.getPicker(),position,
			heightAbove = taurus.getPositionAbove(me.$el),
			heightBelow = taurus.getPositionBelow(me.$el),
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
		/*applyChildEls:function(childEls){
			childEls = $.extend({
				'triggerWrap':'> div',
				'triggerEl' : '.btn'
			}, childEls);
			Trigger.prototype.applyChildEls.call(this,childEls);
		},*/
		collapse:function(){
			if (this.isExpanded) {
				this.picker.hide();
				this.isExpanded = false;
			}
		},
		doAlign:function(position){
			this.picker.alignTo(this.getAlignEl(), $.extend(this.pickerAlign,position), this.pickerOffset);
		},
		expand:function(){
			var me = this,picker;
			if (!me.isExpanded) {
				me.expanding = true;
				picker = this.getPicker();
				if (me.matchFieldWidth) {
          picker.setWidth(me.bodyEl.width());
        }
				picker.show();
				me.isExpanded = true;
				me.alignPicker();
				var onDocumentClick = function(e){
					if(me.triggerWrap[0] != e.target && !me.triggerWrap.has(e.target).length && !me.picker.$el.has(e.target).length && !me.picker.$el.is(e.target)){
						me.collapse();
						taurus.$doc.off('mousedown',onDocumentClick);
					}
				};
				taurus.$doc.on('mousedown',onDocumentClick);
				delete me.expanding;
			}
		},
		initialize:function(){
			Trigger.prototype.initialize.apply(this,arguments);
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
	});
}));