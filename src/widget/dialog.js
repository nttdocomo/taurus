/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../view/base','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../view/base'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../view/base'),require('underscore'));
	}
}(this, function(Base){
	return Base.extend({
		tpl:'<div class="modal-dialog"><div class="modal-content"><%if(header){%><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><%=title%></h4></div><%}%><div class="modal-body"><%=content%></div><%=footer%></div></div>',
		className:'modal fade',
		content:null,
		header:true,
		fullscreen:false,
		events:{
			'click [data-dismiss="modal"]' : 'close'
		},
		getTplData : function() {
			var data = Base.prototype.getTplData.apply(this,arguments);
			return $.extend(data,{
				'header':this.header,
				'title':this.title,
				'content':this.content,
				'footer':''
			});
		},
		getTargetEl:function(){
			return this.$el.find('.modal-body')
		},
		show:function(renderTo){
			if(!this.isRendered){
				this.render(renderTo || $(document.body));
			}
			this.$el.addClass('in').show();
			$(document.body).addClass('modal-open');
			this.position();
		},
		position:function(){
			if(this.fullscreen){
				this.$el.addClass('modal-fullscreen')
			}
			var height = this.$el.find('.modal-dialog').height(),width = this.$el.find('.modal-dialog').width();
			if(!this.fullscreen){
				this.$el.find('.modal-dialog').css({
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
			this.$el.removeClass('in').hide();
			$(document.body).removeClass('modal-open');
			return false;
		},
		delegateEvents : function(events) {
			var events = $.extend({}, this.events, {
				'click [data-dismiss="modal"]' : 'close'
			}, events);
			Base.prototype.delegateEvents.call(this, events);
		},
		applyChildEls:function(childEls){
			childEls = $.extend(childEls || {},{
				'modal':'.modal',
				'headerEl':'.modal-header',
				'header':'.modal-title',
				'bodyEl':'.modal-body'
			});
			Base.prototype.applyChildEls.call(this,childEls);
		},
		render : function() {
			Base.prototype.render.apply(this, arguments);
			this.$el.find('.modal-dialog').height(this.height);
			this.$el.find('.modal-dialog').width(this.width);
		},
		setHeight : function(height) {
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
		},
		update:function(htmlOrData){
	        var me = this;
	        if (_.isString(htmlOrData)) {
	            me.bodyEl.html(htmlOrData)
	        }
		}
	});
}));