/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../../view/base','../../i18n','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../../view/base'),require('../../i18n'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../../view/base'),require('../../i18n'),require('underscore'));
	}
}(this, function(Base,i18n,_) {
	return Base.extend({
		//tpl:'<ul><li<% if (currentPage <= firstPage) { %> class="disabled"<%}%>><a href="#">Prev</a></li><% for(p=1;p<=totalPages;p++){%><li<% if (currentPage == p) { %> class="disabled"<% } %>><a href="#"><%= p %></a></li><%}%><li<% if (currentPage == totalPages) { %> class="disabled"<%}%>><a href="#">Next</a></li></ul>',
		tpl:'<%=page%>',
		pageTpl:'<%=fastBackward%><%=backward%><span><%=pageDesc%></span><%=forward%><%=fastForward%>',
		tagName:'div',
		className:'pagination',
		/*events:{
			'click .backward':function(){
				this.collection.hasPreviousPage() && this.collection.getPreviousPage();
			},
			'click .forward':function(){
				this.collection.hasNextPage() && this.collection.getNextPage();
			},
			'click .fast-backward':function(){
				this.collection.getPage(1);
			},
			'click .fast-forward':function(){
				this.collection.getPage(this.collection.state.totalPages);
			}
		},*/
		initialize : function() {
			var me = this;collection = me.collection,renderHtml = me.renderHtml,
			debounceRenderHtml = _.debounce(renderHtml, 500);
			Base.prototype.initialize.apply(me,arguments);
			if(collection.mode != "server"){
				collection.fullCollection.on('reset',  debounceRenderHtml, me)
				collection.on('remove', debounceRenderHtml, me);
			}
			collection.on('sync', debounceRenderHtml, me);
			collection.on('reset', debounceRenderHtml, me);
			collection.on('update',  debounceRenderHtml, me);
			collection.on('sort', debounceRenderHtml, me);
		},
		delegateEvents:function(){
			var events = $.extend({}, this.events, {
				'click a' : 'onPagerClick'
			});
			Base.prototype.delegateEvents.call(this, events);
		},
		onPagerClick:function(e){
			var target = $(e.target),isActive = !target.parent('li').hasClass('disabled'),page;
			if(isActive){
				page = target.text();
				if(/\d/.test(page)){
					this.collection.goTo(page);
				}
				if(page.toLowerCase() == 'prev'){
					this.collection.requestPreviousPage();
				}
				if(page.toLowerCase() == 'next'){
					this.collection.requestNextPage();
				}
			}
			return false;
		},
		onCollectionChange:function(){
			var info = this.collection.state;
			if(!this.collection.length){
				this.collection.getPage(info.currentPage);
			}
		},
		renderHtml:function(){
			if(this.collection.length){
				var info = this.collection.state;
				return Base.prototype.renderHtml.call(this,{
					page:_.template(this.pageTpl)($.extend({
						fastBackward : '<a href="" class="halflings fast-backward" data-name="fast-backward" data-type="" data-prefix="halflings" data-utf="E070"></a>',
						backward : '<a href="" class="halflings backward" data-name="backward" data-type="" data-prefix="halflings" data-utf="E071"></a>',
						fastForward : '<a href="" class="halflings fast-forward" data-name="fast-forward" data-type="" data-prefix="halflings" data-utf="E076"></a>',
						forward : '<a href="" class="halflings forward" data-name="forward" data-type="" data-prefix="halflings" data-utf="E077"></a>',
						pageDesc:i18n.__("Page %d of %d",info.currentPage,info.totalPages),
						totalPages:0
					},info))
				});
			} else {
				this.collection.hasPreviousPage() && this.collection.getPreviousPage();
				return Base.prototype.renderHtml.call(this,{
					page:''
				});
			}
			return '';
		}
	});
}));
