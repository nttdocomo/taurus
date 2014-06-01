/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base');
	return Base.extend({
		tagName : 'li',
		tpl : '<a href="#"></a>',
		activeCls : 'active',
		initialize : function() {
			Base.prototype.initialize.apply(this, arguments);
			if (this.card) {
				this.setCard(this.card);
			}
		},

		/**
		 * Sets this tab's attached card. Usually this is handled automatically by the {@link Ext.tab.Panel} that this Tab
		 * belongs to and would not need to be done by the developer
		 * @param {Ext.Component} card The card to set
		 */
		setCard : function(card) {
			var me = this;

			me.card = card;
			me.setText(me.title || card.title);
			/*me.setIconCls(me.iconCls || card.iconCls);
			me.setIcon(me.icon || card.icon);
			me.setGlyph(me.glyph || card.glyph);*/
		},
		setText:function(text){
			this.$el.find('a').text(text);
		},
		getTplData : function() {
			return $.extend(Base.prototype.getTplData.apply(this, arguments), {
				title : this.title
			});
		},
		// @private
		activate : function(supressEvent) {
			var me = this;

			me.active = true;
			me.$el.addClass(me.activeCls);
		},
		// @private
		deactivate : function(supressEvent) {
			var me = this;

			me.active = false;
			me.$el.removeClass(me.activeCls);
		}
	});
});
