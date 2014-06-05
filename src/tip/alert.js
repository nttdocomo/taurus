/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base');
	return taurus.view('taurus.tip.alert', Base.extend({
		tpl : '<div class="alert alert-<%=type%><%if(dismissable){%> alert-dismissable<%}%>"><%if(dismissable){%><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><%}%><%=text%></div>',
		type : 'warning',
		dismissable : false,
		text : '',
		hideDelay : 1000,
		events : {
			'click .close' : 'close'
		},
		initialize : function() {
			Base.prototype.initialize.apply(this, arguments)
			if (this.autoHide) {
				this.delayHide()
			}
		},
		close : function() {
			this.$el.remove();
		},

		// private
		delayHide : function() {
			var me = this;
			if (!me.hidden && !me.hideTimer) {
				me.hideTimer = _.delay(_.bind(this.close,this), this.hideDelay);
			}
		},
		getTplData : function() {
			return {
				'type' : this.type,
				'text' : this.text,
				'dismissable' : this.dismissable
			}
		}
	}));
});
