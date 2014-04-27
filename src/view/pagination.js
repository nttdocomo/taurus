/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('./base');
	var ON_EACH_SIDE = 3,ON_ENDS = 2,DOT = '.';
	return taurus.view('taurus.view.Pagination', Base.extend({
		//tpl:'<ul><li<% if (currentPage <= firstPage) { %> class="disabled"<%}%>><a href="#">Prev</a></li><% for(p=1;p<=totalPages;p++){%><li<% if (currentPage == p) { %> class="disabled"<% } %>><a href="#"><%= p %></a></li><%}%><li<% if (currentPage == totalPages) { %> class="disabled"<%}%>><a href="#">Next</a></li></ul>',
		tpl:'<%=paginator_number%>',
		tagName:'ul',
		className:'pagination pagination-sm',
		initialize : function() {
			Base.prototype.initialize.apply(this,arguments);
			this.collection.on('sync', this.html, this);
		},
		delegateEvents:function(){
			var events = $.extend({}, this.events, {
				'click a' : 'onPagerClick'
			});
			Base.prototype.delegateEvents.call(this, events)
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
			var info = this.collection.info();
			console.log(info)
			info.paginator_number='';
			info.currentPage = info.currentPage || 0
			if (!info.totalPages || info.totalPages <= 10){
				info.page_range = _.range(info.totalPages)
			} else {
				info.page_range = []
				if(info.currentPage > (ON_EACH_SIDE + ON_ENDS)){
					Array.prototype.push.apply(info.page_range,_.range(0, ON_EACH_SIDE - 1))
					info.page_range.push(DOT)
					Array.prototype.push.apply(info.page_range,_.range(info.currentPage - ON_EACH_SIDE, info.currentPage + 1))
				} else {
					Array.prototype.push.apply(info.page_range,_.range(info.currentPage + 1))
				}
	            if (info.currentPage < (info.totalPages - ON_EACH_SIDE - ON_ENDS - 1)){
	                Array.prototype.push.apply(info.page_range,_.range(info.currentPage + 1, info.currentPage + ON_EACH_SIDE + 1))
	                info.page_range.push(DOT)
	                Array.prototype.push.apply(info.page_range,_.range(info.totalPages - ON_ENDS, info.totalPages))
	            } else {
	            	Array.prototype.push.apply(info.page_range,_.range(info.currentPage + 1, info.totalPages))
	            }
			}
			if(!info.totalRecords || info.totalPages === 1){
				this._html = this.el.innerHTML = '';
				return '';
			}
			_.each(info.page_range,function(i){
				if (i == DOT){
					info.paginator_number += '<li><span>...</span></li>';
				}
				else if (i == info.currentPage - 1){
					info.paginator_number += _.template('<li class="disabled"><span><%=d%></span></li>',{
						'd':i+1
					});
				} else {
					info.paginator_number += _.template('<li><a href="#"><%=d%></a></li>',{
						'd':i+1
					});
				}
			})
			return Base.prototype.html.apply(this,[info])
		}
	}))
})
