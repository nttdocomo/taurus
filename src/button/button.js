/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base')
	return taurus.view('taurus.button.Button', Base.extend({
		/**
		 * @property {Boolean} disabled
		 * True if this button is disabled.
		 * @readonly
		 */
		disabled : false,
		/**
		 * @cfg {Boolean} [enableToggle=false]
		 * True to enable pressed/not pressed toggling.
		 */
		enableToggle : false,
		/**
		 * @property {Boolean} pressed
		 * True if this button is pressed (only if enableToggle = true).
		 * @readonly
		 */
		pressed : false,

		tpl : '<%=text%>',
		pressedCls : 'active',
		tagName : 'button',
		className : 'btn btn-default',
		events : {
			'mousedown' : 'onMouseDown'
		},

		doToggle : function(e) {
			var me = this;
			if (me.enableToggle && (me.allowDepress !== false || !me.pressed)) {
				me.toggle($(e.target));
			}
		},

		fireHandler : function(e) {
			var me = this, handler = me.handler;

			if (me.trigger('click', me, e) !== false) {
				if (handler) {
					handler.call(me, e);
				}
				//me.blur();
			}
		},

		maybeShowMenu : function() {
			var me = this;
			if (me.menu && !me.hasVisibleMenu() && !me.ignoreNextClick) {
				me.showMenu();
			}
		},
		onClick : function(e) {
			var me = this;
			if (!me.disabled) {
				me.doToggle(e);
				me.maybeShowMenu();
				me.fireHandler(e);
			}
		},

		// private
		onMouseDown : function(e) {
			var me = this, target = $(e.target);
			if (!me.disabled) {
				target.addClass(me.pressedCls);
				var onMouseUp = _.bind(function(e) {
					console.log('mouseup')
					var me = this;
					if (!this.pressed) {
						target.removeClass(me.pressedCls);
					}
					this.doc.off('mouseup', onMouseUp);
				}, me)
				me.doc.on('mouseup', onMouseUp);
			}
		},

		/**
		 * If a state it passed, it becomes the pressed state otherwise the current state is toggled.
		 * @param {Boolean} [state] Force a particular state
		 * @param {Boolean} [suppressEvent=false] True to stop events being fired when calling this method.
		 * @return {Ext.button.Button} this
		 */
		toggle : function(btn, state, suppressEvent) {
			var me = this;
			state = state === undefined ? !me.pressed : !!state;
			if (state !== me.pressed) {
				btn[state ? 'addClass': 'removeClass'](me.pressedCls);
				me.pressed = state;
				if (!suppressEvent) {
					me.trigger('toggle', btn, state);
					me.toggleHandler && me.toggleHandler.apply(me, [state]);
				}
			}
			return me;
		},
		delegateEvent:function(events){
			events[me.clickEvent] = 'onClick';
			Base.prototype.delegateEvent.call(this,events)
		}
	}))
})
