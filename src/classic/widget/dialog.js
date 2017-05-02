/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../view/base','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../view/base'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../view/base'),require('underscore'));
	}
}(this, function(Base){
	return Base.extend({
		tpl:'<div class="modal-dialog"><div class="modal-content"><%if(header){%><div class="modal-header"><h4 class="modal-title"><%=title%></h4></div><%}%><div class="modal-body"><%=content%></div><%=footer%><%if(closable){%><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><%}%></div></div>',
		className:'modal fade',
		content: null,
		header: true,
		fullscreen:false,
		closable:true,
		closeAction:'destroy',
		events:{
			'click [data-dismiss="modal"]' : 'close'
		},
		childEls:{
			'modal':'.modal',
			'content':'.modal-content',
			'headerEl':'.modal-header',
			'header':'.modal-title',
			'dialog':'.modal-dialog',
			'bodyEl':'.modal-body'
		},
		getTplData : function() {
			var data = Base.prototype.getTplData.apply(this,arguments);
			return $.extend(data,{
				'header':this.header,
				'title':this.title,
				'content':this.content,
				'footer':'',
				'closable':this.closable
			});
		},
		getTargetEl:function(){
			return this.$el.find('.modal-body')
		},
		show:function(renderTo){
			var me = this
			if(!me.rendered){
				me.render(renderTo || $(document.body));
			}
			me.$el.addClass('in');
			$(document.body).addClass('modal-open');
			me._super();
			if(!me.headerElHeight){
				me.headerElHeight = me.headerEl.outerHeight()
				me.content.css({
					'padding-top':me.headerElHeight
				})
				me.headerEl.css({
					'margin-top':-1*me.headerElHeight
				})
			}
			me.position();
		},
		position:function(){
      var me = this,$el = me.$el,dialog = me.dialog;
			if(me.fullscreen){
				$el.addClass('modal-fullscreen')
			}
			var height = dialog.height(),width = dialog.width();
			var modalHeight = this.$el.height()
			if(height > modalHeight){
				height = modalHeight
			}
			me.setHeight(height)
			if(!me.fullscreen){
				dialog.css({
					'margin-top':(height/2)*-1,
					'margin-left':(width/2)*-1,
					'position':'absolute',
					'margin-right':0,
					'margin-bottom':0,
					'top':'50%',
					'left':'50%'
				});
			}
		},
		close:function(){
			var me = this;
			me.$el.removeClass('in').hide();
			$(document.body).removeClass('modal-open');
			me.doClose();
			return false;
		},

	    destroy: function() {
            var me = this;
            me.remove();
	        /*this.callParent();
	        this.dockedItems = this.bodyContainer = null;*/
	        this.$el.remove();
	    },
		doClose:function(){
			var me = this;
			me.trigger('close');
			me[me.closeAction]()
		},
		delegateEvents : function(events) {
			var events = $.extend({}, this.events, {
				'click [data-dismiss="modal"]' : 'close'
			}, events);
			Base.prototype.delegateEvents.call(this, events);
		},
		/*applyChildEls:function(childEls){
			childEls = $.extend(childEls || {},{
				'modal':'.modal',
				'content':'.modal-content',
				'headerEl':'.modal-header',
				'header':'.modal-title',
                'dialog':'.modal-dialog',
				'bodyEl':'.modal-body'
			});
			Base.prototype.applyChildEls.call(this,childEls);
		},*/
		setHeight : function(height) {
			if(this.rendered){
				this.dialog.height(height);
			}
		},
		setTitle:function(title){
      var me = this,
          oldTitle = me.title,
          header = me.header

      if (title !== oldTitle) {
          me.title = title;

          header.text(title);

          me.trigger('titlechange', me, title, oldTitle);
      }
		},
		setWidth : function(width) {
			if(this.rendered){
				this.dialog.width(width);
			}
		},
		update:function(htmlOrData){
	        var me = this;
	        if (_.isString(htmlOrData)) {
	            me.bodyEl.html(htmlOrData)
	        }
		}
	});
}));
