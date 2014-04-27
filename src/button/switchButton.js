/**
 * @author nttdocomo
 */
define(function(require) {
	var Button = require('./button');
	return taurus.view('taurus.button.SwitchButton', Button.extend({
		tpl : '<%_.each(buttons,function(button){%><button type="button" class="btn btn-default<%if(button.pressed){%> active<%}%>"><%=button.text%></button><%})%>',
		className : 'btn-group',
		tagName:'div',
		activeItem:0,
		enableToggle:true,
		allowDepress: false,
		events : {
			'click .btn' : 'onClick'
		},
		childEls: {
			'buttons' : '.btn'
		},
		initialize:function(){
			Button.prototype.initialize.apply(this,arguments)
			this.on('toggle',this.onToggle)
			this.on('toggle', this.toggleGroup);
		},
		getTplData : function() {
			var me = this;
			this.activeItem = (this.activeItem + 1 > this.buttons.length) ? 0 : this.activeItem;
			return {
				buttons : _.map(this.buttons,function(button,i){
					button.pressed = false;
					console.log(me.activeItem)
					console.log(i)
					if(me.activeItem == i){
						button.pressed = true
					}
					return button
				})
			}
		},
		onToggle : function(btn, state) {
			var me = this;
			if (state == true) {
				me.activeItem = btn.toggleCount;
				me.trigger('change', btn);
			}
		},
		toggleGroup : function(btn, state) {
            if (state) {
                var g = this.$el.find('.btn'),
                    length = g.length,
                    i;

                for (i = 0; i < length; i++) {
                    if (!$(g[i]).is(btn)) {
                        this.toggle($(g[i]),false);
                    }
                }
            }
        }
	}))
})
