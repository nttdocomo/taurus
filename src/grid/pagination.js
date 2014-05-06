/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base'),
	i18n = require('../i18n/zh-cn');
	return taurus.view('taurus.view.Pagination', Base.extend({
		//tpl:'<ul><li<% if (currentPage <= firstPage) { %> class="disabled"<%}%>><a href="#">Prev</a></li><% for(p=1;p<=totalPages;p++){%><li<% if (currentPage == p) { %> class="disabled"<% } %>><a href="#"><%= p %></a></li><%}%><li<% if (currentPage == totalPages) { %> class="disabled"<%}%>><a href="#">Next</a></li></ul>',
		tpl:'<%=fastBackward%><%=backward%><span><%=pageDesc%></span><%=forward%><%=fastForward%>',
		tagName:'div',
		className:'pagination',
		events:{
			'click .backward':function(){
				this.collection.requestPreviousPage ? this.collection.requestPreviousPage() : this.collection.previousPage();
			},
			'click .forward':function(){
				this.collection.requestNextPage ? this.collection.requestNextPage() : this.collection.nextPage();
			},
			'click .fast-backward':function(){
				this.collection.goTo(1);
			},
			'click .fast-forward':function(){
				this.collection.goTo(this.collection.info().totalPages);
			}
		},
		initialize : function() {
			Base.prototype.initialize.apply(this,arguments);
			this.collection.on('sync', this.html, this);
			this.collection.on('reset', this.html, this);
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
		html:function(){
			if(this.collection.length){
				var info = this.collection.info();
				return Base.prototype.html.call(this,$.extend({
					fastBackward : '<a href="" class="halflings fast-backward" data-name="fast-backward" data-type="" data-prefix="halflings" data-utf="E070"></a>',
					backward : '<a href="" class="halflings backward" data-name="backward" data-type="" data-prefix="halflings" data-utf="E071"></a>',
					fastForward : '<a href="" class="halflings fast-forward" data-name="fast-forward" data-type="" data-prefix="halflings" data-utf="E076"></a>',
					forward : '<a href="" class="halflings forward" data-name="forward" data-type="" data-prefix="halflings" data-utf="E077"></a>',
					pageDesc:i18n.__("Page %d of %d",info.currentPage,info.totalPages),
					totalPages:0
				},info));
			}
			return '';
		}
	}));
});
