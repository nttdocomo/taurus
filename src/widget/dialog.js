/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../view/base');
	return taurus.view("taurus.widget.Dialog", Base.extend({
		tpl:'<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><%=title%></h4></div><div class="modal-body"><%=content%></div><%=footer%></div></div>',
		className:'modal fade',
		content:null,
		events:{
			'click [data-dismiss="modal"]' : 'close'
		},
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
		},
		getTplData : function() {
			var data = Base.prototype.getTplData.apply(this,arguments)
			return $.extend(data,{
				'title':this.title,
				'content':this.content,
				'footer':''
			})
		},
		show:function(renderTo){
			if(!this.isRendered){
				this.render(renderTo || $(document.body));
			}
			this.$el.show().addClass('in');
			$(document.body).addClass('modal-open')
		},
		close:function(){
			this.$el.removeClass('in').hide().remove();
			$(document.body).removeClass('modal-open')
			return false;
		},
		delegateEvents : function(events) {
			var events = $.extend({}, this.events, {
				'click [data-dismiss="modal"]' : 'close'
			}, events);
			Base.prototype.delegateEvents.call(this, events)
		},
		applyChildEls:function(childEls){
			childEls = $.extend(childEls || {},{
				'modal':'.modal'
			})
			Base.prototype.applyChildEls.call(this,childEls)
		},
		html : function() {
			var html = Base.prototype.html.apply(this, arguments);
			this.$el.find('.modal-dialog').width(this.width)
			return html
		}
	}))
})
