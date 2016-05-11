/**
 * @author nttdocomo
 */
(function (root, factory) {
    if(typeof define === "function"){
        if(define.amd) {
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../../view/base'],function(Base){
              return (root.Class = factory(Base));
            });
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../../view/base')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../../view/base')));
    } else {
        root.Class = factory();
    }
}(this, function(Base) {
	return Base.extend({
		tpl : '<%if(dismissable){%><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><%}%><%=text%>',
		type : 'warning',
		dismissable : false,
		text : '',
		hideDelay : 1000,
		events : {
			'click .close' : 'close'
		},
		className:'alert',
		initialize : function() {
			Base.prototype.initialize.apply(this, arguments)
			if (this.autoHide) {
				this.delayHide()
			}
			this.$el.addClass([this.className,this.type].join('-'));
			if(this.dismissable){
				this.$el.addClass('alert-dismissable')
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
	});
}));
